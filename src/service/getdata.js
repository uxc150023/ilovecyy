import axios from 'axios'
import { baseUrl } from '@/config/env'



/**
 * 登陆
 */
export const USERLOGING = (params) => axios.post(baseUrl + 'learn/useLogin/UserLoging', params)
/**
 * 查询学会信息 learn/stuorg/info
 */
export const GETMYWORLDINFO = (params) => axios.post(baseUrl + 'learn/stuorg/info', params)
/**
 * 判断用户是否存在未完成订单 learn/useLogin/IsLivOrders
 */
export const ISLIVORDERS = (params) => axios.post(baseUrl + 'learn/useLogin/IsLivOrders', params)
/**
 * 图形验证码 learn/useLogin/validateCode
 */
export const VALIDATECODE = (params) => axios.post(baseUrl + 'learn/useLogin/validateCode', params)
/**
 * 短信验证码
 */
export const NOTESIMPORT = (params) => axios.post(baseUrl + 'learn/useLogin/NoteSIMPort', params)

/**
 * 重置密码-验证码
 */
export const NOTESIMPORTUSERRESET = (params) => axios.post(baseUrl + 'learn/useLogin/NoteSIMPortUserReset', params)
/**
 * 重置密码-个人
 */
export const RESETPASSWN = (params) => axios.post(baseUrl + 'learn/useLogin/resetPassWN', params)
/**
 * 用户注册
 */
export const REGISTER = (params) => axios.post(baseUrl + 'learn/useLogin/REGISTER', params)