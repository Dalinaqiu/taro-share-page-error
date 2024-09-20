/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-09-19 14:31:52
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-09-20 11:44:59
 * @FilePath: /ai-writer-miniprogram/src/pages/animal-box/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro from '@tarojs/taro'
import { View, Image, Text, Picker } from '@tarojs/components'
import { AtInput, AtListItem, AtList, AtButton } from 'taro-ui'
import AnimalBoxTitle from '@/images/animal-box-title.png'
import { useState } from 'react'
import AnimalBoxModal from '@/components/animal-box-model'
import { setAdSuccess, check } from '@/utils/swmh'

import './index.scss'

const prefix = 'animal-box'

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
        url: '/pages/animal-box/detail/index'
      })
    }
  }

  // 重置次数
  const resetNum = async () => {
    await setAdSuccess()
    setShowModel(false)
    // Taro.navigateTo({
    //   url: '/pages/animal-box/detail/index'
    // })
  }

  return (
    <View className={`${prefix}`}>

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
        placeholder='单行输入'
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
            <AtListItem title='' extraText={data.date} />
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