<!--
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-08-06 15:08:04
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-09-19 14:24:31
 * @FilePath: /ai-writer-miniprogram/README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# AI 创作小程序

## 简介
AI 创作小程序，基于[Taro](https://docs.taro.zone/en/docs/)框架开发，支持多端发布。
目前包含胡来剧本、生物盲盒、名著怼人、灵感剧场4部分。
| 功能模块       | 对应文件夹路径                            |
|----------------|----------------------------------------|
| 首页          | src/pages/first-page                    |
| 胡来剧本       | src/pages/fox-script                    |
| 生物盲盒       | src/pages/animal-box                    |
| 名著怼人       | src/pages/book-oppose                   |
| 灵感剧场       | src/pages/inspiration-theater           |
| 客服模块       | src/pages/consult                       |


服务器node版本：20.9.0，建议本地开发环境使用此版本

## 1 依赖安装
```bash
npm install --legacy-peer-deps
# npm install --force
```

## 2 h5版本本地运行
```bash
npm run dev:h5
```

## 3 小程序版本本地运行
```bash
npm run dev:weapp
```
在微信开发者工具中打开`/dist/`目录，taro框架会热更新，自动编译

## 4 发布
```bash
npm run build:h5
```
本地生成`/dist`目录

**注意**
目前不支持动态区分环境，上线时需在·/src/utils/config.ts·中注释切换接口环境地址

## 5 分支管理
main分支是基准分支，版本分支请基于main分支创建。
小程序目前分为两个大版本，分别通过main_1.0.0和main_2.0.0维护，后续新加大版本会增加main_3.0.0分支，以此类推。
功能分支请基于对应版本分支创建，命名规则：feat_版本号_功能描述，例如：feat_1.0.0_add-user-login，功能分支开发完成后，请合并到版本分支。
