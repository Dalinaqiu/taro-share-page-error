/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-07-01 15:10:21
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-07-09 19:10:45
 * @FilePath: /td-test/src/components/book-reader/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import EasyTyper from 'easy-typer-js'
import { marked } from 'marked'
// import { marked } from "./marked"
// import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

import './index.scss'

const prefix = 'book-reader'

export default props => {
  const [value, setValue] = useState(props.content)
  const [typer, selectTyper] = useState({})

  const initTyper = async (str) => {
    // 配置对象
    const obj = {
      output: '',
      isEnd: false,
      speed: 20,
      singleBack: false,
      sleep: 0,
      type: 'normal',
      backSpeed: 20,
      sentencePause: false
    }
    const s = await marked(str || '')
    // 实例化
    const typer = new EasyTyper(obj, s, completeAsentence, changeOutput)
    selectTyper(typer)
  }

  // 输出完毕后的回调函数
  const completeAsentence = () => {
    console.log('输出完毕！长官！')
  }

  // 钩子函数和setState结合
  const changeOutput = (output) => {
    setValue(output)
  }

  const getMarkdownText = () => {
    // return { __html: value || '' }
    return { __html: marked(value || '') }
  }

  useEffect(() => {
    if (props.noTyper) {
      setValue(props.content)
    }
    else {
      initTyper(props.content)
    }
  }, [props.content])
  
  return (
    <View className={`${prefix} ${props.className || ''}`}>
      <View dangerouslySetInnerHTML={getMarkdownText()}></View>
    </View>
  )
}