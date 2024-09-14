/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-07-02 17:47:47
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-09-13 14:33:38
 * @FilePath: /td-test/src/utils/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "axios"
import Taro from "@tarojs/taro"
import {
  getCross,
  getOutline,
  getScript,
  getScriptList,
  report,
  checkScript,
  refreshCount,
  getSharePic,
  validateOutlineParams,
  login
} from './hljb'

import { transParams } from './util'

// Axios request interceptor to add x-token header
axios.interceptors.request.use(async config => {
  const token = Taro.getStorageSync('token');
  if (token) {
    config.headers['X-Token'] = token;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Axios response interceptor to handle token expiration
axios.interceptors.response.use(response => {
  return response;
}, async error => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      // Perform login to get a new token
      const loginResponse = await login({ code: await getLoginCode() });
      const newToken = loginResponse.data.token;
      
      // Update token in storage
      Taro.setStorageSync('token', newToken);
      
      // Update the token in the original request and retry
      originalRequest.headers['X-Token'] = newToken;
      return axios(originalRequest);
    } catch (loginError) {
      console.error('Error refreshing token:', loginError);
      return Promise.reject(loginError);
    }
  }
  return Promise.reject(error);
});

// Helper function to get login code
async function getLoginCode() {
  try {
    const loginResult = await Taro.login();
    return loginResult.code;
  } catch (error) {
    console.error('Error getting login code:', error);
    throw error;
  }
}


// Export the axios instance with interceptors
export { default as axios } from 'axios';

export {
  getCross,
  getOutline,
  getScript,
  getScriptList,
  report,
  checkScript,
  refreshCount,
  getSharePic,
  validateOutlineParams,
  login,
  transParams
}


export default {}