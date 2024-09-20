/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-09-19 17:22:08
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-09-20 14:47:53
 * @FilePath: /ai-writer-miniprogram/src/components/animal-box-model/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { View, Text, Image } from "@tarojs/components"
import { AtButton } from "taro-ui"
import AnimalBoxModel from '@/images/animal-box-model.png'
import './index.scss'

interface ModelProp {
  isopen: boolean
  onClose: () => void
  onConfirm: () => void
}

const prefix = 'animal-box-model'

const content = '您已花光寻找前世的2次机会，是否看广告再次寻找'

export default (props: ModelProp) => {

  const onClose = () => props.onClose && props.onClose()

  const onConfirm = () => props.onConfirm && props.onConfirm()

  return (
    <View className={`${prefix}`}>
      <View className={`${prefix}-mask`}></View>
      <Image className={`${prefix}-image`} src={AnimalBoxModel} />

      <View className={`${prefix}-body`}>
        <Text>{content}</Text>

        <View className={`${prefix}-btn`}>
          <AtButton onClick={onClose} className={`${prefix}-cancel`}>
            取消
          </AtButton>
          <AtButton onClick={onConfirm} className={`${prefix}-confirm`}>
            寻找
          </AtButton>
        </View>
      </View>

    </View>
  )
}