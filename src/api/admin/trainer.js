import { authRequest } from '@/api/index';

function enroll(name, type) {
    return authRequest.post('/api/v1/admin/trainers', {name, type})
}

function getTrainerAll(nameParam, type, page) {
    return authRequest.get('/api/v1/admin/trainers',
        {params: {nameParam, type, page}}
    )
}

export { enroll, getTrainerAll }