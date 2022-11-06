import { authRequest } from '@/api/index.js';

// trainer 예약스케줄 가져오기
function getScheduleOfTrainer(trainerId, startDt, endDt) {
  console.log(startDt, endDt)
  return authRequest.get(`/api/v1/reservations/trainers/${trainerId}`, 
    {params: {startDt, endDt}}
  ) 
}   

// 에약하기
function reservation(trainerId, reservationDates) {
  //Long trainerId, List reservationDates<LocalDate date, int time>

  return authRequest.post('/api/v1/reservations', {trainerId, reservationDates})
}

export { getScheduleOfTrainer, reservation }
