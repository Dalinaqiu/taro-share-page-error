/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-07-01 15:29:36
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-07-10 18:14:37
 * @FilePath: /td-test/src/pages/detail/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { View } from '@tarojs/components'
import BookReader from '@/components/book-reader'
import { useRouter, getCurrentInstance, useShareAppMessage, useShareTimeline } from '@tarojs/taro'
import { AtButton } from 'taro-ui';
import { getScript } from "@/utils/index";
import { useEffect, useState } from 'react'
import Taro from '@tarojs/taro';
import './index.scss'

const prefix = 'detail'

export default () => {
  const [content, setContent] = useState('')
  const router = useRouter()
  const { type = '' } = router?.params || {}

  const getTitle = () => {
    const { book = {}, character = {}, world = {}, type = {} } = Taro.getStorageSync('pageState')
    return character.label && world.label && world.label && type.label
      ? `${character.label}✖️${world.label}✖️${type.label}`
      : '';
  }

  useShareAppMessage((res) => {
    const { outlineId = '', uid = '' } = router?.params || {}
    const title = getTitle()
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title,
      path: `/pages/detail/index?outlineId=${outlineId}&uid=${uid}&type=share`,
    }
  })

  useShareTimeline((res) => {
    const { outlineId = '', uid = '' } = router?.params || {}
    const title = getTitle()

    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title,
      path: `/pages/detail/index?outlineId=${outlineId}&uid=${uid}&type=share`,
    }
  })

  const goBack = () => {
    // Taro.navigateBack({
    //   delta: 2
    // })
    Taro.navigateTo({
      url: '/pages/index/index?back=detail',
    })
  }

  const goShare = () => {
    Taro.showShareMenu({
      withShareTicket: true,
      showShareItems: ['shareAppMessage', 'shareTimeline']
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
      setContent(`${d.data.script}`)
    }).finally(() => Taro.hideLoading())
  }, [])

  const isShowShared = () => {
    return Taro.getEnv() === Taro.ENV_TYPE.WEAPP && !type
  }

  const changeText = () => {
    return type === 'share'
      ? '开启我的穿越之旅'
      : '重启穿越之旅'
  }
  
  return (
    <View className={`${prefix}`}>
      
      <BookReader
        isMarkdown
        noTyper={type === 'share'}
        className={`${prefix}-content`}
        content={content}
      />

      <View className={`${prefix}-btn`}>
        {
          isShowShared()
            ? (
              <AtButton
                className={`${prefix}-btn1`}
                type="primary"
                onClick={goShare}
                openType="share"
              >
                分享
            </AtButton>    
            )
            : ''
        }
        <AtButton
            className={`${prefix}-btn2`}
            type="primary"
            onClick={goBack}
          >
            {changeText()}
        </AtButton>
      </View>
    </View>
  )
}