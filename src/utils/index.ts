/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-07-02 17:47:47
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-07-31 19:50:13
 * @FilePath: /td-test/src/utils/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "axios"
import { BASE_URL} from "./config"
import Taro from "@tarojs/taro"

const prefixUrl = BASE_URL + '/v2'

export const transParams = (params) => {
  let ret = Object.keys(params).map((key) => {
    return [key, params[key]].join("=")
  }).join("&")
  // ret = encodeURI(ret)
  return ret
}

const handleResponse = res => {
  if (res.status === 200 && res.data.code === 0) {
    return res.data
  }
  else {
    Taro.showToast({
      title: res.data.msg,
      icon: 'none',
    })
    return Promise.reject(res)
  }
}

// 获取穿越配置
export const getCross = () => axios.get(`${prefixUrl}/cross_over`).then(res => handleResponse(res))

// 获取大纲
export const getOutline = data => axios.post(`${prefixUrl}/gen/outline`, data).then(res => handleResponse(res))

// 生成剧本
export const getScript = data => axios.post(`${prefixUrl}/gen/script`, data).then(res => handleResponse(res))

// 获取剧本
export const getScriptList = data => axios.get(`${prefixUrl}/script?uid=${data.uid}&outline_id=${data.outline_id}&script_id=${data.script_id}`).then(res => handleResponse(res))

// 行为上报
export const report = data => axios.post(`${BASE_URL}/report`, data).then(res => handleResponse(res))

// 检查生成剧本次数
export const checkScript = data => axios.post(`${prefixUrl}/share/check`, data).then(res => handleResponse(res))

// 刷新次数
export const refreshCount = data => axios.post(`${prefixUrl}/share`, data).then(res => handleResponse(res))

// 获取分享图片
export const getSharePic = data => axios.post(`${prefixUrl}/share/pic`, data).then(res => handleResponse(res))

// 校验接口
export const validateOutlineParams = data => axios.post(`${prefixUrl}/check/outline`, data).then(res => handleResponse(res))

export default {}