import withWeapp, { cacheOptions } from '@tarojs/with-weapp'
import { Block, View, Image, Text, Slot } from '@tarojs/components'
import React from 'react'
import Taro from '@tarojs/taro'
import './navigation.scss'
// components/navigation.js
const app = Taro.getApp()
cacheOptions.setOptionsToCache({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    home: {
      type: Boolean,
      value: true,
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    navWithBack: false,
    navWithHome: true,
    isHomePage: false,
  },
  lifetimes: {
    attached: function () {
      this._setData()
    },
  },
  attached: function () {
    this._setData()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    tapBack: function (e) {
      Taro.navigateBack({
        delta: 1,
      })
    },
    tapHome: function (e) {
      Taro.reLaunch({
        url: '/pages/index/index',
      })
    },
    _setData: function () {
      const pages = Taro.getCurrentPages()
      const menuButtonHeight = app.globalData?.systemInfo
        ? app.globalData.systemInfo.menuButtonHeight
        : 32
      const data = {
        menuButtonHeight,
      }
      if (pages[pages.length - 1].route === 'pages/index/index') {
        // 判断是否是首页
        data.isHomePage = true
      } else if (pages.length > 1) {
        data.navWithBack = true
        data.navWithHome = this.properties.home === false ? false : true
      }
      this.setData(data)
    },
  },
})
@withWeapp(cacheOptions.getOptionsFromCache())
class _C extends React.Component {
  render() {
    const { isHomePage } = this.data
    return (
      <View className="custom-navigation-bar">
        <MpNavigationBar
          back={false}
          background="#ffffff"
          renderLeft={
            <Block>
              <View
                className={
                  'custom-nav-left ' +
                  (navWithBack && navWithHome ? 'nav-two-block' : '')
                }
                style={{
                  height: `${menuButtonHeight / 20}rem`,
                }}
              >
                {navWithBack && (
                  <Block>
                    <View
                      className="nav-left-item"
                      onClick={this.tapBack}
                      style={
                        navWithHome ? '' : 'width:' + menuButtonHeight + 'px'
                      }
                    >
                      <Image
                        className="nav-bar-icon"
                        src={require('../../images/icons/wx_back@2x.png')}
                        mode="aspectFit"
                      ></Image>
                    </View>
                  </Block>
                )}
                {navWithBack && navWithHome && (
                  <Block>
                    <Text className="nav-split-line"></Text>
                  </Block>
                )}
                {navWithHome && (
                  <Block>
                    <View
                      className="nav-left-item"
                      onClick={this.tapHome}
                      style={
                        navWithBack ? '' : 'width:' + menuButtonHeight + 'px'
                      }
                    >
                      <Image
                        className="nav-bar-icon"
                        src={require('../../images/icons/wx_home@2x.png')}
                        mode="aspectFit"
                      ></Image>
                    </View>
                  </Block>
                )}
              </View>
            </Block>
          }
          renderCenter={
            <Block>
              <View className="custom-nav-title">
                {title ? (
                  <Block>{title}</Block>
                ) : (
                  <Block>
                    <Slot></Slot>
                  </Block>
                )}
              </View>
            </Block>
          }
        >
          {!isHomePage && <Block></Block>}
        </MpNavigationBar>
      </View>
    )
  }
}
export default _C
