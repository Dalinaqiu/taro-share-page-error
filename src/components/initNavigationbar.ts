/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-09-23 15:23:27
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-09-23 15:23:49
 * @FilePath: /ai-writer-miniprogram/src/components/initNavigationbar.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getSystemInfoSync, getMenuButtonBoundingClientRect } from '@tarojs/taro'

interface NavigateBarInfoProps {
  navBar: {
    height: number
    top: number
    py: number
    px: number
  }
  menuInfo: ReturnType<typeof getMenuButtonBoundingClientRect> | null
}

let navigateBarInfo: NavigateBarInfoProps = {
  navBar: { top: 0, height: 0, py: 0, px: 0 },
  menuInfo: null
}

export const useNavigationBar = () => {
  const initNavigationBar = () => {
    const systemInfo = getSystemInfoSync()
    const menuButtonInfo = getMenuButtonBoundingClientRect()
    // 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
    const statusBarHeight = systemInfo.statusBarHeight ?? 44
    // 状态栏到胶囊的间距
    const menuButtonStatusBarGap = menuButtonInfo.top - statusBarHeight
    const navBarHeight = menuButtonStatusBarGap * 2 + menuButtonInfo.height + statusBarHeight
    const navBarTop = statusBarHeight
    const paddingX = systemInfo.screenWidth - menuButtonInfo.right
    navigateBarInfo = {
      navBar: {
        height: navBarHeight,
        top: navBarTop,
        py: menuButtonStatusBarGap,
        px: paddingX
      },
      menuInfo: menuButtonInfo
    }
  }

  return {
    navigateBarInfo,
    initNavigationBar
  }
}

