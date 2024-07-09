import withWeapp, { cacheOptions } from '@tarojs/with-weapp'
import { Block, View, Button } from '@tarojs/components'
import React from 'react'
import Taro from '@tarojs/taro'
import { request, wx_request } from '../../utils/request.js'
import { objToQueryString, genReportUrl } from '../../utils/util.js'
import './index.scss'
cacheOptions.setOptionsToCache({
  data: {
    sendMessageTitle: '立即添加',
    sendMessageImg:
      'https://fe-res.go.sohu.com/website-building/miniprogram/add-guide.png',
    queryStrInfo: '',
  },
  onLoad: function (query) {
    console.log('queryInfo', query)
    // 将页面参数设置到 data 中，用于进入客服会话窗口时，传递 session-from 参数
    const queryStr = objToQueryString(query)
    console.log('onLoad queryStr', queryStr)
    this.setData({
      queryStrInfo: `pages/consult/index${queryStr}`,
    })

    // 将页面参数 query 存储起来，用于点击上报工具函数中获取和上报动态参数
    Taro.setStorageSync('queryInfo', query)

    // 获取用户唯一标识 openid、unionid
    this.getUserIdentity()
  },
  getUserIdentity() {
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

              // 小程序激活时上报，确保动态参数成功获取后再触发上报
              wx_request({
                url: genReportUrl('/count/lp', 7),
                method: 'GET',
                fail: (res) => {
                  console.log('小程序激活时上报fail', res)
                },
              })
            },
          })
        } else {
          console.log('登录失败', res.errMsg)
        }
      },
    })
  },
  handleTap() {
    // 点击跳转客服会话窗口按钮时上报
    wx_request({
      url: genReportUrl('/count/lp', 8),
      method: 'GET',
      fail: (res) => {
        console.log('点击跳转客服会话窗口按钮时上报', res)
      },
    })
  },
})
@withWeapp(cacheOptions.getOptionsFromCache())
class _C extends React.Component {
  render() {
    const { sendMessageTitle, sendMessageImg, queryStrInfo } = this.data
    return (
      <View className="add-fans">
        <Button
          openType="contact"
          showMessageCard="true"
          sendMessagePath
          sendMessageTitle={sendMessageTitle}
          sendMessageImg={sendMessageImg}
          sessionFrom={queryStrInfo}
          onClick={this.handleTap}
          className="add-btn"
        >
          {sendMessageTitle}
        </Button>
      </View>
    )
  }
}
export default _C
