
import { View, Picker, Text } from '@tarojs/components'
import { useDidHide, useLoad, useShareAppMessage, useShareTimeline, useUnload } from '@tarojs/taro'
import React, { useEffect, useState } from 'react';
// import { Button, Cell, Picker, PickerItem, Loading } from 'tdesign-mobile-react';
import { AtForm, AtButton, AtList, AtListItem, AtInput } from 'taro-ui'
import Taro from '@tarojs/taro';
import { getCross, transParams, report, validateOutlineParams } from '@/utils/index'
import { useRouter, getCurrentInstance } from '@tarojs/taro'
import { request, wx_request } from '../../utils/request.js'
// import { templateConfig } from '@/mock/template-index.js'
import BackgroundImg from '@/images/icons/img_v3_02da_4184cea9-296c-40af-8477-99bb40dfd99g.jpg'
import { SHARE_TITLE } from '@/utils/util.js'

import './index.scss'

interface OptionsType {
  label: string;
  value: string | number;
  name?: string[];
}

const prefix = 'home'

export default function Index() {
  const [templateConfig, setTemplateConfig] = useState({})
  const [templateData, setTemplateData] = useState({})

  const router = useRouter()

  // 分享好友回调
  useShareAppMessage((res) => {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)
    }
    return {
      title: SHARE_TITLE,
      path: '/pages/index/index',
      imageUrl: BackgroundImg
    }
  })

  // 分享朋友圈回调
  useShareTimeline((res) => {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)
    }
    return {
      title: SHARE_TITLE,
      path: '/pages/index/index',
      imageUrl: BackgroundImg
    }
  })

  // 表单确认事件
  const onConfirm = (e, key, config) => {
    switch (config.form) {
      case 'input': {
        templateData[key].value = e.value
        domReport({
          button_name: config.label,
          [key]: e.value,
        })
        break
      }
      case 'select': {
        const label = templateConfig[key].options[e.value].label
        templateData[key].label = label
        templateData[key].value = e.value
        domReport({
          button_name: config.label,
          [key]: label,
        })
        break
      }
      case 'multiselect': {
        const label = templateConfig[key].options[e.value[0]].label
        const childLabel = templateConfig[key].options[e.value[0]].options[e.value[1]].label
        templateData[key].label = label
        templateData[key].value = e.value[0]

        templateData[config.childName].label = childLabel
        templateData[config.childName].value = e.value[1]

        domReport({
          button_name: config.label ? '时空行者1' : '时空行者2',
          [key]: label,
          [config.childName]: childLabel
        })
        break
      }
    }
    setTemplateData({...templateData})
  }

  // 获取用户登录信息
  const getUserIdentity = () => {
    Taro.login({
      success(res) {
        if (res.code) {
          const params = {
            jsCode: res.code,
          }
          request({
            url: '/submit/wechat/getUserInfo',
            payload: params,
            method: 'POST',
            success: (res) => {
              // 将 openid 存储起来
              Taro.setStorageSync('identityInfo', {
                openid: res?.data?.openid,
                unionid: res?.data?.unionid,
              })

              const info = Taro.getSystemInfoSync()

               // 埋点
              report({
                event: 'PageView',
                use_id: res?.data?.openid,
                client: info.system,
                page_name: '剧本设置页'
              })
            },
          })
        } else {
          console.log('登录失败', res.errMsg)
        }
      },
    })
  }

  // 生成一个参数为n的函数，返回0 - n之间的随机数
  const getRandom = n => {
    const random = Math.floor(Math.random() * (n + 1));
    return random;
  }

  // 随机生成
  const onFabClick = () => {
    if (templateData) {
      const obj = {}
      Object.keys(templateData).forEach(key => {
        obj[key] = templateData[key].label
      })
      domReport({
        button_name: '随机匹配',
        ...obj,
      })
    }

    Object.keys(templateConfig).forEach(key => {
      const item = templateConfig[key]
      if (['multiselect'].includes(item.form)) {
        const randomIndex1 = getRandom(item.options.length - 1)
        const randomIndex2 = getRandom(item.options[randomIndex1]?.options.length - 1)

        const childName = item.childName

        templateData[key].label = item.options[randomIndex1]?.label
        templateData[key].value = randomIndex1

        templateData[childName].label = item.options[randomIndex1]?.options[randomIndex2]?.label
        templateData[childName].value = randomIndex2
      }
      else if (['select'].includes(item.form)) {
        const randomIndex = getRandom(item.options.length - 1)
        templateData[key].label = item.options[randomIndex]?.label
        templateData[key].value = randomIndex
      }
    })

    setTemplateData({...templateData})
  }

  // 前端校验参数
  const validateParams = (p, cb) => {
    let hasError = false;
    Object.keys(templateConfig).forEach(key => {
      if (templateConfig[key].rule.required) {
        if (!p[key]) {
          console.log(key, 'key')
          console.log(templateConfig[key], 'templateConfig[key]')
          console.log(p[key], 'p[key]')
          Taro.showToast({
            title: `请选择${templateConfig[key].label}`,
            icon: 'none'
          })
          hasError = true
        }
      }
    })

    if (hasError) return 
    cb()
  }

  // 绘制穿越蓝图
  const onRedirect = async () => {
    console.log(templateData, 'templateData')
    Taro.setStorage({key: 'pageState', data: templateData})

    const openid = Taro.getStorageSync('identityInfo')?.openid
    const obj = {}
    Object.keys(templateData).forEach(key => {
      obj[key] = templateData[key].label
    })
    const params = {
      ...obj,
      uid: openid || '123456'
    }

    validateParams(params, async () => {
      await validateOutlineParams(params)

      domReport({
        button_name: '绘制穿越蓝图',
        ...obj,
      })

      return Taro.navigateTo({
        url: `/pages/outline/index?${transParams(params)}`,
      })
    })
  }

  // 双列选择器左列change事件
  const onColumnChange = (detail, key, config) => {
    if (detail.column === 0) {
      templateData[key].value = detail.value
      setTemplateData({
        ...templateData
      })
    }
  }

  // 埋点上报
  const domReport = (d) => {
    const use_id = Taro.getStorageSync('identityInfo')?.openid
    const info = Taro.getSystemInfoSync()
    report({
      ...d,
      event: 'Click',
      use_id: use_id,
      client: info.system,
    })
  }

  // 初始化templateData
  const initTemplateData = (data) => {
    const obj = {}
    Object.keys(data).forEach(key => {
      const item = data[key]
      switch (item.form) {
        case 'input':{
          obj[key] = {
            label: '',
            value: ''
          }
          break
        }
        case 'select': {
          obj[key] = {
            label: '',
            value: 0
          }
          break
        }
        case 'multiselect': {
          const {name, childName} = item;
          obj[name] = {
            label: '',
            value: 0
          }
          obj[childName] = {
            label: '',
            value: 0
          }
          break
        }
      }
    })
    setTemplateData(obj)
  }

  useLoad(() => {
    Taro.showLoading({
      title: '加载中',
    })
    getCross().then(d => { // 获取动态表单数据
      const {data} = d
      setTemplateConfig(data)
      initTemplateData(data)
    }).finally(() => {
      Taro.hideLoading()
    })

    if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
      getUserIdentity()
      const d = Taro.getSystemInfoSync()
      console.log(d, 'ddd')
    }
  })

  // useDidHide(() => {
  //   console.log('useDidHide')
  //   // Taro.removeStorage({key: 'pageState'})
  //   const use_id = Taro.getStorageSync('identityInfo')?.openid
  //   const info = Taro.getSystemInfoSync()
  //   const obj = {}
  //   Object.keys(templateData).forEach(key => {
  //     obj[key] = templateData[key].label
  //   })
  //   report({
  //     ...obj,
  //     event: 'Exit',
  //     use_id: use_id,
  //     client: info.system,
  //     page_name: '剧本设置页',
  //   })
  // })

  useEffect(() => {
    if (router.params?.back && router.params?.type !== 'share') { // 非分享页回来内容回显
      const state = Taro.getStorageSync('pageState')
      if (state) {
        // setState(state)
        setTemplateData(state)
        if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
          Taro.removeStorage({key: 'pageState'})
        }
      }
    }
  }, [])

  // 渲染动态表单子项，TODO: 优化,后续封装到@/components/render-item组件中
  const renderItem = (key, config) => {
    if (config.form === 'select') {
      const range = config.options.map(item => item.label)
      return (
        <>
          <Text className={`${prefix}-p`}>
            {config.label}
          </Text>
          <View
            className={`${prefix}-${key} ${prefix}-auto-select`}
          >
            <Picker
              mode="selector"
              value={templateData[key]?.value}
              range={range}
              onChange={e => onConfirm(e.detail, key, config)}
            >
              <AtList title='' name={config.name || ''}>
                <AtListItem
                  title={
                    templateData[key]?.label
                      ? ''
                      : config.placeholder
                    }
                  extraText={templateData[key]?.label}
                />
              </AtList>
            </Picker>
          </View>
        </>
      )
    }
    if (config.form === "multiselect") {
      const childIndex = templateData[key]?.value || 0
      const range = config.options[0]?.options
        && [
          config.options.map(item => item.label),
          (
            config.options[childIndex]?.options.map(item => item.label)
              || config.options[0]?.options.map(item => item.label)
          )
        ]
      const extraText = templateData[key]?.label
        ? templateData[key]?.label + '-' + templateData[config.childName]?.label
        : ''

      return (
        <>
          <Text className={`${prefix}-p`}>
            {config.label}
          </Text>
          <View className={`${prefix}-${key} ${prefix}-auto-select`}>
            <Picker
              mode="multiSelector"
              value={[
                templateData[key]?.value,
                templateData[config.childName]?.value
              ]}
              range={range}
              onChange={e => onConfirm(e.detail, key, config)}
              onColumnChange={e => onColumnChange(e.detail, key, config)}
            >
              <AtList title='' name={config.name || ''}>
                <AtListItem
                  title={
                    templateData[key]?.label
                      ? ''
                      : config.placeholder
                    }
                  extraText={extraText}
                />
              </AtList>
            </Picker>
          </View>
        </>
      )
    }

    if (config.form === "input") {
      return (
        <>
          <Text className={`${prefix}-p`}>
            {config.label}
          </Text>
          <View className={`${prefix}-${key} ${prefix}-auto-select`}>
            <AtInput
              name={key}
              type='text'
              value={templateData[key]?.value || ''}
              onChange={e => onConfirm(e.detail, key, config)}
            />
          </View>
        </>
      )
    }
  }

  // 渲染动态表单
  const renderTpl = () => {
    return Object.keys(templateConfig).sort((a, b) => templateConfig[a].order - templateConfig[b].order).map(key => {
      if (templateConfig[key]) {
        return renderItem(key, templateConfig[key])
      }
      return ''
    })
  }

  return (
    <View className={prefix}>
      <View className={`${prefix}-box`}>
        {renderTpl()}
      </View>

      <View className={`${prefix}-fab`}>
        <AtButton onClick={onFabClick}>
          随机匹配
        </AtButton>
      </View>

      <View className={`${prefix}-button`}>
        <AtButton
          type='primary'
          onClick={onRedirect}
        >
          绘制穿越蓝图
        </AtButton>
      </View>
    </View>
  )

  // return (
  //   <View className={prefix}>
  //     <View className={`${prefix}-box`}>
  //       <Text className={`${prefix}-p`}>
  //         时空行者
  //       </Text>
  //       <View className={`${prefix}-select`}>
  //         <View className={`${prefix}-book`}>
  //           <Picker
  //             mode='multiSelector'
  //             value={state.book.value}
  //             range={[
  //               bookOptions.map(item => item.label),
  //               charactersOptions.map(item => item.label)
  //             ]}
  //             onChange={e => onConfirm(e.detail, 'book')}
  //             onColumnChange={e => onColumnChange(e)}
  //           >
  //             <AtList title='书名A' name='book'>
  //               <AtListItem title={state.book.label ? '' : '请选择穿越的作品'} extraText={state.book.label} />
  //             </AtList>
  //           </Picker>
  //         </View>

  //         <View className={`${prefix}-character`}>
  //           <Picker
  //             value={state.character.value}
  //             mode='multiSelector'
  //             range={[
  //               bookOptions.map(item => item.label),
  //               charactersOptions.map(item => item.label)
  //             ]}
  //             onChange={e => onConfirm(e.detail, 'character')}
  //             onColumnChange={onColumnChange}
  //           >
  //             <AtList title='书名A' name='character'>
  //               <AtListItem title={state.character.label ? '' : '人物'} extraText={state.character.label} />
  //             </AtList>
  //           </Picker>
  //         </View>
  //       </View>

  //       <Text className={`${prefix}-p`}>
  //         时空之门
  //       </Text>
  //       <View className={`${prefix}-world`}>
  //         <Picker
  //           mode='selector'
  //           value={state.world.value}
  //           range={cross.map(item => item.label)}
  //           onChange={e => onConfirm(e.detail, 'world')}
  //         >
  //           <AtList title='书名A' name='book'>
  //             <AtListItem title={state.world.label ? '' : '请选择你想去的世界'} extraText={state.world.label} />
  //           </AtList>
  //         </Picker>
  //       </View>

  //       <Text className={`${prefix}-p`}>
  //         时空轨迹
  //       </Text>
  //       <View className={`${prefix}-type`}>
  //         <Picker
  //           mode='selector'
  //           value={state.type.value}
  //           range={typeOptions.map(item => item.label)}
  //           onChange={e => onConfirm(e.detail, 'type')}
  //         >
  //           <AtList title='书名A' name='book'>
  //             <AtListItem title={state.type.label ? '' : '你想来一场怎样的冒险'} extraText={state.type.label} />
  //           </AtList>
  //         </Picker>
  //       </View>
  //     </View>
  //   </View>
  // )
}
