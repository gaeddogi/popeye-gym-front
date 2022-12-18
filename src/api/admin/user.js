import { authRequest } from '@/api/index.js'

function getUserAll({emailParam, page}) {
    return authRequest.get('/api/v1/admin/users', 
      {params: {emailParam, page}}
    ) 
} 

export { getUserAll }