<template>
  <div class="reservation-container">
  <!-- <v-container class="d-flex bg-surface-variant container"> -->

    <v-row style="width: 100%;">
      <v-col
        cols="12"
        sm="12"
        style="padding:12px 0;"
        >
        <v-btn-toggle
          style="margin: 20px 0; display: flex;"
          v-model="text"
          rounded="3"
          color="deep-purple-accent-3"
          group
        >
          <v-btn
            class="week-btn"
            rounded="3"
            v-for="(week, index) in weeks" v-bind:key="index" 
            :value=week
            @click="clickWeek(index)"
          >
            {{ week }}
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    
    
    <!-- <v-row> -->
      <!-- <v-col> -->
        <table style="width:100%;">
          <thead>
            <tr>
              <th class="backslash"></th>
              <th v-for="(date, index) in currentDates" v-bind:key="index">
                <div>{{ days[date.get('day')] }}</div>
                <div>{{ date.format('MM/DD') }}</div>
              </th>
            </tr>
          </thead>
          
          <!-- v-if="tds.length" -->
          <tbody >
            <tr v-for="(time, rIdx) in times" v-bind:key="rIdx">
              <td>{{ time }}:00</td>
              <td
                v-for="(c, cIdx) in 7" v-bind:key="cIdx" 
                @click="clickTd(rIdx, cIdx)" 
                v-bind:class="{disabled: disabledTds[`${rIdx},${cIdx}`], selected: selectedTds[`${rIdx},${cIdx}`]}"
              >
              <i class="fa fa-check" v-if="selectedTds[`${rIdx},${cIdx}`]"></i>
            </td>
            </tr>
          </tbody>
        </table>
      <!-- </v-col> -->
    <!-- </v-row> -->
      
  <!-- </v-container> -->

  </div>  

</template>

<script>
import dayjs from "dayjs"

