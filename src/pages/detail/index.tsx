/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-07-01 15:29:36
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-07-03 16:16:32
 * @FilePath: /td-test/src/pages/detail/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { View } from '@tarojs/components'
import BookReader from '@/components/book-reader'
import { useRouter } from '@tarojs/taro'
import { getScript } from "@/utils/index";
import { useEffect, useState } from 'react'
import Taro from '@tarojs/taro';
import './index.scss'
const prefix = 'detail'

export default () => {
  const [content, setContent] = useState('')
  const router = useRouter()

  useEffect(() => {
    const { outlineId, uid } = router.params
    Taro.showLoading({
      title: '加载中',
    })
    getScript({
      outline_id: parseInt(outlineId),
      uid,
    }).then(d => {
      Taro.hideLoading()
      console.log(d, 'ddd')
      setContent(`${d.data.script}`)
    })
  }, [])
  return (
    <View className={`${prefix}`}>
      <BookReader isMarkdown content={content} />
    </View>
  )
}