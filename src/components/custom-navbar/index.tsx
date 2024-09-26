/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-09-23 16:26:00
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-09-25 20:43:39
 * @FilePath: /ai-writer-miniprogram/src/components/custom-navbar/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/components/CustomNavbar/index.js
import Taro, { getSystemInfoSync, getMenuButtonBoundingClientRect } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Home from '@/images/home.png'
import Left from '@/images/left.png'
import './index.scss'

const CustomNavbar = () => {
  const statusBarHeight = Taro.getSystemInfoSync().statusBarHeight

  // 根据Taro.getCurrentPages判断当前栈里有没有首页，没有的话就跳转首页，有的话就判断是第几个页面，是首页就返回
const handleNavigation = () => {
  const pages = Taro.getCurrentPages();
  const homePagePath = 'pages/index/index';

  if (pages.length === 0) {
    Taro.navigateTo({ url: `/${homePagePath}` });
  } else {
    const index = pages.findIndex(item => item.route === homePagePath)
    if (index >= 0) {
      Taro.navigateBack({
        delta: pages.length - 1 - index
      });
    }
    else {
      Taro.navigateTo({ url: `/${homePagePath}` });
    }
  }
};

  return (
    <View className='custom-navbar'
      style={{ paddingTop: `${statusBarHeight}px`}}
    >
      <Image className='image' src={Left} onClick={() => Taro.navigateBack()} />
      <Image className='image' src={Home} onClick={handleNavigation} />
    </View>
  )
}

const calcNavigationBar = () => {
  const systemInfo = getSystemInfoSync()
    const menuButtonInfo = getMenuButtonBoundingClientRect()
    // 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
    const statusBarHeight = systemInfo.statusBarHeight ?? 44
    // 状态栏到胶囊的间距
    const menuButtonStatusBarGap = menuButtonInfo.top - statusBarHeight
    const navBarHeight = menuButtonStatusBarGap * 2 + menuButtonInfo.height + statusBarHeight
    const navBarTop = statusBarHeight
    const paddingX = systemInfo.screenWidth - menuButtonInfo.right
    
    return {
      navBar: {
        height: navBarHeight,
        top: navBarTop,
        py: menuButtonStatusBarGap,
        px: paddingX
      },
      menuInfo: menuButtonInfo
    }
}

export const customHeight = calcNavigationBar().navBar.height

export default CustomNavbar