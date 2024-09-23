/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-09-19 14:31:52
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-09-23 16:59:08
 * @FilePath: /ai-writer-miniprogram/src/pages/animal-box/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro from '@tarojs/taro'
import { View, Image, Text, Picker } from '@tarojs/components'
import { AtInput, AtListItem, AtList, AtButton } from 'taro-ui'
import AnimalBoxTitle from '@/images/animal-box-title.png'
import { useState, useEffect } from 'react'
import AnimalBoxModal from '@/components/animal-box-model'
import { setAdSuccess, check, reportParam } from '@/utils/swmh'
import { URL_FONT } from '@/utils/constant.js'
import CustomNavbar from '@/components/custom-navbar'

import './index.scss'

const prefix = 'animal-box'

const aa = Taro.createRewardedVideoAd({
  adUnitId: 'adunit-d3305740a9b31515'
})

const showToast = (title) => {
  Taro.showToast({
    title: title,
    icon: 'none',
    duration: 2000
  });
};


export default () => {
  const [data, setData] = useState({appellation: '', date: ''})
  const [showModel, setShowModel] = useState(false)

  const redirect = async () => {
    if (!data.appellation) {
      return Taro.showToast({
        title: '请输入称呼',
        icon: 'none',
        duration: 1000
      })
    }
    Taro.setStorageSync('appellation', data.appellation)
    const d = await check({appellation: data.appellation})

    if (d.data.count) { // 没有次数
      setShowModel(true)
    }
    else {
      // 还有次数
      Taro.navigateTo({
        url: '/animal-box/pages/detail/index'
      })
    }
  }

  // 重置次数
  const resetNum = async () => {
    reportParam(2)
    // TODO: 开发跳过激励视频
    await setAdSuccess()
    setShowModel(false)
    Taro.navigateTo({
      url: '/animal-box/pages/detail/index'
    })

    // TODO:发布体验版或者上线放开
    // aa.show().then(() => {

    // }).catch(err => {
    //   aa.load().then(() => aa.show())
    //   console.log('广告显示失败', err)
    // })
  }

  useEffect(() => {
    Taro.loadFontFace({
      global: true,
      family: 'MaokenAssortedSans', //Css中引用使用的字体名
      source: `url("${URL_FONT}")`,
    })

    reportParam(1)

    // 监听广告加载完成事件
    aa.onLoad(async () => {
      console.log('广告加载完成')
    });

    // 监听广告加载失败事件
    aa.onError(err => {
      showToast('广告加载失败');
    });

    // 监听广告关闭事件
    aa.onClose(async (res) => {
      if (res && res.isEnded) {
        console.log('用户完整观看了广告');
        // 在这里处理用户观看完广告后的逻辑，比如发放奖励
        await setAdSuccess()
        setShowModel(false)
        Taro.navigateTo({
          url: '/animal-box/pages/detail/index'
        })
        console.log('广告加载完成');
      } else {
        console.log('用户未完整观看广告');
      }
    },);

    aa.load().then(() => console.log('加载成功')).catch(err => showToast('广告加载失败'))

    return () => aa.destroy()
  }, [])

  return (
    <View className={`${prefix}`}>
      <CustomNavbar />
      {
        showModel && (
          <AnimalBoxModal
            isopen={showModel}
            onClose={() => setShowModel(false)}
            onConfirm={resetNum}
          />
        )
      }
      <Image className={`${prefix}-title`} src={AnimalBoxTitle} />

      <Text className={`${prefix}-label`}>
        您的称呼
      </Text>
      <AtInput
        placeholder='输入您的姓名'
        className={`${prefix}-input`}
        placeholderClass={`${prefix}-input-placeholder`}
        onChange={e => setData({
          ...data,
          appellation: e
        })}
        value={data.appellation}
      />

      <Text className={`${prefix}-label`}>
        出生年月日
      </Text>
      <View className={`${prefix}-date-picker`}>
        <Picker
          mode='date'
          onChange={(e) => {
            setData({
              ...data,
              date: e.detail.value
            })
          }}
          value={data.date}
        >
          <AtList>
            <AtListItem title='' extraText={data.date || '请选择出生年月日'} />
          </AtList>
        </Picker>
      </View>

      <View>
        <AtButton
          type='primary'
          className={`${prefix}-button`}
          onClick={redirect}
        >
          穿越前世之旅
        </AtButton>
      </View>
    </View>
  )
}