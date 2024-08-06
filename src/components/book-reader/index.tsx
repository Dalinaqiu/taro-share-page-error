/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-07-01 15:10:21
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-08-02 14:00:54
 * @FilePath: /td-test/src/components/book-reader/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react'
import { View, ScrollView } from '@tarojs/components'
import EasyTyper from 'easy-typer-js'
import { marked } from 'marked'
import Taro from '@tarojs/taro'
import { useRef } from 'react'
import './index.scss'

const prefix = 'book-reader'

export default props => {
  const [value, setValue] = useState(props.content)
  const [typer, selectTyper] = useState({})
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0)

  // 将 &quot; 替换为 "
  const strTransform = (str) => {
    str = str.replace(/&#39;/g, "'")
    return str.replace(/&quot;/g, '"')
  }

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
    let s = await marked(str || '')
    s = strTransform(s)
    // 实例化
    const typer = new EasyTyper(obj, s, completeAsentence, changeOutput)
    selectTyper(typer)
  }

  // 输出完毕后的回调函数
  const completeAsentence = (v) => {
    v.obj.output && props.onComplete && props.onComplete()
  }

  // 钩子函数和setState结合
  const changeOutput = (output) => {
    setValue(output)
    props.onChange && props.onChange(output)
    
    // setScrollTop(scrollTop + 1)
    scrollToBottom()
  }

  const handleScroll = (event) => {
    props.onScroll && props.onScroll(event)
  };

  const getMarkdownText = () => {
    // return { __html: value || '' }
    return { __html: strTransform(marked(value || '')) }
  }

  const scrollToBottom = () => {
    if (containerRef.current) {
      Taro.createSelectorQuery()
        .select('#scrollView')
        .boundingClientRect((rect) => {
          rect && setScrollTop(rect.height)
        })
        .exec()
    }
  }

  useEffect(() => {
    if (props.noTyper) {
      setValue(props.content)
    }
    else {
      initTyper(props.content)
      setTimeout(() => {
        setScrollTop(9999)
      })
    }
  }, [props.content])
  
  return (
    <ScrollView
      ref={containerRef}
      className={`${prefix} ${props.className || ''}`}
      scrollY
      scrollWithAnimation
      scrollTop={scrollTop}
      style={{ height: '300px' }}
      onScrollToLower={scrollToBottom}
      onScroll={props.noTyper ? handleScroll : () => {}}
    >
      <View id="scrollView" dangerouslySetInnerHTML={getMarkdownText()}></View>
    </ScrollView>
  )
}