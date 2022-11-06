<template>

  <div class="table-container">
    <h1>예약 하기</h1>
    
    <div class="week-container">
      <button v-for="(button, index) in weekButtons" v-bind:key="index" @click="changeWeek(index)">{{ button }}</button>
    </div>


    <div>
      <button 
        v-for="(trainer, index) in trainers" :key="index" 
        @click="changeTrainer(index)" 
        v-bind:class="{test3: selectedTrainerId === trainer.trainerId}"
        >
          {{ trainer.name }}
        </button>
    </div>

    <table>
      <thead>
        <tr>
          <th>시</th>
          <th v-for="(day, index) in daysOfWeek" v-bind:key="index">
            <div>{{ day.format('MM/DD') }}</div>
            <div>{{ day.get('day') }}</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(time, rIdx) in times" v-bind:key="rIdx">
          <td>{{ time }}:00</td>
          <td 
            v-for="cIdx in 7" v-bind:key="cIdx" 
            @click="selectDate(rIdx, cIdx)" 
            v-bind:class="{test: tdStatus[rIdx][cIdx - 1].disabled, test2: tdStatus[rIdx][cIdx - 1].selected}"
          ></td>
        </tr>
      </tbody>
    </table>

    <button class="menu-button">예약하기</button>

  </div>
</template>

<script>
import dayjs from "dayjs";
import { getScheduleOfTrainer } from '@/api/reservation.js';
import { getPtInfo } from '@/api/pt';

export default {
  async created() {
    console.log('ReservationView mounted');
    this.mondays = this.getMondays();
    this.changeWeek(0); // 이번주

    this.initializeTdStatus();


    await this.getPtInfo();
    this.changeTrainer(0)
    // this.selectedTrainerId = this.trainers[0].trainerId;
    // this.getDisabledDates()



  },
  data: function() {
    return {
        weekButtons: ['이번 주', '다음 주', '2주 후', '3주 후'],
        times: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
        mondays: [],
        daysOfWeek: [],
        now: '',
        trainers: [],
        selectedTrainerId: 0,
        selectedWeekIdx: 0,
        
        tdStatus: [],
        
        disabledDates: [{date: '10/31', time: 14}, {date: '10/31', time: 15}],
        disabledTds: [],
        
        selectedTds: [],
        // selectedDates: [],
        
    }
  },
  methods: {
    getMondays() { // 화면 들어왔을 때, 단 한번만 실행
      const now = dayjs(); 
      const day = now.get('day') - 1 < 0 ? 6 : now.get('day') -1;
      const monday = now.subtract(day, 'day');

      this.now = now;
      
      const arr = [];
      for (let i = 0; i < 4; i++) {
        arr.push(monday.add(i * 7, 'day'));
      }

      return arr;
    },
    getPtInfo() { // 화면 들어왔을 때, 단 한번만 실행
      return getPtInfo()
      .then(res => {
        this.trainers = res.data;

      })
      .catch(err => {
        console.log(err);
      })
    },
    changeWeek(index) {
      const monday = this.mondays[index];
      
      const arr = [];
      for (let i = 0; i < 7; i++) {
        let day = monday.add(i, 'day')
        arr.push(day);
        
      }
      this.daysOfWeek = arr;
      this.selectedWeekIdx = index


      // this.getDisabledDates(index)
      


      // 예약된 놈은 disabledDatess에 저장

// {
//     '이번주': { trainerId: [], trainerId: []},
//     '다음주': { trainerId: [], trainerId: []},
//     '2주후': { trainerId: [], trainerId: []},
//     '3주후': { trainerId: [], trainerId: []},
// }

      if (index === 0) this.disabledDates = [{date: '10/31', time: 14}, {date: '10/31', time: 15}]
      if (index === 1) this.disabledDates = [{date: '11/08', time: 14}, {date: '11/10', time: 22}]
      if (index === 2) this.disabledDates = [{date: '11/14', time: 14}, {date: '11/17', time: 15}]
      if (index === 3) this.disabledDates = [{date: '10/22', time: 14}, {date: '10/23', time: 15}]

      // this.initializeTdStatus();

      this.convertToDisabledTd();
      this.setTdStatusForDisabled();
    },
    changeTrainer(index) {
      this.changeWeek(0)
      const selectedTrainerId = this.trainers[index].trainerId;
      this.selectedTrainerId = selectedTrainerId;
    },
    selectDate(rIdx, cIdx) {
      console.log(`rIdx, ${rIdx}, ${this.times[rIdx]}`)
      console.log(`cIdx, ${cIdx}, ${this.daysOfWeek[cIdx-1].format('MM/DD')}`);
      
      if (this.tdStatus[rIdx][cIdx-1].disabled === true) {
        alert('예약불가^^')
        return
      }

      const selectedTds = this.selectedTds.slice(0, this.selectedTds.length)

      if (this.tdStatus[rIdx][cIdx-1].selected) {
        const findIndex = selectedTds.findIndex(o => (o.rIdx === rIdx) & (o.cIdx === cIdx -1))
        selectedTds.splice(findIndex, 1)
      }
      else {
        selectedTds.push({rIdx, cIdx: cIdx-1})
      }
      this.selectedTds = selectedTds
      this.tdStatus[rIdx][cIdx-1].selected = !this.tdStatus[rIdx][cIdx-1].selected
      
    },

    
    convertToDisabledTd() {
      const disabledTds = this.disabledDates.map(dd => {
        const cIdx = this.daysOfWeek.findIndex(d => d.format('MM/DD') === dd.date)
        const rIdx = this.times.findIndex(t => t === dd.time)
        return {rIdx, cIdx}
      })
      this.disabledTds = disabledTds;
    },
    initializeTdStatus() {
      // 이 함수에서 트레이너 스케줄도 합쳐야하는데..
      console.log(this.now.get('hour'))
      const arr = [];
      const nowHour = this.now.get('hour') // 14
      const nowDate = this.now.format('YY-MM-DD') // 11/2

      console.log(nowHour, nowDate)

      
      for (let i = 0; i < this.times.length; i++) {
        arr.push([]);
        for (let j = 0; j < this.daysOfWeek.length; j++) {
          let time = this.times[i] 
          let date = this.daysOfWeek[j].format('YY-MM-DD') 
          let obj = {}

          // console.log(date === nowDate)
          if (date < nowDate) {
            obj = {disabled: true, selected: false}
          }
          else if (date === nowDate && time <= nowHour) {
            obj = {disabled: true, selected: false}
          }
          else {
            obj = {disabled: false, selected: false};
          }
          arr[i].push(obj)
        }
      }
      this.tdStatus = arr;
      // this.tdStatus = Array.from(Array(this.times.length), () => Array(this.daysOfWeek.length).fill({disabled: false, selected: false}));
    },
    setTdStatusForDisabled() {
      this.disabledTds.forEach(o => {
        const proxy = this.tdStatus[o.rIdx][o.cIdx];
        const obj = Object.assign({}, proxy);
        obj.disabled = true;
        this.tdStatus[o.rIdx][o.cIdx] = obj;
      })
    },

    getDisabledDates(index) {
      // 서버에서 예약된 놈, 본인이 예약한 놈 가지고 와서
      const startDt = this.daysOfWeek[0].format('YYYY-MM-DD')
      const endDt = this.daysOfWeek[6].format('YYYY-MM-DD')
      const selectedTrainerId = this.selectedTrainerId

      getScheduleOfTrainer(selectedTrainerId, startDt, endDt)
      .then(res => {
        console.log(res)
        console.log(this.selectedWeekIdx)
      })
      .catch(err => {
        console.log(err)
      })
    },
    
  },
  computed: {
    // getWeek() {
    //   const arr = [];
    //   for (let i = 0; i < 7; i++) {
    //     let day = this.firstDay.add(i, 'day').format('MM/DD')
    //     arr.push(day);
    //   }
    //   this.daysOfWeek = arr;
    //   return this.daysOfWeek;
    // },
    // isReserved() {
    //   alert('dd')
    // }
    // getDisabledDates() {
    //   // 서버에서 예약된 놈, 본인이 예약한 놈 가지고 와서
    //   alert('dd')
    //   const startDt = this.daysOfWeek[0].format('YYYY-MM-DD')
    //   const endDt = this.daysOfWeek[6].format('YYYY-MM-DD')
    //   const selectedTrainerId = this.selectedTrainerId

    //   getScheduleOfTrainer(selectedTrainerId, startDt, endDt)
    //   .then(res => {
    //     console.log(res)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
    // },
    selectedDates() {
      alert('담아')
      const arr = [];
      this.selectedTds.map(o => {
        let startTime = this.times[o.rIdx]
        let trainingDt = this.daysOfWeek[o.cIdx]
        
        arr.push({
          trainingDt,
          startTime
        })
      })
      return arr;
    }

  },
  watch: {
    // selectedTrainerId() {
    //   alert('change trainer')
    //   this.getDisabledDates()
    // },
    daysOfWeek() {
      alert('change daysOfWeek')
      this.getDisabledDates()
    }
  }

}
</script>

