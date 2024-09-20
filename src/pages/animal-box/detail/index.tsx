/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-09-19 17:16:19
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-09-20 15:02:30
 * @FilePath: /ai-writer-miniprogram/src/pages/animal-box/detail/index.tsx
 * @Description: 详情页或者转发页
 */
import Taro, { useRouter, useShareAppMessage, useShareTimeline } from "@tarojs/taro"
import { View, Text, Image } from "@tarojs/components"
import { useState, useEffect, useCallback } from "react"
import { AtButton } from "taro-ui"
import AnimalBoxDetailTitle  from '@/images/animal-box-detail-title.png'
import { genBio, getSharePic, getBio } from '@/utils/swmh'
import AnimalBoxShare from "@/images/animal-box-share.png"

import './index.scss'

const prefix = 'animal-box-detail'

const btn = [{
  name: '看看我的前世',
  type: 'orange',
  onClick: () => {
    return Taro.navigateTo({
      url: '/pages/animal-box/index/index'
    })
  }
}]

export default () => {
  const [type, setType] = useState('inner')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    id: '',
    appellation: '',
    content: ''
  })
  const router = useRouter()
  const { id = '' } = router?.params || {}

  const btns = [
    {
      name: '重置前世',
      type: 'primary',
      onClick: () => {
        Taro.navigateBack()
      }
    },
    {
      name: '寻找同类',
      type: 'primary',
      onClick: () => {
        Taro.showShareMenu({
          withShareTicket: true,
          showShareItems: ['shareAppMessage', 'shareTimeline']
        })
      }
    },
    {
      name: '保存',
      type: 'primary',
      onClick: useCallback(() => getSharePic({id: data.id}), [data.id])
    }
  ]

  const btnGroup = type === 'inner' ? btns : btn

  // 处理“”引号为span标签
  const transSync = (str: string) => {
    const regex = /“([^”]+)”/g;
    const content = str.replace(regex, '<p>$1</p>')
    return content;
  }

  useShareAppMessage(() => {
    return {
      title: '分享我的前世',
      path: `/pages/animal-box/detail/index?id=${data.id}`,
      imageUrl: AnimalBoxShare
    }
  })

  useShareTimeline(() => {
    return {
      title: '分享我的前世',
      query: `id=${data.id}`,
      path: `/pages/animal-box/detail/index?id=${data.id}`,
    }
  })

  useEffect(async () => {
    if (id) {
      setType('outer')
      const d = await getBio(id)
      setData({ ...d.data, id });
    }
  }, [id]);
    
  useEffect(() => {
    const appellation = Taro.getStorageSync('appellation')
    if (appellation) {
      setLoading(true)
      genBio({appellation}).then(d => {
        const { content = '', id } = d.data
        setData({
          id,
          appellation,
          content: transSync(content)
        })
      }).finally(() => setLoading(false))
    }
  }, [])

  // 内容区
  const RenderContent = () => {
    if (loading) {
      return (
        <View className={`${prefix}-rendering`}>
          正在根据你的信息
          寻找你的前世...
        </View>
      )
    }
    return (
      <View className={`${prefix}-content`}>
        <Text className={`${prefix}-content-name`}>
          {data.appellation}
        </Text>
        <View className={`${prefix}-content-content`} dangerouslySetInnerHTML={{ __html: data.content }} />
      </View>
    )
  }

  // 按钮区
  const RenderBtn = () => {
    return (
      <View className={`${prefix}-btn`}>
        {
          btnGroup.map(item => (
            <AtButton
              key={item.name}
              className={`${prefix}-button ${prefix}-btn-${item.type}`}
              onClick={item.onClick}
              disabled={loading}
            >
              {item.name}
            </AtButton>
          ))
        }
      </View>
    )
  }
  return (
    <View className={`${prefix}`}>
      {
        type !== 'inner' && <Image className={`${prefix}-img`} src={AnimalBoxDetailTitle} />
      }
      <RenderContent />
      <RenderBtn />
    </View>
  )
}