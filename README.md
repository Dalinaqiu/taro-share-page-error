# AI 创作小程序

## 简介
AI 创作小程序，基于[Taro](https://docs.taro.zone/en/docs/)框架开发，支持多端发布。

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

