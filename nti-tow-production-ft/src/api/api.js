import request from "./axios";
import config from '@/config'


export function getList(data) {
    return request({
        url: `${config.api.baseUrl}/subject`,
        params: data
    })
}