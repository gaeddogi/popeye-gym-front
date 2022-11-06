<template>
  <div class="reservation-container">
    <h1>예약 하기</h1>

    <div>
      <button 
        v-for="(trainer, index) in trainers" :key="index" 
        @click="clickTrainer(trainer.trainerId, index)" 
        :class="{selectedButton: currentTrainerId === trainer.trainerId}"
        >
          {{ trainer.name }}
        </button>
    </div>

    <div>남은 수량: {{ quantity }}</div>

    <!-- :weeks="weeks"
    :times="times" -->
    <ReservationView
      @click-week="handleChangeWeek"
      @click-td="handleSelectedDate"
      @click-reservation="handleReservation"
      :times="times"
      :currentDates="datesOfCurrentWeek"
      :scheduledDates="scheduledDatesOfCurrentTrainer"
      :selectedTds="selectedTdsOfWeeks[`${currentWeekIdx}`]"
      :weekIdx="currentWeekIdx"
    >
    <!-- :quantity="quantity" -->


    </ReservationView>

  </div>
</template>

<script>
import dayjs from "dayjs"
import ReservationView from './ReservationView.vue'
import { getPtInfo } from '@/api/pt'
import { getScheduleOfTrainer, reservation } from '@/api/reservation.js'

export default {
  components: {
      ReservationView
  },
  data() {
    return {
      // weeks: ['이번 주', '다음 주', '2주 후', '3주 후'],
      times: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],

      datesOfWeeks: [], // [ [...dates], [...dates], [], [] ]
      trainers: [], // [ {trainerId: , name: }, {}, ... ]
      quantity: 0,

      currentTrainerIdx: 0,
      currentTrainerId: 0,
      scheduledDatesOfCurrentTrainer: [], // [ { date: , time: }, {}, ..]
      currentWeekIdx: 0,

      selectedTdsOfWeeks: {0: {}, 1: {}, 2: {}, 3: {}} // { 0: {}, 1: {}, 2: {}, 3: {} }
      // selectedTdsOfWeeks: [{0: {}, 1: {}, 2: {}, 3: {}}]// { 0: {}, 1: {}, 2: {}, 3: {} }
      // now: dayjs()
    }
  },
  async created() {
    console.log('부모 크리에이티드');

    this.setDatesOfWeeks();

    await this.getUserPtInfo();
    this.currentTrainerIdx = 0
    this.currentTrainerId = this.trainers[0].trainerId
    this.quantity = this.trainers[0].quantity
    this.handleChangeWeek(0)
    // this.clickTrainer(this.trainers[0].trainerId, 0)

    // this.changeTrainer(0)
  },
  methods: {
    setDatesOfWeeks() {
      
      const now = dayjs()
      const minus = now.get('day') - 1 < 0 ? 6 : now.get('day') -1 
      const monday = now.subtract(minus, 'day') // 이번주 월요일 날짜
  
      // this.now = now
        
      const mondays = []
      for (let i = 0; i < 4; i++) {
        mondays.push(monday.add(i * 7, 'day'));
      }
  
      mondays.map(m => {
        const arr = []
        for (let i = 0; i < 7; i++) {
          let day = m.add(i, 'day')
          arr.push(day);
        }
        this.datesOfWeeks.push(arr)
      })
    },
    getUserPtInfo() { 
      return getPtInfo()
      .then(res => {
        // 트레이너별 남은 pt수 또한 가져와야함.
        this.trainers = res.data;

      })
      .catch(err => {
        console.log(err);
      })
    },
    handleChangeWeek(weekIdx) {
      console.log(weekIdx)

      // 현재 주 갱신
      this.currentWeekIdx = weekIdx

      // 1. 현재 트레이너의 스케줄 가져오기
      const currentTrainerId = this.currentTrainerId
      const dates = this.datesOfWeeks[weekIdx] // 해당 인덱스 주의 날짜들
      const startDt = dates[0].format('YYYY-MM-DD')
      const endDt = dates[6].format('YYYY-MM-DD')

      getScheduleOfTrainer(currentTrainerId, startDt, endDt)
      .then(res => {
        console.log(res)
        // {
        //   trainerId: ,
        //   scheduledDates: [ { date: , time: }, {}, ..],
        // }
        this.scheduledDatesOfCurrentTrainer = res.data.scheduledDates
        
      })
      .catch(err => {
        console.log(err)
      })

      // 2. 직전 주에서 선택한 td들 저장하기
    },
    handleSelectedDate(selectedTdIdx) {
      console.log(selectedTdIdx)

      const currentWeekIdx = this.currentWeekIdx
      const selectedTds = this.selectedTdsOfWeeks[`${currentWeekIdx}`]

      const rIdx = selectedTdIdx.rIdx
      const cIdx = selectedTdIdx.cIdx
      const isSelected = selectedTds[`${rIdx},${cIdx}`]
      const currentDates = this.datesOfCurrentWeek
      const times = this.times
      let quantity = this.quantity

      if (isSelected) {
        delete selectedTds[`${rIdx},${cIdx}`]
        ++quantity
      }
      else {
        if (quantity <= 0) {
          alert('남은 PT권이 없어요')
          return
        }
        selectedTds[`${rIdx},${cIdx}`] = {date: currentDates[cIdx-1].format('YYYY-MM-DD'), time: times[rIdx]}
        --quantity
      }

      this.selectedTdsOfWeeks[`${currentWeekIdx}`] = selectedTds
      this.quantity = quantity
    },
    clickTrainer(trainerId, trainerIdx) {
      console.log(trainerId)
      
      const trainers = this.trainers
      const trainerName = trainers[this.currentTrainerIdx].name

      const flag = confirm(`예약하기 버튼을 누르지 않으면, ${trainerName} 트레이너에 대해 선택한 예약일자가 사라져요`) // 이것의 반환 값에 따라 

      if (flag) {
        this.currentTrainerId = trainerId
        this.currentTrainerIdx = trainerIdx
        this.quantity = this.trainers[trainerIdx].quantity
        this.selectedTdsOfWeeks = {0: {}, 1: {}, 2: {}, 3: {}}
        this.handleChangeWeek(0)
      }
      else {
        return
      }

    },
    handleReservation() {
      console.log('예약을 해보자')

      const currentTrainerId = this.currentTrainerId
      const selectedTdsOfWeeks = this.selectedTdsOfWeeks // {0: {}, 1: {} 2: {}, 3: {}}
      const reservationDates = []
      
      console.log(selectedTdsOfWeeks)

      for (const selectedTds in selectedTdsOfWeeks) {
        for (const td in selectedTdsOfWeeks[selectedTds]) {

          const obj =selectedTdsOfWeeks[selectedTds][td]
          let date = obj.date
          let time = obj.time
          
          reservationDates.push({date, time})
        }
      }
      console.log(reservationDates)

      return reservation(currentTrainerId, reservationDates)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  computed: {
    datesOfCurrentWeek() {
      const currentWeekIdx = this.currentWeekIdx
      return this.datesOfWeeks[currentWeekIdx]
    },

  }
}
</script>

<style scoped>
.reservation-container {
  display: flex;
  flex-direction: column;
  justify-content: center;

}
.selectedButton {
  background-color: rebeccapurple;
}


</style>