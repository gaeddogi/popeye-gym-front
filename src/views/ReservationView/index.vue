<template>
  <div class="container">



    <!-- <v-container> -->
      <v-row style="align-items: baseline; margin: 40px 0;">
        <v-col
          class="pl-0"
          cols="12"
          sm="6"
        >
          <v-select
            v-model="currentTrainerId"
            label="트레이너 선택"
            variant="solo"
            required
            :items="trainers"
            item-title="name"
            item-value="trainerId"
            @update:modelValue="clickTrainer"
          ></v-select>
        </v-col>

        <v-col
          class="pr-0"
          cols="12"
          sm="6"
        >
          <!-- <v-card
            width="400"
            text="This is content"
          ></v-card> -->
          <v-text-field
            class="h-50"
            :model-value="quantity"
            label="남은 수량"
            variant="underlined"
            readonly
          ></v-text-field>
        </v-col>
      </v-row>
      
      
      <ReservationView
      @click-week="handleChangeWeek"
      @click-td="handleReservation"
      
      :times="times"
      :currentDates="datesOfCurrentWeek"
      :scheduleDetails="scheduleDetailsOfCurrentTrainer"
      :selectedTds="selectedTds"
      :weekIdx="currentWeekIdx"
      :disabledTds="disabledTds"
      >
    </ReservationView>
    
    <!-- </v-container> -->

  </div>
</template>

<script>
import dayjs from "dayjs"
import ReservationView from './ReservationView.vue'
import { getPtInfo } from '@/api/pt'
import { getScheduleOfTrainer, reservation, cancel } from '@/api/reservation.js'

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

      disabledTds: {},
      selectedTds: {},

      currentTrainerId: 0,
      scheduleDetailsOfCurrentTrainer: [], // [ { date: , time: , isMine: }, {}, ..]
      currentWeekIdx: 0,
      dates: [],

      selectedTdsOfWeeks: {0: {}, 1: {}, 2: {}, 3: {}}, // { 0: {}, 1: {}, 2: {}, 3: {} }

    }
  },
  async created() {
    // console.log('부모 크리에이티드');

    this.setDatesOfWeeks();

    await this.getUserPtInfo();
    this.currentTrainerId = this.trainers[0].trainerId
    this.quantity = this.trainers[0].quantity
    this.handleChangeWeek(0)

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
        // console.log("gerUserInfo : ", res)
        this.trainers = res.data;

      })
      .catch(err => {
        // console.log(err);
      })
    },
    setLastTds() {
      const dates = this.dates
      const times = this.times
      const firstDate = dates[0]

      const now = dayjs()
      const nowHour = now.get('hour') // 12:18
      const nowDate = now.format('YY-MM-DD') // 11/3
      const disabledTds = this.disabledTds // { '0,1': true, '3,3': true ...}

      if (firstDate > now) {
        // console.log('지난 날짜 없음')
        return disabledTds
      }

      for (let i = 0; i < 11; i++) {
        for (let j = 0; j < 7; j++) {
          let thisTime = times[i] 
          let thisDate = dates[j].format('YY-MM-DD') 

          if (thisDate < nowDate) {
            disabledTds[`${i},${j}`] = true
          }
          else if (thisDate === nowDate && thisTime <= nowHour) {
            disabledTds[`${i},${j}`] = true
          }
          else {
            break
          }
        }
      }

      this.disabledTds = disabledTds
    },
    handleChangeWeek(weekIdx) {
      // console.log("handleChangeWeek ", weekIdx)

      

      // 현재 주 갱신
      this.currentWeekIdx = weekIdx

      // 1. 현재 트레이너의 스케줄 가져오기
      const trainerId = this.currentTrainerId
      const dates = this.datesOfWeeks[weekIdx] // 해당 인덱스 주의 날짜들
      const startDt = dates[0].format('YYYY-MM-DD')
      const endDt = dates[6].format('YYYY-MM-DD')

      getScheduleOfTrainer(trainerId, startDt, endDt)
      .then(res => {
        // console.log(res)

        const trainerId = res.data.trainerId
        const details = res.data.scheduleDetails
        const selectedTds = {}
        const disabledTds = {}
       
        const dates = this.dates
        const times = this.times

        for (let key in details) {
          const detail = details[key]
          const reservationId = detail['reservationId']
          const mine = detail['mine']
          const date = detail['dateTime'].slice(0, 10)
          const time = detail['dateTime'].slice(11, 13)

          // console.log(date, time, mine, reservationId)

          const cIdx = dates.findIndex(o => o.format('YYYY-MM-DD') === date)
          const rIdx = times.findIndex(t => t == time)

          // console.log(rIdx, cIdx)

          if (mine) {
            selectedTds[`${rIdx},${cIdx}`] = reservationId
          }
          else {
            disabledTds[`${rIdx},${cIdx}`] = true
          }
        }

        
        // console.log(disabledTds)
        this.selectedTds = selectedTds
        this.disabledTds = disabledTds
        
        if (weekIdx === 0) this.setLastTds()
      })
      .catch(err => {
        // console.log(err)
      })

      // 2. 직전 주에서 선택한 td들 저장하기
    },
    clickTrainer() {
      this.trainers.forEach(o => {
        if (o.trainerId === this.currentTrainerId) {
          this.quantity = o.quantity
        }
      })
      this.selectedTdsOfWeeks = {0: {}, 1: {}, 2: {}, 3: {}}
      this.handleChangeWeek(0)
    },
    handleReservation(selectedTdIdx) {
      // console.log('예약을 해보자')
      // Request: Long trainerId, String dateTime (YYYY-MM-DD-HH)

      const cIdx = selectedTdIdx.cIdx
      const rIdx = selectedTdIdx.rIdx

      const dates = this.dates
      const times = this.times
      
      const selectedTds = this.selectedTds
      const reservationId = selectedTds[`${rIdx},${cIdx}`]

      let quantity = this.quantity

      if (reservationId) {
        
        // 여기서 예약 취소를 한다.
        // console.log('예약취소', reservationId)
        
        return cancel(reservationId)
        .then(res => {
          // console.log(res)

          delete selectedTds[`${rIdx},${cIdx}`]
          ++quantity

          this.selectedTds = selectedTds
          this.quantity = quantity
        })
        .catch(err => {
          // console.log(err)
        })
      }
      else {
        if (quantity <= 0) {
          alert('남은 PT권이 없어요')
          return
        }

        const date = dates[cIdx].format('YYYY-MM-DD')
        const time = times[rIdx]
        const dateTime = `${date}-${time}`
        const trainerId = this.currentTrainerId

        // console.log(date, time, dateTime)

        return reservation(trainerId, dateTime)
        .then(res => {
          // console.log(res)
          const createdId = res.data.id

          selectedTds[`${rIdx},${cIdx}`] = createdId
          --quantity
          
          this.selectedTds = selectedTds
          this.quantity = quantity
        })
        .catch(err => {
          // console.log(err)
        })

      }



    }
  },
  computed: {
    datesOfCurrentWeek() {
      const currentWeekIdx = this.currentWeekIdx
      this.dates = this.datesOfWeeks[currentWeekIdx]
      return this.datesOfWeeks[currentWeekIdx]
    },
    

  }
}
</script>

<style scoped>
/* .reservation-container {
  display: flex;
  width: 100%;
} */

.selectedButton {
  background-color: rebeccapurple;
}

</style>