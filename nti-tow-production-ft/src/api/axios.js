/**
 * 请求配置
 */
import axios from 'axios';
import store from '@/store';
import { getToken, tokenKey } from '@/utils/storage';
import { errMsg, successMsg } from '@/utils/message'
import { closeLoading, showLoading } from '@/utils/message';
// 创建一个 axios 实例
const service = axios.create({
    timeout: 60000
});


//返回其他状态码
service.defaults.validateStatus = function (status) {
    return status >= 200 && status <= 500;
};



//http request拦截
service.interceptors.request.use(config => {
    if (config.loading) {
        showLoading()
    }
    const token = getToken()
    if (token) {
        config.headers[tokenKey] = token
    }
    return config
}, error => {
    return Promise.reject(error)
});

//http response 拦截
service.interceptors.response.use(response => {
    const config = response.config
    config.showLoading && closeLoading()
    const dataAxios = response.data;
    const {
        code,
        message,
    } = dataAxios;

    // 根据 code 进行判断
    if (code === 200) {
        if (config.showSuccess) {
            successMsg(message)
        }
        return dataAxios
    } else {
        if (config.showErr) {
            errMsg(message)
        }
        switch (code) {
            /**
             *  请求重发,code为401时调用登录方法,再重发请求
             */
            case 401:
                store.commit('user/logout')
                break;
            default:
                break;
        }
    }

}, error => {
    const response = error.response;
    response.config.showLoading && closeLoading()
    errMsg(response.message || error)
    return Promise.reject(new Error(error));
});

// 导出请求方法
export default function request({
    url, params, method = 'GET', type = 'data', showLoading = true, showErr = true, showSuccess = false, returnAll = false, headerObj = {}, isEncrypt = false
}) {

    let paramsType = type;  // 默认key值data
    if (method.toLocaleLowerCase() === "get" || method.toLocaleLowerCase() === "delete") {
        paramsType = "params";
    }
    return service({
        url,
        method,
        [paramsType]: params,
        headers: headerObj,
        showLoading,
        showErr,
        showSuccess,
        returnAll,
        isEncrypt
    })
}