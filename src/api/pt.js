import { authRequest } from '@/api/index';

function getPtInfo() {
    return authRequest.get('/api/v1/pts')
}

export { getPtInfo }