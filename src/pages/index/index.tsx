/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-09-18 15:17:46
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-09-26 10:34:42
 * @FilePath: /ai-writer-miniprogram/src/pages/first-page/index.tsx
 * @Description: 新首页，多个小程序的统一入口
 */
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import miniprogramName from '@/images/name.png'
import foxScriptImage from '@/images/fox-script.png'
import boxAnimalImage from '@/images/box-animal.png'

import './index.scss'

const prefix = 'first-page'

const data = [
  {
    key: 'fox-script',
    name: '胡来剧本',
    pic: foxScriptImage,
    desc: '我的cp圆梦了',
    path: '/fox-script/pages/index/index'
  },
  {
    key: 'box-animal',
    name: '生物盲盒',
    pic: boxAnimalImage,
    desc: '神奇生物在哪里',
    // path: '/animal-box/pages/index/index'
    path: '/animal-box/pages/share/index?id=106'
  },
]

export default () => {

  const redirect = (path, index) => {
    return Taro.navigateTo({
      url: path,
    })
  }


  return (
    <View className={`${prefix}`}>
      <Image className={`${prefix}-name`} src={miniprogramName} />
      {
        data.map((item, index) => (
          <View
            className={`${prefix}-item ${item.key}`}
            key={item.key}
            onClick={() => redirect(item.path, index)}
          >
            <Image src={item.pic} mode="aspectFit" />
            <Text>{item.desc}</Text>
          </View>
        ))
      }
    </View>
  )
}