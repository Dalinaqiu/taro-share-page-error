/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-09-20 10:25:37
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-09-20 17:38:08
 * @FilePath: /ai-writer-miniprogram/src/utils/swmh.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { axios, report } from './index';
import { BASE_URL } from "./config"
import { handleResponse } from "./util"
import Taro from '@tarojs/taro';

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
export const reportParam = (num: number) => {
  const info = Taro.getSystemInfoSync()
  const base = {
    minicode: 2,
    client: info.system,
  }

  let param = {}

  switch (num) {
    case 1: {
      param = {
        ...base,
        event: 'PageView',
        page_name: '盲盒首页'
      }
      break
    }
    case 2: {
      param = {
        ...base,
        event: 'PopView',
        page_name: '广告弹窗'
      }
      break
    }
    case 3: {
      param = {
        ...base,
        event: 'PageView',
        page_name: '结果页'
      }
      break
    }
    case 4: {
      param = {
        ...base,
        event: 'PageView',
        page_name: '被分享页'
      }
      break
    }
    case 5: {
      param = {
        ...base,
        event: 'Click',
        button_name: '生成'
      }
      break
    }
    case 6: {
      param = {
        ...base,
        event: 'Click',
        button_name: '取消'
      }
      break
    }
    case 7: {
      param = {
        ...base,
        event: 'Click',
        button_name: '寻找'
      }
      break
    }
    case 8: {
      param = {
        ...base,
        event: 'Click',
        button_name: '重置'
      }
      break
    }
    case 9: {
      param = {
        ...base,
        event: 'Click',
        button_name: '分享'
      }
      break
    }
    case 10: {
      param = {
        ...base,
        event: 'Click',
        button_name: '保存'
      }
      break
    }
    case 11: {
      param = {
        ...base,
        event: 'Click',
        button_name: '跳转盲盒首页'
      }
      break
    }
    case 12: {
      param = {
        ...base,
        event: 'Generation',
        status: 0
      }
      break
    }
    case 13: {
      param = {
        ...base,
        event: 'Generation',
        status: 1
      }
      break
    }
  }
  return report(param)
}