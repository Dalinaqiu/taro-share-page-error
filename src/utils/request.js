const Taro = require('@tarojs/taro')
import { getNonce, getTimeStamp, getSignature } from './params.js'
import {
  APP_ID,
  SECRET,
  URL_BASE_PREFIX,
  URL_BASE_PREFIX_REPORT,
} from './constant.js'
export const request = (options) => {
  const { url, payload, signatureNames, success, fail, ...rest } = options
  const requestPayload = {
    ...payload,
    app_id: APP_ID,
    auth_nonce: getNonce(),
    auth_timestamp: getTimeStamp(),
  }
  let signatureParam = {} // 参与signature计算的参数
  if (signatureNames === undefined) {
    // 不传此参数表示所有param参与signature的计算
    signatureParam = payload
  } else {
    signatureNames.forEach((key) => {
      signatureParam[key] = payload[key]
    })
  }
  requestPayload.auth_signature = getSignature(
    requestPayload.app_id,
    requestPayload.auth_nonce,
    requestPayload.auth_timestamp,
    signatureParam,
    SECRET
  )
  return Taro.request({
    url: URL_BASE_PREFIX + url,
    data: requestPayload,
    success(res) {
      const resData = res.data || {}
      console.log(resData)
      if (resData.code === 0) {
        success && success(resData)
      } else {
        const msg = res.data.msg || '未知错误'
        Taro.showToast({
          title: msg,
          icon: 'none',
          duration: 2000,
        })
      }
    },
    fail(res) {
      const msg = res.errMsg || '未知错误'
      Taro.showToast({
        title: msg,
        icon: 'none',
        duration: 2000,
      })
      fail && fail(res)
    },
    ...rest,
  })
}
export const wx_request = (options) => {
  const { url, payload, success, fail, ...rest } = options
  const requestPayload = {
    ...payload,
  }
  return Taro.request({
    url: URL_BASE_PREFIX_REPORT + url,
    data: requestPayload,
    success(res) {
      const resData = res.data || {}
      console.log(resData)
      if (resData.code === 0 || resData == 'success') {
        success && success(resData)
      } else {
        const msg = res.data.msg || '未知错误'
        Taro.showToast({
          title: msg,
          icon: 'none',
          duration: 2000,
        })
      }
    },
    fail(res) {
      const msg = res.errMsg || '未知错误'
      Taro.showToast({
        title: msg,
        icon: 'none',
        duration: 2000,
      })
      fail && fail(res)
    },
    ...rest,
  })
}
export const uploadFile = (options) => {
  const { url, filePath, name, params, success, fail, ...rest } = options
  let formData = {}
  if (!params || JSON.stringify(data) == '{}') {
    formData = {
      user: 'test',
    }
  } else {
    formData = {
      ...params,
    }
  }
  return Taro.uploadFile({
    url: URL_BASE_PREFIX + url,
    filePath: filePath,
    name: name || 'file',
    header: {
      'Content-Type': 'multipart/form-data',
      accept: 'application/json',
    },
    formData: {
      user: 'test',
    },
    success(res) {
      success && success(res)
    },
    fail(res) {
      fail && fail(res)
    },
    ...rest,
  })
}
export default {
  request,
  wx_request,
  uploadFile,
}
