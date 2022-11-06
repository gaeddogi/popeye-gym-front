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
            v-for="cIdx in 7" v-bind:key="cIdx" 
            @click="clickTd(rIdx, cIdx)" 
            v-bind:class="{disabled: disabledtds[rIdx][cIdx - 1], selected: selectedTds[`${rIdx},${cIdx}`]}"
          ></td>
        </tr>
      </tbody>
    </table>

    <button class="menu-button" @click="clickReservation">예약하기</button>             
    
  </div>

</template>

<script>
import dayjs from "dayjs"

export default {
  data() {
    return {
      weeks: ['이번 주', '다음 주', '2주 후', '3주 후'],
      // times: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],

      // selectedTds: {}, //[ {rIdx: , cIdx: }, {}, ...]
      // testTds: {'2,5': true, '7,5': true, '7,6': true}

      // tds: [], // [ {}]
      testTds: {},
    }
  },
  props: [
    // 'weeks',
    'times',
    'currentDates',
    'scheduledDates',
    // 'quantity',
    'selectedTds',
    'weekIdx'
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
      
      const disabledtds = this.disabledtds
      const isDisabled = disabledtds[rIdx][cIdx-1]

      if (isDisabled) {
        alert('예약불가^^')
        return
      }

      // const quantity = this.quantity

      // if (quantity <= 0) {
      //   alert('남은 PT권이 없어요')
      //   return
      // }

      // const selectedTds = this.selectedTds
      // const isSelected = selectedTds[`${rIdx},${cIdx}`]
      // const currentDates = this.currentDates
      // const times = this.times

      // if (isSelected) {
      //   delete selectedTds[`${rIdx},${cIdx}`]
      // }
      // else {
      //   selectedTds[`${rIdx},${cIdx}`] = {date: currentDates[cIdx-1], time: times[rIdx]}
      // }
      // this.selectedTds = selectedTds
      // this.$emit('click-td', selectedTds)
      
      
      this.$emit('click-td', {rIdx, cIdx})
    },
    clickReservation() {
      console.log('예약하기')

      this.$emit('click-reservation')
    }
  },
  computed: {
    disabledtds() {
      const currentDates = this.currentDates
      const times = this.times
      const scheduledDates = this.scheduledDates // [{date: '2022-11-06', time: 14}, {date: '2022-11-04', time: 20}]


      const scheduledTdIdxs = scheduledDates.map(sd => {
        const cIdx = currentDates.findIndex(cd => cd.format('YYYY-MM-DD') === sd.date)
        const rIdx = times.findIndex(t => t === sd.time)
        return {rIdx, cIdx}
      })

      console.log(scheduledTdIdxs)

      const now = dayjs()
      const nowHour = now.get('hour') // 12:18
      const nowDate = now.format('YY-MM-DD') // 11/3
      const lastedTdIdxs = [] // [ {rIdx: , cIdx: }, {}, ...]

      for (let i = 0; i < 11; i++) {
        lastedTdIdxs.push([])
        for (let j = 0; j < 7; j++) {
          let thisTime = times[i] 
          let thisDate = currentDates[j].format('YY-MM-DD') 
          let disabled = ''

          if (thisDate < nowDate) {
            disabled = true
          }
          else if (thisDate === nowDate && thisTime <= nowHour) {
            disabled = true
          }
          else {
            disabled = false
          }
          lastedTdIdxs[i].push(disabled)
        }
      }

      scheduledTdIdxs.forEach(o => {
        // const disabled = lastedTdIdxs[o.rIdx][o.cIdx];
        // const obj = Object.assign({}, proxy);
        // obj.disabled = true;
        lastedTdIdxs[o.rIdx][o.cIdx] = true
      })

      // this.tds = tds

      return lastedTdIdxs
    }
  },
  // watch: {
  //   currentDates(val, oldVal) {
  //     const currentDates = this.currentDates
  //     const times = this.times
  //     const scheduledDates = this.scheduledDates // [ {date: , time: }, {}, ...]

  //     const scheduledTdIdxs = scheduledDates.map(sd => {
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