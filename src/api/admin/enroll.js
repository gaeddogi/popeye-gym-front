import { authRequest } from '@/api/index.js'

function enroll(userId, trainerId, times) {
    return authRequest.post('/api/v1/admin/enrolls', {userId, trainerId, times}) 
} 

export { enroll }