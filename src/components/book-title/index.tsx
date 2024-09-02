/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-07-28 15:23:21
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-07-30 17:28:23
 * @FilePath: /ai-writer-miniprogram/src/components/book-title/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { View } from "@tarojs/components"
import { marked } from 'marked'
import './index.scss'

const prefix = 'book-title'

const strTransform = (str) => {
  return str.replace(/&quot;/g, '"')
}

export default ({
  title
}) => {

  const getMarkdownText = () => {
    // return { __html: value || '' }
    return { __html: strTransform(marked(title || '')) }
  }

  const hasSignal = (title) => {
    return title.includes('《')
  }

  return (
    <View className={`${prefix}`}>
      <View dangerouslySetInnerHTML={getMarkdownText()}></View>
    </View>
  )
}