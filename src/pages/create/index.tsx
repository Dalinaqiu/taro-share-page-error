/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-07-01 11:44:15
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-07-02 10:31:28
 * @FilePath: /td-test/src/pages/create/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { View, Text } from "@tarojs/components";
// import { Button } from 'tdesign-mobile-react';
import Taro from "@tarojs/taro";
import { AtButton } from 'taro-ui'
import { useState } from "react";
import BookReader from "@/components/book-reader";

import './index.scss';
import { Icon } from "tdesign-icons-react";

const prefix = 'create';

const content = `你是一位资深小说作家，现在想在小说《西游记》中加入动画片《聪明的一休》中的一休，创作一本《西游记》同人小说，请提供一份你认为会非常吸引00后男生的小说大纲`

export default () => {

  const [value, setValue] = useState(content);

  const back = () => {
    Taro.navigateTo({
      url: '/pages/index/index',
    })
  };

  const goDetail = () => {
    console.log(1112222)
    Taro.navigateTo({
      url: '/pages/detail/index',
    })
  };
  
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
        <AtButton
          icon={<Icon name="refresh" />}
        >
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
          onClick={goDetail}
        >
          进入剧本
        </AtButton>
      </View>
    </View>
  );
}