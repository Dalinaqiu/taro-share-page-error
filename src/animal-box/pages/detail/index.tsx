/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-09-19 17:16:19
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-09-23 16:59:23
 * @FilePath: /ai-writer-miniprogram/src/pages/animal-box/detail/index.tsx
 * @Description: 详情页或者转发页
 */
import Taro, { useRouter, useShareAppMessage, useShareTimeline } from "@tarojs/taro"
import { View, Text, Image } from "@tarojs/components"
import { useState, useEffect, useCallback } from "react"
import { AtButton } from "taro-ui"
import AnimalBoxDetailTitle  from '@/images/animal-box-detail-title.png'
import { genBio, getSharePic, getBio, reportParam } from '@/utils/swmh'
import AnimalBoxShare from "@/images/animal-box-share.png"
import { marked } from 'marked'
import { URL_FONT } from '@/utils/constant.js'
import cx from 'classnames'
import CustomNavbar from '@/components/custom-navbar'

import './index.scss'

const prefix = 'animal-box-detail'

export default () => {
  const [type, setType] = useState('inner')
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState({
    id: '',
    appellation: '',
    content: ''
  })
  const router = useRouter()
  const { id = '' } = router?.params || {}

  // 处理“”引号为span标签
  const transSync = (str: string) => {
    const regex = /“([^”]+)”/g;
    const content = str.replace(regex, '<Text className="orange">$1</Text>')
    return marked(content);
  }

  useShareAppMessage((res) => {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    
    const id = Taro.getStorageSync('id')
    return {
      title: '分享我的前世',
      path: `/animal-box/pages/detail/index?id=${id}`,
      imageUrl: AnimalBoxShare
    }
  })

  useShareTimeline(() => {
    const id = Taro.getStorageSync('id')
    return {
      title: '分享我的前世',
      query: `id=${id}`,
      path: `/animal-box/pages/detail/index?id=${id}`,
    }
  })
    
  useEffect(() => {
    const appellation = Taro.getStorageSync('appellation')
    if (appellation && !id) {
      setLoading(true)
      genBio({appellation}).then(d => {
        const { content = '', id } = d.data
        setInfo({
          id,
          appellation,
          content: transSync(content)
        })
        Taro.setStorageSync('id', id)
        reportParam(13)
      }).catch(() => reportParam(12)).finally(() => setLoading(false))
    }

    if (id) {
      reportParam(3)
      setType('outer')
      getBio(id).then(d => {
        setInfo({
          id,
          appellation: d.data.bio.appellation,
          content: transSync(d.data.bio.content)
        })
      }).finally(() => setLoading(false))
    }
    else {
      reportParam(4)
    }

    Taro.loadFontFace({
      global: true,
      family: 'MaokenAssortedSans', //Css中引用使用的字体名
      source: `url("${URL_FONT}")`,
    })
  }, [])

  const sharePic = () => {
    if (loading) {
      return
    }
    const id = Taro.getStorageSync('id')
    return getSharePic({id}).then(d => {
      Taro.previewImage({
        enablesavephoto: true,
        enableShowPhotoDownload: true,
        showmenu: true,
        current: d.data.url, // 当前显示图片的http链接
        urls: [d.data.url] // 需要预览的图片http链接列表
      })
      reportParam(10)
    })
  }

  const btns = [
    {
      key: 'reset',
      name: '重置前世',
      type: 'primary',
      openType: '',
      onClick: () => {
        reportParam(8)
        return Taro.navigateBack({
          delta: 1
        })
      }
    },
    {
      key: 'find',
      name: '寻找同类',
      type: 'primary',
      openType: "share",
      onClick: () => {
        if (loading) {
          return 
        }
        reportParam(9)
        Taro.showShareMenu({
          withShareTicket: true,
          showShareItems: ['shareAppMessage', 'shareTimeline']
        })
      }
    },
    {
      key: 'save',
      name: '保存',
      type: 'primary',
      openType: '',
      onClick: sharePic
    }
  ]

  const btn = [{
    key: 'look',
    name: '看看我的前世',
    type: 'orange',
    openType: '',
    onClick: () => {
      console.log(11)
      reportParam(11)
      Taro.navigateTo({
        url: '/animal-box/pages/index/index'
      })
    }
  }]
  // 内容区
  const renderContent = useCallback(() => {
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
          {info.appellation}:
        </Text>
        <View className={`${prefix}-content-content`} dangerouslySetInnerHTML={{ __html: info.content }} />
      </View>
    )
  }, [info.appellation, loading])

  // 按钮区
  const renderBtn = useCallback(() => {
    const btnGroup = (type === 'inner' ? btns : btn)
    return (
      <View className={`${prefix}-btn`}>
        {
          btnGroup.map(item => (
            <AtButton
              key={item.name}
              className={cx(`${prefix}-button ${prefix}-btn-${item.type}`, {
                isLoading: loading && ['save', 'find'].includes(item.key)
              })}
              disabled={loading && ['save', 'find'].includes(item.key)}
              onClick={item.onClick}
              openType={item.openType}
            >
              {item.name}
            </AtButton>
          ))
        }
      </View>
    )
  }, [type, loading])

  return (
    <View className={`${prefix}`}>
      <CustomNavbar />
      {
        type === 'inner' ? <></> : <Image className={`${prefix}-img`} src={AnimalBoxDetailTitle} />
      }
      {renderContent()}
      {renderBtn()}
    </View>
  )
}