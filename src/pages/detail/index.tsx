/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-07-01 15:29:36
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-07-05 16:00:18
 * @FilePath: /td-test/src/pages/detail/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { View } from '@tarojs/components'
import BookReader from '@/components/book-reader'
import { useRouter, getCurrentInstance } from '@tarojs/taro'
import { AtButton } from 'taro-ui';
import { getScript } from "@/utils/index";
import { useEffect, useState } from 'react'
import Taro from '@tarojs/taro';
import './index.scss'

const prefix = 'detail'

export default () => {
  const [content, setContent] = useState('')
  const router = useRouter()

  const goBack = () => {
    // Taro.navigateBack({
    //   delta: 2
    // })
    Taro.navigateTo({
      url: '/pages/index/index?back=detail',
    })
  }

  useEffect(() => {
    const { outlineId, uid } = router?.params || {}
    Taro.showLoading({
      title: '加载中',
    })
    getScript({
      outline_id: parseInt(outlineId),
      uid,
    }).then(d => {
      console.log(d, 'ddd')
      setContent(`${d.data.script}`)
    }).finally(() => Taro.hideLoading())
  }, [])
  return (
    <View className={`${prefix}`}>
      <BookReader className={`${prefix}-content`} isMarkdown content={content} />
      <View>
        <AtButton
            type="primary"
            onClick={goBack}
          >
            重启穿越之旅
          </AtButton>
        </View>
    </View>
  )
}