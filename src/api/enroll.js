import { authRequest } from '@/api/index';

function getTrainers() {
    return authRequest.get('/api/v1/enrolls')
}

export { getTrainers }