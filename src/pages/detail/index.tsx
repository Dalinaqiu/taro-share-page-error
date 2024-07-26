/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-07-01 15:29:36
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-07-19 16:58:44
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
  }

  const fillTextWrap = (ctx, text, x, y, maxWidth, lineHeight) => {
    // 设定默认最大宽度
    const systemInfo = Taro.getSystemInfoSync();
    const deciveWidth = systemInfo.screenWidth;
    // 默认参数
    maxWidth = maxWidth || deciveWidth;
    lineHeight = lineHeight || 20;
    // 校验参数
    if (typeof text !== 'string' || typeof x !== 'number' || typeof y !== 'number') {
      return;
    }
    // 字符串分割为数组
    const arrText = text.split('');
    // 当前字符串及宽度
    let currentText = '';
    let currentWidth;
    ctx.font = 'normal 11px sans-serif';
    ctx.setFontSize(16);
    ctx.setFillStyle('#3A3A3A');
    ctx.setTextAlign('justify');
    for (let letter of arrText) {
      currentText += letter;
      currentWidth = ctx.measureText(currentText).width;
      if (currentWidth > maxWidth) {
        ctx.fillText(currentText, x, y);
        currentText = '';
        y += lineHeight;
      }
    }
    if (currentText) {
      ctx.fillText(currentText, x, y);
    }
  }

  const goShare = () => {
    Taro.showShareMenu({
      withShareTicket: true,
      showShareItems: ['shareAppMessage', 'shareTimeline']
    })
  }

  const goSave = () => {
    const context = Taro.createCanvasContext('canvas')
    const imgPath1 = 'http://cdn.meitor.cn/meitor/main3.jpg';
    const imgPath2 = 'http://cdn.meitor.cn/meitor/main3.jpg';
    // Taro.getImageInfo({
    //   src: imgPath1,
    // }).then((res)=>{
    //     // context.drawImage(res.path, 0, 0, 375, 190);
    //       Taro.getImageInfo({
    //         src: imgPath2,
    //       }).then((res2)=>{
    //         // context.drawImage(res2.path, 250, 195, 86, 86);
    //         const h= fillTextWrap(context, '【润百颜玻尿酸】告别黄脸婆，一百这白丑', 20, 230, 190, 20);
            
    //       });
    // });
    context.font = 'normal 11px ArialMT sans-serif';
    context.setFontSize(16);
    context.setFillStyle('#FF6066');
    context.fillText('￥66', 40, 290);
    context.font = 'normal 11px  PingFangSC-Regular sans-serif';
    context.setFontSize(12);
    context.setFillStyle('#FA2E9A');
    context.fillText('扫描小程序码查看', 245, 300);
    context.draw(false, ()=> {
      Taro.canvasToTempFilePath({
        canvasId: 'canvas',
        success: function(res) {
          // 获得图片临时路径
          // _this.setState({
          //   imageTempPath:res.tempFilePath
          // })
        }
      })
    });
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
      <View className="poster-share__content">
        <canvas style="width: 375px; height: 320px;background:#fff" canvas-id="canvas"></canvas>
      </View>
    </View>
  )
}