export default {
  data() {
    return {
      weeks: ['이번 주', '다음 주', '2주 후', '3주 후'],
      days: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],

      text: '이번 주',
      // icon: 'justify',
      // toggle_none: null,
      // toggle_one: 0,
      // toggle_exclusive: 2,
      // toggle_multiple: [0, 1, 2],

    }
  },
  props: [
    // 'weeks',
    'times',
    'currentDates',
    'scheduleDetails',
    // 'quantity',
    'selectedTds',
    'weekIdx',

    'disabledTds',
  ],
  created() {
    console.log('자식 크리에이티드')

  },
  methods: {
    clickWeek(weekIdx) {
      this.$emit('click-week', weekIdx)
    },
    clickTd(rIdx, cIdx) {
      console.log(rIdx, cIdx)
      
      const isDisabled = this.disabledTds[`${rIdx},${cIdx}`]

      if (isDisabled) {
        alert('예약불가^^')
        return
      }
      
      this.$emit('click-td', {rIdx, cIdx})
    },
  },
  computed: {
    // lastTds() {
    //   const dates = this.currentDates
    //   const times = this.times
    //   const firstDate = dates[0]

    //   const now = dayjs().add(3, 'day')
    //   const nowHour = now.get('hour') // 12:18
    //   const nowDate = now.format('YY-MM-DD') // 11/3
    //   const lastTds = {} // { '0,1': true, '3,3': true ...}

    //   if (firstDate > now) {
    //     console.log('지난 날짜 없음')
    //     return lastTds
    //   }

    //   for (let i = 0; i < 11; i++) {
    //     for (let j = 0; j < 7; j++) {
    //       let thisTime = times[i] 
    //       let thisDate = dates[j].format('YY-MM-DD') 

    //       if (thisDate < nowDate) {
    //         lastTds[`${i},${j}`] = true
    //       }
    //       else if (thisDate === nowDate && thisTime <= nowHour) {
    //         lastTds[`${i},${j}`] = true
    //       }
    //       else {
    //         break
    //       }
    //     }
    //   }


    //   return lastTds
    // },
    // disabled() {
    //   // alert("disabled")
    //   const scheduleDetails = this.scheduleDetails // [{date: '2022-11-06', time: 14, isMine: true}, {date: '2022-11-04', time: 20, isMine: false}]
    //   const currentDates = this.currentDates
    //   const times = this.times
    //   const disabledTds = {}
    //   const selectedTds = 

    //   // const scheduledTdIdxs = scheduleDetails.map(sd => {
    //   //   const cIdx = currentDates.findIndex(cd => cd.format('YYYY-MM-DD') === sd.date)
    //   //   const rIdx = times.findIndex(t => t === sd.time)
    //   //   const mine = sd.mine
    //   //   return {rIdx, cIdx, mine}
    //   // })

    //   console.log(scheduledTdIdxs)

    //   scheduledTdIdxs.forEach(o => {
    //     // const disabled = lastedTdIdxs[o.rIdx][o.cIdx];
    //     // const obj = Object.assign({}, proxy);
    //     // obj.disabled = true;
    //     if (o.mine) disabledTds[`${o.rIdx},${o.cIdx}`] = red
    //     else disabledTds[`${o.rIdx},${o.cIdx}`] = blue
    //     // lastTds[`${o.rIdx},${o.cIdx}`] = true
    //   })
    //   return disabledTds
    // }
  },
  // watch: {
  //   currentDates(val, oldVal) {
  //     const currentDates = this.currentDates
  //     const times = this.times
  //     const scheduleDetails = this.scheduleDetails // [ {date: , time: }, {}, ...]

  //     const scheduledTdIdxs = scheduleDetails.map(sd => {
  //       const cIdx = currentDates.findIndex(cd => cd.format('YY-MM-DD') === sd.date.format('YY-MM-DD'))
  //       const rIdx = times.findIndex(t => t === sd.time)
  //       return {rIdx, cIdx}
  //     })

  //     const tds = [];
  //     const now = dayjs()
  //     const nowHour = now.get('hour') // 14
  //     const nowDate = now.format('YY-MM-DD') // 11/2

  //     for (let i = 0; i < 11; i++) {
  //       tds.push([]);
  //       for (let j = 0; j < 7; j++) {
  //         let time = times[i] 
  //         let date = currentDates[j].format('YY-MM-DD') 
  //         let obj = {}

  //         // console.log(date === nowDate)
  //         if (date < nowDate) {
  //           obj = {disabled: true, selected: false}
  //         }
  //         else if (date === nowDate && time <= nowHour) {
  //           obj = {disabled: true, selected: false}
  //         }
  //         else {
  //           obj = {disabled: false, selected: false};
  //         }
  //         tds[i].push(obj)
  //       }
  //     }

  //     scheduledTdIdxs.forEach(o => {
  //       const proxy = tds[o.rIdx][o.cIdx];
  //       const obj = Object.assign({}, proxy);
  //       obj.disabled = true;
  //       tds[o.rIdx][o.cIdx] = obj;
  //     })

  //     this.tds = tds

  //     // return tds
  //   }
  // }

}
</script>


<style scoped>
.reservation-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0px;
}

.week-btn {
  flex-grow: 1;
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
  /* background-color: #eee; */
  text-align: center;
  /* width: 50px; */
  height: 70px;
}
td:not(:first-child, .disabled):hover {
  /* border: solid 2px black; */
  background-color: #f7f6f6;
  cursor: pointer;
}
thead th,
tbody th,
tbody tr td:first-child {
  /* background-color: #d7d7d7; */
  background-color: #eaebeb;

  
}

tbody tr td:first-child {
  width: 100px
}

.backslash {
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" /></svg>');
}
/* .disabled {
  background-color: gainsboro;
} */
.disabled {
  background: linear-gradient(45deg, #dee2e6 25%, #adb5bd 0, #adb5bd 50%, #dee2e6 0, #dee2e6 75%, #adb5bd 0);
  background-size: 5px 5px;
}
.selected {
  /* background-color: #651fff; */
  color: #651fff;
}
.selectedButton {
  background-color: rebeccapurple;
}




.container {
  /* background-color: aliceblue; */
  /* max-width: 95%; */
}



</style>