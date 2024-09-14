/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-09-12 18:09:25
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-09-12 18:21:50
 * @FilePath: /ai-writer-miniprogram/src/utils/hljb.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { axios } from './index';
import { BASE_URL, BASE_REPORT_URL } from "./config"
import { handleResponse } from "./util"

const prefixUrl = BASE_URL + '/hljb'

// 获取穿越配置
export const getCross = () => axios.get(`${prefixUrl}/cross_over`).then(res => handleResponse(res))

// 获取大纲
export const getOutline = (data: Record<string, unknown>) => axios.post(`${prefixUrl}/gen/outline`, data).then(res => handleResponse(res))

// 生成剧本
export const getScript = (data: Record<string, unknown>) => axios.post(`${prefixUrl}/gen/script`, data).then(res => handleResponse(res))


// 获取剧本
export const getScriptList = (data: { uid: string; outline_id: string; script_id: string }) => axios.get(`${prefixUrl}/script?uid=${data.uid}&outline_id=${data.outline_id}&script_id=${data.script_id}`).then(res => handleResponse(res))

// 行为上报
export const report = (data: Record<string, unknown>) => axios.post(`${BASE_REPORT_URL}/report`, data)

// 检查生成剧本次数
export const checkScript = (data: Record<string, unknown>) => axios.post(`${prefixUrl}/share/check`, data).then(res => handleResponse(res))

// 刷新次数
export const refreshCount = (data: Record<string, unknown>) => axios.post(`${prefixUrl}/share`, data).then(res => handleResponse(res))

// 获取分享图片
export const getSharePic = (data: Record<string, unknown>) => axios.post(`${prefixUrl}/share/pic`, data).then(res => handleResponse(res))

// 校验接口
export const validateOutlineParams = (data: Record<string, unknown>) => axios.post(`${prefixUrl}/check/outline`, data).then(res => handleResponse(res))

// 登录
export const login = (data: Record<string, unknown>) => axios.post(`${BASE_URL}/login`, data).then(res => handleResponse(res))