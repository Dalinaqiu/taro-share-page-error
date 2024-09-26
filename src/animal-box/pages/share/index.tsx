/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-09-25 18:59:22
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-09-26 10:14:44
 * @FilePath: /ai-writer-miniprogram/src/animal-box/pages/share/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { View } from "@tarojs/components";
import Taro, { useShareAppMessage, useShareTimeline } from "@tarojs/taro"
import CustomNavbar, { customHeight } from '@/components/custom-navbar'

export default () => {
  useShareAppMessage((res) => {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    
    const id = Taro.getStorageSync('id')
    return {
      title: 'cdca',
      path: `/animal-box/pages/share/index?id=${id}`,
    }
  })

  useShareTimeline(() => {
    const id = Taro.getStorageSync('id')
    return {
      title: 'cdac',
      query: `id=${id}`,
      path: `/animal-box/pages/share/index?id=${id}`,
    }
  })
  return (
    <View style={{ marginTop: `${customHeight}px`}}>
      {/* <CustomNavbar /> */}
      Share Page
    </View>
  );
}