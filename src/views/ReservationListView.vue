<template>
  <div class="container">

    <div class="sort-box">

      <!-- <input type="radio" class="btn-check" name="options" id="schedule" autocomplete="off">
      <label class="btn btn-secondary" for="schedule">예정</label> -->

      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-select
            v-model="trainer"
            label="트레이너 선택"
            variant="solo"
            required
            :items="trainers"
            item-title="name"
            item-value="id"
            @update:modelValue="setReservations"
          ></v-select>
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-select
            v-model="status"
            label="분류"
            variant="solo"
            required
            :items="statusArr"
            item-title="title"
            item-value="value"
            @update:modelValue="setReservations"
          ></v-select>
        </v-col>
      </v-row>

    </div>


    <div class="list-box">
      <v-row
        class="row"
        v-for="(reservation, index) in reservations" :key="index"
      >
        <v-col
          cols="12"
          sm="2"
          v-if="reservation.isScheduled"
        >
          <v-chip
            class="ma-2"
            color="pink"
            text-color="white"
            prepend-icon="mdi-calendar-clock"
          >
            예정
          </v-chip>
        </v-col>
        <v-col
          cols="12"
          sm="2"
          v-else
        >
          <v-chip
            class="ma-2"
            text-color="white"
            prepend-icon="mdi-calendar-check"
          >
            완료
          </v-chip>
        </v-col>
        <v-col
          cols="12"
          sm="2"
          align-self="center"
        >
          {{ reservation.trainerName }}
        </v-col>
        <v-col
          cols="12"
          sm="3"
          align-self="center"
        >
          {{ reservation.date }}
        </v-col>
        <v-col
          cols="12"
          sm="3"
          align-self="center"
        >
          {{ reservation.time }}
        </v-col>
        <v-col
          cols="12"
          sm="2"
          align-self="center"
          v-if="reservation.isScheduled"
          @click="handleCancel(reservation.reservationId)"
        >
          <v-btn
            color="primary"
          >
            취소하기
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <div class="text-center" style="margin-top: 40px">
      <v-pagination
        v-model="currentPage"
        :length="length"
        :total-visible="6"
        @click="clickPage"
      ></v-pagination>
    </div>

  </div>
</template>

<script>
import { getTrainers } from '@/api/enroll.js'
import { getReservations, cancel } from '@/api/reservation.js'
import dayjs from 'dayjs'

export default {
  data() {
    return {
      trainers: [],
      reservations: [],
      statusArr:[{'title': 'all', 'value': 'all'}, {'title': '예정', 'value': 's'}, {'title': '완료', 'value': 'c'}],

      trainer: 'all',
      status: 'all',

      currentPage: 1,
      length: 0,
    }
  },
  created() {
    getTrainers()
      .then(res => {
        console.log(res)
        this.trainers = ['all', ...res.data]
      })
    
    this.setReservations()
  },
  methods: {
    handleCancel(reservationId) {
      alert(reservationId)

      cancel(reservationId)
      .then(res => {
        console.log(res)
      })
      .catch(({ response: {data} }) => {
        const message = data.message
        alert(`${message}`)
      })
    },
    setReservations() {
      const status = this.status === 'all' ? null : this.status
      const trainerId = this.trainer === 'all' ? null : this.trainer
      const page = this.currentPage -1


      getReservations(status, trainerId, page)
        .then(res => {
          console.log(res)

          const reservations = res.data.content.map(r => {
            // var date = dayjs("2021-10-10 10:30:25", "YYYY-MM-DD HH:mm:ss");
            const reservationId = r.reservationId
            const trainerName = r.trainerName
            const dateTimeArr = r.dateTime.split('T')
            const date = dateTimeArr[0]
            const time = dateTimeArr[1].slice(0, 5)

            const dateTime = dayjs(`${date} ${time}`, "YYYY-MM-DD HH:mm:ss")
            const now = dayjs()

            const isScheduled = now.isBefore(dateTime)

            return {reservationId, trainerName, isScheduled, date, time}

          })

          this.length = res.data.totalPages
          this.reservations = reservations
        })
    },
    clickPage() {
      this.setReservations()
    },
  }
}
</script>

<style scoped>
.sort-box {
  margin: 40px 0;
}
.row {
  /* background-color: #f7f6f6; */
  border-bottom: 1px solid #e0e0e0;
  /* #e0e0e0 */
}
</style>