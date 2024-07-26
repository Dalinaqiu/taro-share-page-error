/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-07-01 11:44:15
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-07-26 14:05:51
 * @FilePath: /td-test/src/pages/outline/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { View, Text } from "@tarojs/components";
import Taro, {useRouter, getCurrentInstance} from "@tarojs/taro";
import { AtButton } from 'taro-ui'
import React, { useEffect, useState } from "react";
import BookReader from "@/components/book-reader";
import { getOutline } from "@/utils/index";

import './index.scss';

const prefix = 'create';

export default () => {
  // const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [outlineId, setOutlineId] = useState('')
  const { router } = getCurrentInstance();
  // const router = useRouter()
  // console.log(router1?.params, 'params')

  const back = () => {
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
    Taro.navigateTo({
      url: `/pages/detail/index?outlineId=${outlineId}&uid=${router.params.uid}`,
    })
  };

  const getValue = () => {

    // console.log(router?.params, 'params')
    // console.log(decodeURIComponent(router?.params?.book || ''), 'query')
    const params = router?.params || {};
    Taro.showLoading({
      title: '加载中',
    })
    getOutline({...params}).then(d => {
      setOutlineId(d.data.id)
      setValue(d.data.outline)
    }).finally(() => Taro.hideLoading())
  }

  useEffect(() => {
    getValue()
  }, [])
  
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
        <AtButton onClick={getValue}>
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
          onClick={goDetail}
        >
          开启穿越之旅
        </AtButton>
      </View>
    </View>
  );
}