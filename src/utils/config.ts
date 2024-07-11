/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-07-02 17:50:38
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-07-11 14:15:13
 * @FilePath: /td-test/src/utils/config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// export const BASE_URL = 'https://ai.box.sohu.com/hljb/api'
import Taro from '@tarojs/taro';

export const BASE_URL = Taro.getEnv() === Taro.ENV_TYPE.WEB
  ? '/hljb/api'
  : 'https://ai.box.sohu.com/hljb/api'