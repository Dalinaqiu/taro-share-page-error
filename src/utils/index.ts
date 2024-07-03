/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-07-02 17:47:47
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-07-02 18:13:33
 * @FilePath: /td-test/src/utils/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "axios"
import { BASE_URL} from "./config"

// 获取穿越配置
export const getCross = () => axios.get(`${BASE_URL}/cross_over`)

// 获取大纲
export const getOutline = data => axios.post(`${BASE_URL}/gen/outline`, data)

// 生成剧本
export const getScript = data => axios.post(`${BASE_URL}/gen/script`, data)

// 获取剧本
export const getScriptList = id => axios.get(`${BASE_URL}/script`, id)

export default {}