/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-07-01 15:29:36
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-08-01 17:55:51
 * @FilePath: /td-test/src/pages/detail/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { View, Text } from '@tarojs/components'
import BookReader from '@/components/book-reader'
import BookTitle from '@/components/book-title'
import { useRouter, getCurrentInstance, useShareAppMessage, useShareTimeline, useUnload, useDidHide } from '@tarojs/taro'
import { AtButton } from 'taro-ui';
import { getScript, getSharePic, report, getScriptList } from "@/utils/index";
import { useEffect, useState, } from 'react'
import Taro from '@tarojs/taro';
import { getTitle } from '@/utils/util.js';
import './index.scss'

const prefix = 'detail'

export default () => {
  const [content, setContent] = useState({title: '', script: '', id: 0})
  const [contentHasWrite, setContentHasWrite] = useState('')
  const [third, setThird] = useState({oneThird: false, twoThird: false, all: false})
  const router = useRouter()
  const { type = '' } = router?.params || {}

  const getReportParam = () => {
    const obj = {}
    const templateData = Taro.getStorageSync('pageState')
    Object.keys(templateData).forEach(key => {
      obj[key] = templateData[key].label
    })
    return obj
  }

  const domReport = (d) => {
    const use_id = Taro.getStorageSync('identityInfo')?.openid || router?.params?.uid
    const info = Taro.getSystemInfoSync()
    const outline = Taro.getStorageSync('outline')
    report({
      ...d,
      use_id: use_id,
      client: info.system,
      outline_content: outline,
      story_title: content.title,
    })
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
      path: `/pages/detail/index?outlineId=${outlineId}&scriptId=${content.id}&uid=${uid}&type=share`,
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
      query: `outlineId=${outlineId}&scriptId=${content.id}&uid=${uid}&type=share`,
      path: `/pages/detail/index?outlineId=${outlineId}&scriptId=${content.id}&uid=${uid}&type=share`,
    }
  })

  Taro.onCopyUrl(() => {
    setTimeout(() => {
      Taro.setClipboardData({
        data: '暂不支持复制短链接',
        success:res => {
          Taro.hideToast()
          console.log(res)
        }
      })
    }, 1500)
  })

  // 返回
  const goBack = () => {
    if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP && !type) {
      Taro.navigateBack({
        delta: 2
      })
    }
    else {
      Taro.navigateTo({
        url: '/pages/index/index?back=detail',
      })
    }

    const obj = getReportParam()
    const p = {
      event: 'Click',
      button_name: type ? '创造我的穿越剧本' : '重启穿越之旅',
      ...obj,
      ...(type ? content.params : {story_length: contentHasWrite.length})
    }
    domReport({
      ...p
    })
  }

  // 分享
  const goShare = () => {
    Taro.showShareMenu({
      withShareTicket: true,
      showShareItems: ['shareAppMessage', 'shareTimeline']
    })

    const obj = getReportParam()
    domReport({
      event: 'Click',
      button_name: '分享',
      ...obj,
    })
  }

  // 保存
  const goSave = () => {
    const { outlineId, uid } = router?.params || {}
    getSharePic({script_id: content.id, outline_id: parseInt(outlineId), uid}).then(d => {
      console.log(d)
      Taro.previewImage({
        enablesavephoto: true,
        enableShowPhotoDownload: true,
        showmenu: true,
        current: d.data.url, // 当前显示图片的http链接
        urls: [d.data.url] // 需要预览的图片http链接列表
      })
    })

    const obj = getReportParam()
    domReport({
      event: 'Click',
      button_name: '保存图片记录穿越',
      ...obj,
    })
  }

  // 打印机组件打印完成事件
  const documentFinishReport = () => {
    const obj = getReportParam()
    domReport({
      event: 'TextFinish',
      story_length: content.script.length,
      ...obj,
    })
  }

  // 打印机组件change事件
  const contentChange = (value) => {
    setContentHasWrite(value)
  }

  // onScroll事件
  const handleScroll = (event) => {
    const { scrollTop, scrollHeight } = event.detail;
    const clientHeight = Taro.getSystemInfoSync().windowHeight;
    
    const oneThird = scrollHeight / 3;
    const twoThirds = (scrollHeight * 2) / 3;

    if (scrollTop + clientHeight >= twoThirds && !third.twoThird) {
      console.log('已滚动到三分之二');
      setThird({
        ...third,
        twoThird: true,
      })

      const use_id = Taro.getStorageSync('identityInfo')?.openid
      const info = Taro.getSystemInfoSync()
      const { outlineId, uid, scriptId } = router?.params || {}
      report({
        client: info.system,
        event: 'Slide2',
        use_id: uid,
        ...(type ? content.params : {})
      })
    } else if (scrollTop + clientHeight >= oneThird && !third.oneThird) {
      console.log('已滚动到三分之一');
      setThird({
        ...third,
        oneThird: true,
      })

      const use_id = Taro.getStorageSync('identityInfo')?.openid
      const info = Taro.getSystemInfoSync()
      const { outlineId, uid, scriptId } = router?.params || {}
      report({
        client: info.system,
        event: 'Slide1',
        use_id: uid,
        ...(type ? content.params : {})
      })
    } else if (scrollTop + clientHeight > scrollHeight && !third.all) {
      setThird({
        ...third,
        all: true,
      })
      console.log('已滚动到最后');

      const use_id = Taro.getStorageSync('identityInfo')?.openid
      const info = Taro.getSystemInfoSync()
      const { outlineId, uid, scriptId } = router?.params || {}
      report({
        client: info.system,
        event: 'Slide3',
        use_id: uid,
        ...(type ? content.params : {})
      })
    }
  }

  useEffect(() => {
    // const data = Taro.getLaunchOptionsSync();
    // type.value = data?.scene === 1154;
    // //开启分享
    // Taro.showShareMenu({
    //   withShareTicket: true,
    // })
    const { outlineId, uid, scriptId, type = '' } = router?.params || {}
    Taro.showLoading({
      title: '加载中',
    })
    if (type === 'share') {
      getScriptList({
        uid,
        outline_id: parseInt(outlineId),
        script_id: parseInt(scriptId)
      }).then(d => {
        setContent(d.data)
      }).finally(() => Taro.hideLoading())
    }
    else {
      getScript({
        outline_id: parseInt(outlineId),
        uid,
      }).then(d => {
        setContent(d.data)
      }).finally(() => Taro.hideLoading())
    }

    const use_id = Taro.getStorageSync('identityInfo')?.openid || uid
    const info = Taro.getSystemInfoSync()
    report({
      event: 'PageView',
      page_name: type ? '被分享页' : '剧本生成页',
      use_id: use_id,
      client: info.system,
      ...(type ? content.params : {})
    })
  }, [])

  // useDidHide(() => {
  //   console.log('useDidHide')
  //   // Taro.removeStorage({key: 'pageState'})
  //   const use_id = Taro.getStorageSync('identityInfo')?.openid
  //   const info = Taro.getSystemInfoSync()
  //   const templateData = Taro.getStorageSync('pageState')
  //   const outline = Taro.getStorageSync('outline')
  //   const obj = {}
  //   Object.keys(templateData).forEach(key => {
  //     obj[key] = templateData[key].label
  //   })
  //   report({
  //     ...obj,
  //     event: 'Exit',
  //     use_id: use_id,
  //     client: info.system,
  //     page_name: '剧本生成页',
  //     outline_content: outline,
  //     story_title: content.title,
  //     story_length: contentHasWrite.length || content.script.length,
  //   })
  // })

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
      
      <BookTitle title={content.title} />
      
      <BookReader
        isMarkdown
        noTyper={type === 'share'}
        className={`${prefix}-content`}
        content={content.script}
        onChange={contentChange}
        onComplete={documentFinishReport}
        onScroll={handleScroll}
      />

      <View className={`${prefix}-btn`}>
        {
          isShowShared()
            ? (
            <>
              <AtButton
                className={`${prefix}-btn1`}
                type="primary"
                onClick={goSave}
              >
                保存
            </AtButton> 
            <AtButton
              className={`${prefix}-btn1`}
              type="primary"
              onClick={goShare}
              openType="share"
            >
              分享
            </AtButton>
            </>
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