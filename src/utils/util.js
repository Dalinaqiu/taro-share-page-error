/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-07-08 17:02:20
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-08-01 10:34:32
 * @FilePath: /ai-writer-miniprogram/src/utils/util.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const Taro = require('@tarojs/taro')

export const formatTime = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}
export const formatNumber = (n) => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
export const isUrl = (url) => {
  if (url != '') {
    var reg =
      /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
    return reg.test(url)
  }
  return false
}
export const filterEmoji = (inputValue) => {
  const ranges = [
    '\ud83c[\udf00-\udfff]',
    '\ud83d[\udc00-\ude4f]',
    '\ud83d[\ude80-\udeff]',
  ]
  let value = inputValue
  value = value.replace(new RegExp(ranges.join('|'), 'g'), '')
  return value
}
export const objToQueryString = (obj) => {
  // 对象转为 queryString 的格式
  let queryStr = ''
  for (let key in obj) {
    // 参数值不存在时，统一上报为空字符串
    queryStr += `&${key}=${obj[key] || ''}`
  }
  queryStr = queryStr.replace('&', '?')
  console.log('fn', queryStr)
  return queryStr
}
export const genReportUrl = (path, event) => {
  const identityInfo = Taro.getStorageSync('identityInfo')
  const queryInfo = Taro.getStorageSync('queryInfo')
  const obj = {
    lpevent: event,
    ...identityInfo,
    ...queryInfo,
  }
  let queryStr = objToQueryString(obj)
  const url = `${path}${queryStr}`
  console.log('rep url', url)
  return url
}

export const SHARE_TITLE = '小时候磕的CP今天成真了？？？';

export const getTitle = () => {
  const { book = {}, name = {}, name2 = {}, relation = {}, cross = {}, style = {} } = Taro.getStorageSync('pageState')
  return name.label && cross.label && style.label
    ? (
        name2.label
          ? `${name.label}✖️${name2.label}✖️${style.label}`
          : `${name.label}✖️${cross.label}✖️${style.label}`
      )
    : SHARE_TITLE;
}

export default {
  formatTime,
  isUrl,
  filterEmoji,
  objToQueryString,
  genReportUrl,
}
