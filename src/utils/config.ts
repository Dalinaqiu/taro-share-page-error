/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-07-02 17:50:38
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-08-04 10:18:32
 * @FilePath: /td-test/src/utils/config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro from '@tarojs/taro';

// 上线时需注释切换对应环境接口地址
// 开发
// export const BASE_URL = 'http://10.18.33.99:8751'

// 测试
// export const BASE_URL = 'https://api.box.sohu.com/hljb_test'
// export const BASE_REPORT_URL = 'https://api.box.sohu.com/hljb_test'

// 正式
export const BASE_URL = Taro.getEnv() === Taro.ENV_TYPE.WEB
  ? '/hljb/api'
  : 'https://api.box.sohu.com/hljb'
export const BASE_REPORT_URL = 'https://track.box.sohu.com/hljb'