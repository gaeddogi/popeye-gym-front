import { authRequest } from '@/api/index.js'

function getUserAll(emailParam) {
    return authRequest.get('/api/v1/admin/users', 
      {params: {emailParam}}
    ) 
} 

export { getUserAll }