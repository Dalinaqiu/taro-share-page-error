/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-07-01 09:26:14
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-07-03 16:25:29
 * @FilePath: /td-test/src/pages/index/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { View, Picker, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import React, { useEffect, useState } from 'react';
// import { Button, Cell, Picker, PickerItem, Loading } from 'tdesign-mobile-react';
import { AtForm, AtButton, AtList, AtListItem, AtInput } from 'taro-ui'
import Taro from '@tarojs/taro';
import { getCross, transParams } from '@/utils/index'

import './index.scss'

interface OptionsType {
  label: string;
  value: string | number;
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
          value: e.detail
        },
        character: {
          ...state.character,
          label: label[1],
          value: e.detail
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

  const onFabClick = () => {
    setState({
      ...state,
      book: {
        ...state.book,
        label: bookOptions[0].label,
        value: [bookOptions[0].value, charactersOptions[0].value]
      },
      character: {
        ...state.character,
        label: charactersOptions[0].label,
        value: [bookOptions[0].value, charactersOptions[0].value]
      },
      world: {
        ...state.world,
        label: cross[0].label,
        value: cross[0].value
      },
      type: {
        ...state.type,
        label: typeOptions[0].label,
        value: typeOptions[0].value
      }
    })
  }

  const onRedirect = () => {
    const params = {
      book: state.book.label,
      name: state.character.label,
      cross: state.world.label,
      style: state.type.label,
      uid: '123456'
    }
    Taro.navigateTo({
      url: `/pages/create/index?${transParams(params)}`,
    })
  }

  useLoad(() => {
    getCross().then(d => {
      console.log(d)
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
    })
  })

  // 模拟加载中...
  useEffect(() => {
    Taro.showLoading({
      title: '加载中',
    })
    setTimeout(() => {
      Taro.hideLoading()
    }, 2000);
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
      {/* <View> */}
        <Text className={`${prefix}-p`}>
          穿越的人物
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
            >
              <AtList title='书名A' name='book'>
                <AtListItem title='请选择穿越的人物' extraText={state.book.label} />
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
            >
              <AtList title='书名A' name='character'>
                <AtListItem title='人物' extraText={state.character.label} />
              </AtList>
            </Picker>
          </View>
        </View>

        <Text className={`${prefix}-p`}>
          穿入的世界
        </Text>
        <View className={`${prefix}-world`}>
          <Picker
            mode='selector'
            value={state.world.value}
            range={cross.map(item => item.label)}
            onChange={e => onConfirm(e.detail, 'world')}
          >
            <AtList title='书名A' name='book'>
              <AtListItem title='请选择穿入的世界' extraText={state.world.label} />
            </AtList>
          </Picker>
        </View>

        <Text className={`${prefix}-p`}>
          穿越画风
        </Text>
        <View className={`${prefix}-type`}>
          <Picker
            mode='selector'
            value={state.type.value}
            range={typeOptions.map(item => item.label)}
            onChange={e => onConfirm(e.detail, 'type')}
          >
            <AtList title='书名A' name='book'>
              <AtListItem title='请选择穿越画风' extraText={state.type.label} />
            </AtList>
          </Picker>
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
            开始穿越
          </AtButton>
        </View>
      {/* </View> */}
    </View>
  )
}
