/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-07-01 09:26:14
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-07-05 16:20:33
 * @FilePath: /td-test/src/pages/index/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { View, Picker, Text } from '@tarojs/components'
import { useLoad, useUnload } from '@tarojs/taro'
import React, { useEffect, useState } from 'react';
// import { Button, Cell, Picker, PickerItem, Loading } from 'tdesign-mobile-react';
import { AtForm, AtButton, AtList, AtListItem, AtInput } from 'taro-ui'
import Taro from '@tarojs/taro';
import { getCross, transParams } from '@/utils/index'
import { useRouter, getCurrentInstance } from '@tarojs/taro'

import './index.scss'

interface OptionsType {
  label: string;
  value: string | number;
  name?: string[];
}

const prefix = 'home'

export default function Index() {
  
  const [bookOptions, setBookOptions] = useState<OptionsType[]>([]);
  const [charactersOptions, setCharacterOptions] = useState<OptionsType[]>([]);
  const [cross, setCross] = useState<OptionsType[]>([])
  const [typeOptions, setTypeOptions] = useState<OptionsType[]>([]);

  const [state, setState] = useState({
    book: {
      visible: false,
      value: [],
      label: ''
    },
    character: {
      visible: false,
      value: [],
      label: ''
    },
    world: {
      visible: false,
      value: '',
      label: ''
    },
    type: {
      visible: false,
      value: '',
      label: ''
    },
  })

  const router = useRouter()

  const getPickerLabel = (key, val) => {
    switch (key) {
      case 'book':
      case 'character':
        return [bookOptions[val[0]].label, charactersOptions[val[1]].label]
      case 'world':
        return cross[val].label
      case 'type':
        return typeOptions[val].label
    }
  }

  const onConfirm = (e, key) => {
    const label = getPickerLabel(key, e.value) || ''
    if (['book', 'character'].includes(key)) {
      setState({
        ...state,
        book: {
          ...state.book,
          label: label[0],
          value: e.value
        },
        character: {
          ...state.character,
          label: label[1],
          value: e.value
        }
      })
    }
    else {
      setState({
        ...state,
        [key]: {
          label,
          value: e.detail,
          visible: false
        }
      })
    }
  }

  // 生成一个参数为n的函数，返回0 - n之间的随机数
  const getRandom = n => {
    const random = Math.floor(Math.random() * (n + 1));
    return random;
  }

  const onFabClick = () => {
    const RandomIndex1 = getRandom(bookOptions.length - 1)

    const TempCharacterOptions = bookOptions[RandomIndex1]?.name?.map((item, index) => ({
      label: item,
      value: index
    })) || []

    setCharacterOptions(TempCharacterOptions)
  
    const RandomIndex2 = getRandom(TempCharacterOptions.length - 1)

    const RandomIndex3 = getRandom(cross.length - 1)
    const RandomIndex4 = getRandom(typeOptions.length - 1)

    setState({
      ...state,
      book: {
        ...state.book,
        label: bookOptions[RandomIndex1].label,
        value: [bookOptions[RandomIndex1].value, TempCharacterOptions[RandomIndex2].value]
      },
      character: {
        ...state.character,
        label: TempCharacterOptions[RandomIndex2].label,
        value: [bookOptions[RandomIndex1].value, TempCharacterOptions[RandomIndex2].value]
      },
      world: {
        ...state.world,
        label: cross[RandomIndex3].label,
        value: cross[RandomIndex3].value
      },
      type: {
        ...state.type,
        label: typeOptions[RandomIndex4].label,
        value: typeOptions[RandomIndex4].value
      }
    })
  }

  const validateParams = (p, cb) => {
    if (!p.book) {
      Taro.showToast({
        title: '请选择时空行者',
        icon: 'none'
      })
      return
    }
    if (!p.name) {
      Taro.showToast({
        title: '请选择时空行者',
        icon: 'none'
      })
      return
    }
    if (!p.cross) {
      Taro.showToast({
        title: '请选择时空之门',
        icon: 'none'
      })
      return
    }
    if (!p.style) {
      Taro.showToast({
        title: '请选择时空轨迹',
        icon: 'none'
      })
      return
    }
    cb()
  }

  const onRedirect = async () => {
    Taro.setStorage({key: 'pageState', data: state})
    const params = {
      book: state.book.label,
      name: state.character.label,
      cross: state.world.label,
      style: state.type.label,
      uid: '123456'
    }
    validateParams(params, () => {
      return Taro.navigateTo({
        url: `/pages/outline/index?${transParams(params)}`,
      })
    })
  }

  const onColumnChange = e => {
    const {detail} = e;
    if (
      detail?.column === 0
      && detail?.value >= 0
      && bookOptions[detail.value]
      && bookOptions[detail.value].name
    ) {
      setCharacterOptions(bookOptions[detail.value].name?.map((item, index) => ({
        label: item,
        value: index
      })) || [])

      // onConfirm({value: [detail.value, 0]}, 'book')
      
      setState({
        ...state,
        book: {
          ...state.book,
          value: [detail.value, 0]
        },
        character: {
          ...state.character,
          value: [detail.value, 0]
        }
      })
    }
  }

  useLoad(() => {
    Taro.showLoading({
      title: '加载中',
    })
    getCross().then(d => {
      const {data} = d
      setBookOptions(data.characters.map((item, index) => ({
        ...item,
        label: item.book,
        value: index
      })))
      data.characters.length && setCharacterOptions(data.characters[0].name.map((item, index) => ({
        label: item,
        value: index
      })))
      setTypeOptions(data.style.map((item, index) => ({
        label: item,
        value: index
      })))
      setCross(data.cross.map((item, index) => ({
        label: item,
        value: index
      })))
    }).finally(() => {
      Taro.hideLoading()
    })
  })

  useUnload(() => {
    console.log('useUnload')
    // Taro.removeStorage({key: 'pageState'})
  })

  useEffect(() => {
    if (router.params?.back) {
      const state = Taro.getStorageSync('pageState')
      if (state) {
        setState(state)
        Taro.removeStorage({key: 'pageState'})
      }
    }
  }, [])

  return (
    <View className={prefix}>
      {/* {
        loading
          ? <Loading size="large" theme="spinner" text="加载中..." loading={loading} />
          : (
            <>
              <p>穿越的人物</p>
              <div className={`${prefix}-select`}>
                <div className={`${prefix}-book`}>
                  <Cell
                    arrow
                    title=""
                    note={state.book.label || '选择书'}
                    onClick={() => setVisible('book', true)}
                  />
                  <Picker
                    visible={state.book.visible}
                    defaultValue={state.book.value}
                    value={state.book.value}
                    onConfirm={e => onConfirm(e, 'book')}
                    onCancel={() => setVisible('book', false)}
                  >
                    <PickerItem options={catagoryOptions} />
                    <PickerItem options={bookOptions} />
                  </Picker>
                </div>

                <div className={`${prefix}-character`}>
                  <Cell
                    arrow
                    title=""
                    note={state.character.label || '选择人物'}
                    onClick={() => setVisible('character', true)}
                  />
                  <Picker
                    visible={state.character.visible}
                    defaultValue={state.character.value}
                    value={state.character.value}
                    onConfirm={e => onConfirm(e, 'character')}
                    onCancel={() => setVisible('character', false)}
                  >
                    <PickerItem options={charactersOptions} />
                  </Picker>
                </div>
              </div>
              
              <p>传入的世界</p>
              <div className={`${prefix}-world`}>
                <Cell
                  arrow
                  title=""
                  note={state.world.label || '选择要穿越的世界'}
                  onClick={() => setVisible('world', true)}
                />
                <Picker
                  visible={state.world.visible}
                  defaultValue={state.world.value}
                  value={state.world.value}
                  onConfirm={e => onConfirm(e, 'world')}
                  onCancel={() => setVisible('world', false)}
                >
                  <PickerItem options={bookOptions} />
                </Picker>
              </div>

              <p>穿越画风</p>
              <div className={`${prefix}-type`}>
                <Cell
                  arrow
                  title=""
                  note={state.type.label || '穿越画风'}
                  onClick={() => setVisible('type', true)}
                />
                <Picker
                  visible={state.type.visible}
                  defaultValue={[]}
                  value={state.type.value}
                  onConfirm={e => onConfirm(e, 'type')}
                  onCancel={() => setVisible('type', false)}
                >
                  <PickerItem options={typeOptions} />
                </Picker>
              </div>

              <Button
                className={`${prefix}-fab`}
                onClick={onFabClick}
              >
                随机匹配
              </Button>

              <Button
                className={`${prefix}-button`}
                block
                size="large"
                shape="rectangle"
                onClick={onRedirect}
              >
                开始穿越
              </Button>
            </>
          )
      } */}
      <View className={`${prefix}-box`}>
        <Text className={`${prefix}-p`}>
          时空行者
        </Text>
        <View className={`${prefix}-select`}>
          <View className={`${prefix}-book`}>
            <Picker
              mode='multiSelector'
              value={state.book.value}
              range={[
                bookOptions.map(item => item.label),
                charactersOptions.map(item => item.label)
              ]} 
              onChange={e => onConfirm(e.detail, 'book')}
              onColumnChange={e => onColumnChange(e)}
            >
              <AtList title='书名A' name='book'>
                <AtListItem title={state.book.label ? '' : '请选择穿越的作品'} extraText={state.book.label} />
              </AtList>
            </Picker>
          </View>

          <View className={`${prefix}-character`}>
            <Picker
              value={state.character.value}
              mode='multiSelector'
              range={[
                bookOptions.map(item => item.label),
                charactersOptions.map(item => item.label)
              ]}
              onChange={e => onConfirm(e.detail, 'character')}
              onColumnChange={onColumnChange}
            >
              <AtList title='书名A' name='character'>
                <AtListItem title={state.character.label ? '' : '人物'} extraText={state.character.label} />
              </AtList>
            </Picker>
          </View>
        </View>

        <Text className={`${prefix}-p`}>
          时空之门
        </Text>
        <View className={`${prefix}-world`}>
          <Picker
            mode='selector'
            value={state.world.value}
            range={cross.map(item => item.label)}
            onChange={e => onConfirm(e.detail, 'world')}
          >
            <AtList title='书名A' name='book'>
              <AtListItem title={state.world.label ? '' : '请选择你想去的世界'} extraText={state.world.label} />
            </AtList>
          </Picker>
        </View>

        <Text className={`${prefix}-p`}>
          时空轨迹
        </Text>
        <View className={`${prefix}-type`}>
          <Picker
            mode='selector'
            value={state.type.value}
            range={typeOptions.map(item => item.label)}
            onChange={e => onConfirm(e.detail, 'type')}
          >
            <AtList title='书名A' name='book'>
              <AtListItem title={state.type.label ? '' : '你想来一场怎样的冒险'} extraText={state.type.label} />
            </AtList>
          </Picker>
        </View>
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
}
