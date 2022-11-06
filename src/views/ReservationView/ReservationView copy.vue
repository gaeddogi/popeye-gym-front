<template>
  <div>
    <div class="week-container">
        <button v-for="(week, index) in weeks" v-bind:key="index" @click="clickWeek(index)">{{ week }}</button>
    </div>

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
      
      <tbody v-if="tds.length">
        <tr v-for="(time, rIdx) in times" v-bind:key="rIdx">
          <td>{{ time }}:00</td>
          <td
            v-for="cIdx in 7" v-bind:key="cIdx" 
            @click="clickTd(rIdx, cIdx)" 
            v-bind:class="{disabled: tds[rIdx][cIdx - 1].disabled, selected: tds[rIdx][cIdx - 1].selected}"
          ></td>
        </tr>
      </tbody>
    </table>

    <!-- {{ tds }} -->
  </div>

  <!-- <table>
    <thead>
      <tr>
        <th>시</th>
        <th v-for="(day, index) in daysOfWeeks[selectedWeekIdx]" v-bind:key="index">
          <div>{{ day.format('MM/DD') }}</div>
          <div>{{ day.get('day') }}</div>
        </th>
      </tr>
    </thead>
    <tbody v-if="tdStatus.length">
      <tr v-for="(time, rIdx) in times" v-bind:key="rIdx">
        <td>{{ time }}:00</td>
        <td
          v-for="cIdx in 7" v-bind:key="cIdx" 
          @click="selectDate(rIdx, cIdx)" 
          v-bind:class="{test: tdStatus[rIdx][cIdx - 1].disabled, test2: tdStatus[rIdx][cIdx - 1].selected}"
        ></td>
      </tr>
    </tbody>
  </table> -->

  <!-- <button class="menu-button">예약하기</button>              -->
</template>

<script>
import dayjs from "dayjs"

export default {
  data() {
    return {
      weeks: ['이번 주', '다음 주', '2주 후', '3주 후'],
      times: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],

      selectedTds: [], //[ {rIdx: , cIdx: }, {}, ...]

      // tds: [], // [ {}]
    }
  },
  props: [
    // 'weeks',
    // 'times',
    'currentDates',
    'scheduledDates'
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
      
      const tds = this.tds
      const td = tds[rIdx][cIdx-1]
      const isDisabled = td.disabled
      const isSelected = td.selected

      if (isDisabled) {
        alert('예약불가^^')
        return
      }

      const selectedTds = this.selectedTds.slice(0, this.selectedTds.length)

      if (isSelected) {
        const findIndex = selectedTds.findIndex(o => (o.rIdx === rIdx) & (o.cIdx === cIdx -1))
        selectedTds.splice(findIndex, 1)
      }
      else {
        selectedTds.push({rIdx, cIdx: cIdx-1})
      }
      this.selectedTds = selectedTds


      tds[rIdx][cIdx-1].selected = !tds[rIdx][cIdx-1].selected

      // this.tds = tds;
    }
  },
  computed: {
    tds() {
      const currentDates = this.currentDates
      const times = this.times
      const scheduledDates = this.scheduledDates // [ {date: , time: }, {}, ...]

      const scheduledTdIdxs = scheduledDates.map(sd => {
        const cIdx = currentDates.findIndex(cd => cd.format('YY-MM-DD') === sd.date.format('YY-MM-DD'))
        const rIdx = times.findIndex(t => t === sd.time)
        return {rIdx, cIdx}
      })

      const tds = [];
      const now = dayjs()
      const nowHour = now.get('hour') // 14
      const nowDate = now.format('YY-MM-DD') // 11/2

      for (let i = 0; i < 11; i++) {
        tds.push([]);
        for (let j = 0; j < 7; j++) {
          let time = times[i] 
          let date = currentDates[j].format('YY-MM-DD') 
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
          tds[i].push(obj)
        }
      }

      scheduledTdIdxs.forEach(o => {
        const proxy = tds[o.rIdx][o.cIdx];
        const obj = Object.assign({}, proxy);
        obj.disabled = true;
        tds[o.rIdx][o.cIdx] = obj;
      })

      // this.tds = tds

      return tds
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
td:not(:first-child):hover {
  border: solid 2px black;
}
thead th,
tbody th,
tbody tr td:first-child {
  background-color: #d7d7d7;
}

.disabled {
  background-color: black;
}
.selected {
  background-color: red;
}
</style>