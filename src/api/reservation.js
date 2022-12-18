import { authRequest } from '@/api/index.js';

// trainer 예약스케줄 가져오기
function getScheduleOfTrainer(trainerId, startDt, endDt) {
  console.log(startDt, endDt)
  return authRequest.get(`/api/v1/reservations/trainers/${trainerId}`, 
    {params: {startDt, endDt}}
  ) 
}   

// 에약하기
function reservation(trainerId, dateTime) {
  return authRequest.post('/api/v1/reservations', {trainerId, dateTime})
}

// 예약취소
function cancel(reservationId) {
  return authRequest.post(`/api/v1/reservations/${reservationId}`)
}

// 예약 리스트
function getReservations(status, trainerId, page) {
  return authRequest.get('/api/v1/reservations',
    {params: {status, trainerId, page}}
  )
}

export { getScheduleOfTrainer, reservation, cancel, getReservations }