<style scope> 
.table-container {
  display: flex;
  flex-direction: column;
  justify-content: center;

}
table {
  width: 80%;
  border-collapse: collapse;
  border: 0;
}
table, th, td {
  border: 1px solid;
}
th,
td {
  border: 1px solid #868484;
  scroll-snap-align: start;
  background-color: #eee;
  text-align: center;
  width: 50px;
  height: 50px;
}
td:not(:first-child):hover {
  border: solid 2px black;
}
thead th,
tbody th,
tbody tr td:first-child {
  background-color: #d7d7d7;
}

.test {
  background-color: black;
}
.test2 {
  background-color: red;
}
.test3 {
  background-color: red;
}
.menu-button {
  width: 300px;
  height: 80px;
  background: white;
  border-radius: 11px;

  font-size: 30px;
  text-decoration: none;
  color: black;
  font-family: 'Black Han Sans', sans-serif;
}
.menu-button:hover {
  background: orange;
}

/*
tbody tr:last-child th,
tbody tr:last-child td {
  border-bottom: 0;
}
thead {
  z-index: 1000;
  position: relative;
}
th,
td {
  padding: 0.6rem;
  min-width: 6rem;
  text-align: left;
  margin: 0;
}
thead th {
  position: sticky;
  top: 0;
  border-top: 0;
  background-clip: padding-box;
}
thead th.pin {
  left: 0;
  z-index: 1001;
  border-left: 0;
}
tbody th {
  background-clip: padding-box;
  border-left: 0;
}
tbody {
  z-index: 10;
  position: relative;
}
tbody th {
  position: sticky;
  left: 0;
}
*/

</style>