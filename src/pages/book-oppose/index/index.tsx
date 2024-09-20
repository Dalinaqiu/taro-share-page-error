/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-09-19 14:12:39
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-09-19 14:13:00
 * @FilePath: /ai-writer-miniprogram/src/pages/book-oppose/index/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { useEffect } from 'react'
import './index.scss'

const prefix = 'book-oppose'

export default () => {
  useEffect(() => {
    // Initialization code here
  }, [])

  return (
    <View className={`${prefix}`}>
      <Text>Welcome to Book Oppose Page</Text>
    </View>
  )
}