/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-09-23 16:26:00
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-09-23 17:29:04
 * @FilePath: /ai-writer-miniprogram/src/components/custom-navbar/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/components/CustomNavbar/index.js
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import Home from '@/images/home.png'
import Left from '@/images/left.png'
import './index.scss'

const CustomNavbar = () => {
  const statusBarHeight = Taro.getSystemInfoSync().statusBarHeight

  return (
    <View className='custom-navbar'
      style={{ paddingTop: `${statusBarHeight}px`}}
    >
      <Image className='image' src={Left} onClick={() => Taro.navigateBack()} />
      <Image className='image' src={Home} onClick={() => Taro.navigateTo({ url: '/pages/index/index' })} />
    </View>
  )
}

export const customHeight = (Taro.getSystemInfoSync().statusBarHeight || 50) + 40

export default CustomNavbar