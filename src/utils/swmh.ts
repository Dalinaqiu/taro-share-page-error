/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-09-20 10:25:37
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-09-20 15:01:29
 * @FilePath: /ai-writer-miniprogram/src/utils/swmh.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { axios } from './index';
import { BASE_URL, BASE_REPORT_URL } from "./config"
import { handleResponse } from "./util"

const prefixUrl = BASE_URL + '/swmh'

// 生成生物盲盒
export const genBio = (data: Record<string, undefined>) => axios.post(`${prefixUrl}/gen/bio`, data).then(res => handleResponse(res))

// 获取生物盲盒
export const getBio = (id: string) => axios.get(`${prefixUrl}/bio?id=${id}`).then(res => handleResponse(res))

// 成功广告激励
export const setAdSuccess = () => axios.post(`${prefixUrl}/ad`).then(res => handleResponse(res))

// 分享图
export const getSharePic = (data: {id: string | number}) => axios.post(`${prefixUrl}/share/pic`, data).then(res => handleResponse(res))

// 检查可生成次数
export const check = (data: {appellation: string}) => axios.post(`${prefixUrl}/check`, data).then(res => handleResponse(res))

// 上报接口参数
export const reportParam = () => {
  const base = {
    minicode: 2,
    event: 1
  }
}