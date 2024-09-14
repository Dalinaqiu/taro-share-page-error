/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-07-01 11:44:15
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-09-14 09:55:32
 * @FilePath: /td-test/src/pages/outline/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { View, Text } from "@tarojs/components";
import Taro, {useRouter, getCurrentInstance, useShareAppMessage, useShareTimeline, useUnload, useDidHide} from "@tarojs/taro";
import { AtButton } from 'taro-ui'
import React, { useEffect, useState, useRef } from "react";
import BookReader from "@/components/book-reader";
import { getOutline, checkScript, refreshCount, report } from "@/utils/index";
import CustomModal from "@/components/custom-modal";
import { getTitle, SHARE_TITLE } from '@/utils/util.js';
import BackgroundImg from '@/images/icons/img_v3_02da_4184cea9-296c-40af-8477-99bb40dfd99g.jpg'

import './index.scss';

const prefix = 'create';

const getTip = count => `是否分享给好友获得${count || 0}次机会？`

export default () => {
  const [value, setValue] = useState('');
  const [outlineId, setOutlineId] = useState('')
  const [count, setCount] = useState(0)
  // 弹窗相关
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState('')
  const [isShowToast, setIsShowToast] = useState(false)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const { router } = getCurrentInstance();
  const { uid = '' } = router?.params || {}

  const handleConfirm = () => {
    console.log('确定按钮被点击')
    closeModal()
  }

  const customButtons = [
    {
      text: '取消',
      onClick: () => closeModal()
    },
    {
      className: 'btn-share',
      text: '分享',
      openType: 'share',
      onClick: () => goShare()
    }
  ]

  // 获取上报接口参数
  const getReportParam = () => {
    const obj = {}
    const templateData = Taro.getStorageSync('pageState')
    Object.keys(templateData).forEach(key => {
      obj[key] = templateData[key].label
    })
    return obj
  }

  // 上报接口
  const domReport = (d) => {
    const use_id = Taro.getStorageSync('identityInfo')?.openid || router?.params?.uid
    const info = Taro.getSystemInfoSync()
    report({
      ...d,
      use_id: use_id,
      client: info.system,
      minicode: 1
    })
  }

  useShareAppMessage((res) => {
    const { uid = '' } = router?.params || {}
    const title = getTitle()
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
      refreshCount({outline_id: outlineId, uid: uid})
    }

    const obj = getReportParam()
    domReport({
      event: 'Click',
      button_name: '分享到微信',
      outline_content: value,
      ...obj,
    })

    if (isShowToast) {
      setTimeout(() => {
        Taro.showToast({
          title: `分享成功，获得${count}次穿越机会`,
          icon: 'none',
        })
        setIsShowToast(false)
      }, 1000)
    }
    

    domReport({
      event: 'ShareFinish',
      outline_content: value,
      ...obj,
    })

    return {
      title: SHARE_TITLE,
      path: `/pages/index/index?outlineId=${outlineId}&uid=${uid}&type=share`,
      imageUrl: BackgroundImg
    }
  })

  const back = () => {
    const obj = getReportParam()
    domReport({
      event: 'Click',
      button_name: '返回剧本设置页',
      outline_content: value,
      ...obj,
    })

    if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
      Taro.navigateBack({
        delta: 1
      })
    }
    else {
      Taro.navigateTo({
        url: '/pages/index/index?back=outline',
      })
    }
  };

  const goDetail = () => {
    const use_id = Taro.getStorageSync('identityInfo')?.openid
    if (!use_id || !outlineId) {
      return
    }
    checkScript({
      outline_id: outlineId,
      uid: use_id
    }).then(d => {
      // 次数用尽
      if (d.data.count) {
        setCount(d.data.count || 0)
        setModalContent(getTip(d.data.count))
        openModal()
      }
      else {
        // 还有次数
        Taro.navigateTo({
          url: `/pages/detail/index?outlineId=${outlineId}&uid=${use_id}`,
        })
      }
    })

    const obj = getReportParam()
    domReport({
      event: 'Click',
      button_name: '开启穿越之旅',
      outline_content: value,
      ...obj,
    })
  };

  const goShare = () => {
    setIsShowToast(true)
    closeModal()
    setTimeout(() => {
      Taro.showShareMenu({
        withShareTicket: true,
        showShareItems: ['shareAppMessage', 'shareTimeline']
      })
    })
  }

  const getValue = () => {

    // console.log(router?.params, 'params')
    // console.log(decodeURIComponent(router?.params?.book || ''), 'query')
    const params = router?.params.uid
      ? router?.params 
      : {
          ...getReportParam(),
          uid: Taro.getStorageSync('identityInfo')?.openid
        };
    Taro.showLoading({
      title: '加载中',
    })
    getOutline({...params}).then(d => {
      setOutlineId(d.data.id)
      setValue(d.data.outline)
      Taro.setStorageSync('outline', d.data.outline)
    }).finally(() => Taro.hideLoading())
  }

  // 再次绘制
  const reWrite = () => {
    getValue()
    const obj = getReportParam()
    domReport({
      event: 'Click',
      button_name: '再次绘制',
      outline_content: value,
      ...obj,
    })
  }

  useEffect(() => {
    console.log(router?.params, 'router?.params====>')
    if (router?.params.from) {
      Taro.navigateTo({
        url: `/pages/index/index?type=share`,
      })
    }
    else {
      getValue()
      domReport({
        event: 'PageView',
        page_name: '大纲生成页'
      })
    }
    
  }, [])

  // useDidHide(() => {
  //   console.log('useDidHide')
  //   // Taro.removeStorage({key: 'pageState'})
  //   const use_id = Taro.getStorageSync('identityInfo')?.openid
  //   const info = Taro.getSystemInfoSync()
  //   const templateData = Taro.getStorageSync('pageState')
  //   const obj = {}
  //   Object.keys(templateData).forEach(key => {
  //     obj[key] = templateData[key].label
  //   })
  //   report({
  //     ...obj,
  //     event: 'Exit',
  //     use_id: use_id,
  //     client: info.system,
  //     page_name: '大纲生成页',
  //     outline_content: value
  //   })
  // })
  
  return (
    <View className={prefix}>
      <Text className={`${prefix}-p`}>
        穿越蓝图
      </Text>

      <BookReader
        noTyper
        className={`${prefix}-content`}
        content={value}
      />

      <View className={`${prefix}-change`}>
        <AtButton onClick={reWrite}>
          再次绘制
        </AtButton>
      </View>
      
      <View className={`${prefix}-footer`}>
        <AtButton
          onClick={back}
        >
          返回
        </AtButton>
        <AtButton
          type='primary'
          // loading={loading}
          onClick={() => goDetail()}
        >
          开启穿越之旅
        </AtButton>
      </View>
      <CustomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="今日穿越时机已用尽"
        content={modalContent}
        onConfirm={handleConfirm}
        confirmText="确定"
        customButtons={customButtons}
      />
    </View>
  );
}