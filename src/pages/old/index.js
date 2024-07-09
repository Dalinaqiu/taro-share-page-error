import withWeapp, { cacheOptions } from '@tarojs/with-weapp'
import { Block, View, Image } from '@tarojs/components'
import React from 'react'
import Taro from '@tarojs/taro'
import './index.scss'
//index.js
cacheOptions.setOptionsToCache({
  data: {
    userInfo: {},
    canIUse: Taro.canIUse('button.open-type.getUserInfo'),
    imgUrl: 'https://fe-res.go.sohu.com/website-building/miniprogram/index.png',
  },
})
@withWeapp(cacheOptions.getOptionsFromCache())
class _C extends React.Component {
  render() {
    const { imgUrl } = this.data
    return (
      <View>
        <Image className="img-index" src={imgUrl} mode="widthFix"></Image>
      </View>
    )
  }
}
export default _C
