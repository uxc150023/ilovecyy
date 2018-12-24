import axios from 'axios'
import { baseUrl } from '@/config/env'



/**
 * 登陆
 */
export const USERLOGING = (params) => axios.post(baseUrl + 'learn/useLogin/UserLoging', params)

// export const currentprice = () => axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')

/**
 * 查询学会信息 learn/stuorg/info
 */
export const GETMYWORLDINFO = (params) => axios.post(baseUrl + 'learn/stuorg/info', params)

/**
 * 判断用户是否存在未完成订单
 * learn/useLogin/IsLivOrders
 */
export const ISLIVORDERS = (params) => axios.post(baseUrl + 'learn/useLogin/IsLivOrders', params)

/**
 * 图形验证码 learn/useLogin/validateCode
 */
export const VALIDATECODE = (params) => axios.post(baseUrl + 'learn/useLogin/validateCode', params)