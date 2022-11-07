<template>
  <div>
    <div class="week-container">
        <button 
          v-for="(week, index) in weeks" v-bind:key="index" 
          @click="clickWeek(index)"
          :class="{selectedButton: index === weekIdx}"
        >
            {{ week }}
        </button>
    </div>

    <!-- <div>남은 수량: {{ quantity }}</div> -->

    <table>
      <thead>
        <tr>
          <th>시</th>
          <th v-for="(date, index) in currentDates" v-bind:key="index">
            <div>{{ date.format('MM/DD') }}</div>
            <div>{{ date.get('day') }}</div>
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
          ></td>
        </tr>
      </tbody>
    </table>

  </div>

</template>

<script>
import dayjs from "dayjs"

export default {
  data() {
    return {
      weeks: ['이번 주', '다음 주', '2주 후', '3주 후'],
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
td:not(:first-child, .disabled):hover {
  /* border: solid 2px black; */
  background-color: antiquewhite;
}
thead th,
tbody th,
tbody tr td:first-child {
  background-color: #d7d7d7;
}

.disabled {
  background-color: gainsboro;
}
.selected {
  background-color: antiquewhite;
}
.selectedButton {
  background-color: rebeccapurple;
}
</style>