import axios from 'axios'
import { baseUrl } from '@/config/env'



/**
 * 登陆
 */
export const userLoging = (params) => axios.post(baseUrl + 'learn/useLogin/UserLoging', params)

// export const currentprice = () => axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')


