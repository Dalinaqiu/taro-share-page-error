/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-07-01 09:26:14
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-09-13 14:37:07
 * @FilePath: /ai-writer-miniprogram/src/app.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { PropsWithChildren } from 'react'
import Taro, { useLaunch } from '@tarojs/taro'
import withWeapp, { cacheOptions } from "@tarojs/with-weapp";
import { Block } from "@tarojs/components";
import { login } from './utils'

import "./app.scss";

//app.js
cacheOptions.setOptionsToCache({
  onLaunch: function () {
    // if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP && !Taro.getStorageSync('token')) {
    //   Taro.login({
    //     success(res) {
    //       if (res.code) {
    //         const params = {
    //           code: res.code,
    //         }
    //         // TODO: 登录
    //         login(params).then(d => {
    //           Taro.setStorageSync('token', d.data.token)
    //         })
    //       } else {
    //         console.log('登录失败', res.errMsg)
    //       }
    //     },
    //   })
    // }
  },
  onShow: function () {
    this.checkForUpdate();
    // this.checkSession();
  },
  // 检查session是否过期
  checkSession: function () {
    Taro.checkSession({
      success: function (res) {
        console.log('checkSession success', res)
      },
      fail: function (res) {
        // TODO: 重新登录
        Taro.login({
          success(res) {
            if (res.code) {
              const params = {
                code: res.code,
              }
              // TODO: 登录
              login(params).then(d => {
                Taro.setStorageSync('token', d.data.token)
              })
            } else {
              console.log('登录失败', res.errMsg)
            }
          },
        })
        console.log('checkSession fail', res)
      }
    })
  },
  // 检查是否有新版本
  checkForUpdate: function () {
    if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
      if (Taro.canIUse('getUpdateManager')) {
        // 判断getUpdateManager在当前版本是否可用
        const updateManager = Taro.getUpdateManager();
        updateManager.onCheckForUpdate && updateManager.onCheckForUpdate(function (res) {
          // 请求完新版本信息的回调
          if (res.hasUpdate) {
            // 有新版本
            updateManager.onUpdateReady(function () {
              Taro.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                success: function (res) {
                  if (res.confirm) {
                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                    updateManager.applyUpdate();
                  }
                }
              });
            });
            updateManager.onUpdateFailed(function () {
              // 新版本下载失败
              Taro.showModal({
                title: '已经有新版本了哟~',
                content: '新版本已经上线，请您删除当前小程序，重新搜索打开哟~'
              });
            });
          }
        });
      } else {
        Taro.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        });
      }
    }
  }
});
@withWeapp(cacheOptions.getOptionsFromCache(), true)
class App extends React.Component {

  render() {
    return this.props.children;
  }
}
export default App;
// function App({ children }: PropsWithChildren<any>) {

//   useLaunch(() => {
//     console.log('App launched.')
//   })

//   // children 是将要会渲染的页面
//   return children
// }

// export default App
