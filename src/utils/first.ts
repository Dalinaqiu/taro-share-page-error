/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-09-20 17:19:27
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-09-20 17:35:57
 * @FilePath: /ai-writer-miniprogram/src/utils/first.ts
 * @Description: 首页相关埋点上报
 */
import { report } from './index'
import Taro from '@tarojs/taro'

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
        page_name: '首页'
      }
      break
    }
    case 2: {
      param = {
        ...base,
        event: 'Click',
        page_name: '首页',
        button_name: 'minicode1'
      }
      break
    }
    case 3: {
      param = {
        ...base,
        event: 'Click',
        page_name: '首页',
        button_name: 'minicode2'
      }
      break
    }
    case 4: {
      param = {
        ...base,
        event: 'Click',
        page_name: '首页',
        button_name: 'minicode3'
      }
      break
    }
    case 5: {
      param = {
        ...base,
        event: 'Click',
        page_name: '首页',
        button_name: 'minicode4'
      }
      break
    }
  }

  report(param)
}