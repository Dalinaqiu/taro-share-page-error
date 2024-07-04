/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-07-01 11:44:15
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-07-04 15:52:39
 * @FilePath: /td-test/src/pages/create/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { View, Text } from "@tarojs/components";
import Taro, {useRouter, getCurrentInstance} from "@tarojs/taro";
import { AtButton } from 'taro-ui'
import { useEffect, useState } from "react";
import BookReader from "@/components/book-reader";
import { getOutline } from "@/utils/index";

import './index.scss';

const prefix = 'create';

export default () => {
  // const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [outlineId, setOutlineId] = useState('')
  const { router } = getCurrentInstance();
  // const router1 = useRouter()
  // console.log(router1?.params, 'params')

  const back = () => {
    Taro.navigateTo({
      url: '/pages/index/index',
    })
  };

  const goDetail = () => {
    Taro.navigateTo({
      url: `/pages/detail/index?outlineId=${outlineId}&uid=${router.params.uid}`,
    })
  };

  const getValue = () => {

    console.log(router?.params, 'params')
    console.log(decodeURIComponent(router?.params?.book || ''), 'query')
    const params = router?.params || {};
    Taro.showLoading({
      title: '加载中',
    })
    getOutline({
      book: decodeURIComponent(params?.book || ''),
      name: decodeURIComponent(params?.name || ''),
      cross: decodeURIComponent(params?.cross || ''),
      style: decodeURIComponent(params?.style || ''),
      uid: params?.uid || '123456'
    }).then(d => {
      Taro.hideLoading()
      setOutlineId(d.data.id)
      setValue(d.data.outline)
    })
  }

  useEffect(() => {
    getValue()
  }, [])
  
  return (
    <View className={prefix}>
      <Text className={`${prefix}-p`}>
        穿越大纲
      </Text>

      <BookReader
        className={`${prefix}-content`}
        content={value}
      />

      <View className={`${prefix}-change`}>
        <AtButton onClick={getValue}>
          换一个
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
          进入剧本
        </AtButton>
      </View>
    </View>
  );
}