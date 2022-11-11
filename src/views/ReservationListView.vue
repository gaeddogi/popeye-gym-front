<template>
  <div class="container">
    <div>예약내역</div>
    <div class="trainer-box">

      <!-- <input type="radio" class="btn-check" name="options" id="schedule" autocomplete="off">
      <label class="btn btn-secondary" for="schedule">예정</label> -->

      <select class="form-select" aria-label="Default select example">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>

      <button 
        v-for="(trainer, index) in trainers" :key="index"
      >

        <span>
          {{ trainer.name }} <br/>
          {{ trainer.type }}
        </span>
      </button>

    </div>

    <div class="status-box">

      <input type="radio" class="btn-check" name="options" id="schedule" autocomplete="off">
      <label class="btn btn-secondary" for="schedule">예정</label>

      <input type="radio" class="btn-check" name="options" id="complete" autocomplete="off">
      <label class="btn btn-secondary" for="complete">완료</label>

      <input type="radio" class="btn-check" name="options" id="all" autocomplete="off">
      <label class="btn btn-secondary" for="all">ALL</label>
      
      
    </div>


    <div class="list-box">
      <div
        v-for="(reservation, index) in reservations" :key="index"
      >
        <div v-if="reservation.isScheduled">예정</div>
        <div v-else>완료</div>
        <div>
          <span>{{ reservation.date }}</span>
          <span>{{ reservation.time }}</span>
        </div>
        <div>{{ reservation.trainerName }}</div>
        <div
          v-if="reservation.isScheduled"
          @click="handleCancel(reservation.reservationId)"
        >
          취소하기
        </div>
      </div>
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
    }
  },
  created() {
    getTrainers()
    .then(res => {
      this.trainers = res.data      
    })

    getReservations()
    .then(res => {
      console.log(res)
      const reservations = res.data

      this.reservations = reservations.map(r => {
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
    })

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
    }
  }
}
</script>

<style>

</style>