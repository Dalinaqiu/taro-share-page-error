/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-09-18 15:17:46
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-09-20 11:06:33
 * @FilePath: /ai-writer-miniprogram/src/pages/first-page/index.tsx
 * @Description: 新首页，多个小程序的统一入口
 */
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { useEffect } from 'react'
import miniprogramName from '@/images/name.png'
import foxScriptImage from '@/images/fox-script.png'
import boxAnimalImage from '@/images/box-animal.png'
import bookOpposeImage from '@/images/book-oppose.png'
import inspirationTheaterImage from '@/images/inspiration-theater.png'
import { URL_FONT } from '@/utils/constant.js'
import { getLoginCode, login } from '@/utils/index'

import './index.scss'

const prefix = 'first-page'

const data = [
  {
    key: 'fox-script',
    name: '胡来剧本',
    pic: foxScriptImage,
    desc: '我的cp圆梦了',
    path: '/pages/fox-script/index/index'
  },
  {
    key: 'box-animal',
    name: '生物盲盒',
    pic: boxAnimalImage,
    desc: '神奇生物在哪里',
    path: '/pages/animal-box/index/index'
  },
  {
    key: 'book-oppose',
    name: '名著怼人',
    pic: bookOpposeImage,
    desc: '名著怼人宝典',
    path: '/pages/fox-script/index/index'
  },
  {
    key: 'inspiration-theater',
    name: '灵感剧场',
    pic: inspirationTheaterImage,
    desc: '定制你的专属小说',
    path: '/pages/fox-script/index/index'
  }
]

export default () => {

  const recirect = path => {
    return Taro.navigateTo({
      url: path,
    })
  }

  useEffect(async () => {
    if (!Taro.getStorageSync('token')) {
      const loginResponse = await login({ code: await getLoginCode() });
      const newToken = loginResponse.data.token;  
      // Update token in storage
      Taro.setStorageSync('token', newToken);
    }

    Taro.loadFontFace({
      global: true,
      family: 'MaokenAssortedSans', //Css中引用使用的字体名
      source: `url("${URL_FONT}")`,
    })
  }, [])

  return (
    <View className={`${prefix}`}>
      <Image className={`${prefix}-name`} src={miniprogramName} />
      {
        data.map(item => (
          <View
            className={`${prefix}-item ${item.key}`}
            key={item.key}
            onClick={() => recirect(item.path)}
          >
            <Image src={item.pic} mode="aspectFit" />
            <Text>{item.desc}</Text>
          </View>
        ))
      }
    </View>
  )
}