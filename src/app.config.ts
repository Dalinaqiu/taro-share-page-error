/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-07-01 09:26:14
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-09-19 19:16:17
 * @FilePath: /td-test/src/app.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default defineAppConfig({
  pages: [
    'pages/first-page/index',
    'pages/fox-script/index/index',
    'pages/fox-script/index-old/index',
    'pages/fox-script/outline/index',
    'pages/fox-script/detail/index',
    'pages/old/index',
    'pages/consult/index',
    'pages/animal-box/index/index',
    'pages/animal-box/detail/index',
    'pages/book-oppose/index/index',
    'pages/inspiration-theater/index/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  style: 'v2',
  sitemapLocation: 'sitemap.json',
  lazyCodeLoading: 'requiredComponents',
})
