/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-07-01 09:26:14
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-07-01 14:42:25
 * @FilePath: /td-test/src/pages/index/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { View, Text } from '@tarojs/components'
import { useLoad, useSaveExitState } from '@tarojs/taro'
import React, { useState } from 'react';
import { Button, Cell, Picker, PickerItem, Fab } from 'tdesign-mobile-react';
import { Icon } from 'tdesign-icons-react';
import 'tdesign-mobile-react/es/style/index.css'; // 少量公共样式
import Taro from '@tarojs/taro';
import './index.scss'

const prefix = 'home'

export default function Index() {

  const [catagoryOptions, setCatagoryOptions] = useState([
    {
      label: '文学',
      value: 1
    }, {
      label: '历史',
      value: 2
    }
  ])
  
  const [bookOptions, setBookOptions] = useState([
    {
      label: '战狼',
      value: 1
    }, {
      label: '庆余年',
      value: 2
    }
  ]);
  const [charactersOptions, setCharacterOptions] = useState([
    {
      label: '冷锋',
      value: 1
    }, {
      label: '庆帝',
      value: 2
    }
  ]);
  
  const [typeOptions, setTypeoptions] = useState([
    {
      label: '恐怖',
      value: 1
    }, {
      label: '玄幻',
      value: 2
    },
    {
      label: '奇幻',
      value: 3
    }, {
      label: '武侠',
      value: 4
    }
  ]);

  const [state, setState] = useState({
    book: {
      visible: false,
      value: [bookOptions[0].value],
      label: ''
    },
    character: {
      visible: false,
      value: [charactersOptions[0].value],
      label: ''
    },
    world: {
      visible: false,
      value: [1],
      label: ''
    },
    type: {
      visible: false,
      value: [1],
      label: ''
    },
  })

  const setVisible = (key, val) => {
    setState({
      ...state,
      [key]: {
        visible: val
      }
    })
  }

  const setLabel = (key, val) => {
    setState({
      ...state,
      [key]: {
        label: val
      }
    })
  }

  const getLabel = (arr, val) => arr.find(item => item.value === val).label

  const getPickerLabel = (key, vals) => {
    switch (key) {
      case 'book':
        return getLabel(catagoryOptions, vals[0]) + ',' + getLabel(bookOptions, vals[1])
      case 'character':
        return getLabel(charactersOptions, vals[0])
      case 'world':
        return getLabel(bookOptions, vals[0])
      case 'type':
        return getLabel(typeOptions, vals[0])
    }
  }

  const onConfirm = (e, key) => {
    console.log(e, 'ee')
    const label = getPickerLabel(key, e)
    console.log(label, 'label')
    setState({
      ...state,
      [key]: {
        label,
        value: e,
        visible: false
      }
    })
  }

  useLoad(() => {
    console.log('Page loaded.')
  })

  const onFabClick = () => {
    console.log('fab clicked')
  }

  const onRedirect = () => {
    Taro.navigateTo({
      url: '/pages/create/index',
    })
  }

  return (
    <View className={prefix}>
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

      <Fab
        className={`${prefix}-fab`}
        icon={<>随机匹配</>}
        style={{ right: '16px', bottom: '32px' }}
        onClick={onFabClick}
      />

      <Button
        className={`${prefix}-button`}
        block
        size="large"
        shape="rectangle"
        onClick={onRedirect}
      >
        开始穿越
      </Button>
    </View>
  )
}
