---
title: vue_cli3打包优化
date: 2019-03-30
tags:
  - vue
  - webpack
categories:
  - 前端
---

## 多环境打包

- 根目录新建.env.['name']

> name:production 表示正式环境；development 表示开发环境；test 表示测试环境 2.配置.env.['name']环境变量

    - NODE_ENV = 'name' // 运行环境
    - outputDir //打包后生成的文件目录
    - 以 VUE*APP*['name']，配置 webpack 所认识得环境变量(比如 api 路径等等)

## vue_cli3 打包优化

### 1.将 vue.config.js 中 productionSourceMap 改为 false （避免生成 map 文件，map：未加密的文件，容易定位问题出错位置

### 2.图片压缩

> 项目图片过大，增加项目体积，使用 image-webpack-loader 插件压缩图片

```js
module.exports = {
  productionSourceMap: false,
  chainWebpack: config => {
    // ============压缩图片 start============
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({bypassOnDebug: true})
      .end();
    // ============压缩图片 end============
  }
};
```

### 3.使用 cdn 加速

- config 写入需要的 cdn 链接

```js bash
// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development';
// 本地环境是否需要使用cdn
const locIsNeedCdn = true;
const cdn = {
  // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    axios: 'axios',
    moment: 'moment',
    swiper: 'swiper',
    'element-ui': 'ELEMENT',
    vuex: 'Vuex',
    nprogress: 'NProgress',
    echarts: 'echarts'
  },
  // cdn的css链接
  css: [
    'https://cdn.bootcss.com/font-awesome/5.8.2/css/fontawesome.min.css',
    'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.css',
    'https://cdn.bootcss.com/Swiper/4.4.6/css/swiper.min.css',
    'https://cdn.bootcss.com/element-ui/2.8.2/theme-chalk/index.css'
  ],
  // cdn的js链接
  js: [
    'https://cdn.bootcss.com/echarts/3.3.2/echarts.common.min.js',
    'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
    'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js',
    'https://cdn.bootcss.com/element-ui/2.8.2/index.js',
    'https://cdn.bootcss.com/vue-router/3.0.2/vue-router.min.js',
    'https://cdn.bootcss.com/axios/0.18.0/axios.min.js',
    'https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js',
    'https://cdn.bootcss.com/Swiper/4.4.6/js/swiper.min.js'
  ]
};
module.exports = {
  chainWebpack: config => {
    // ============注入cdn start============
    config.plugin('html').tap(args => {
      // 生产环境或本地需要cdn时，才注入cdn
      if (isProduction || locIsNeedCdn) args[0].cdn = cdn;
      return args;
    });
    // ============注入cdn end============
  },
  configureWebpack: config => {
    // 用cdn方式引入，则构建时要忽略相关资源
    if (isProduction || locIsNeedCdn) config.externals = cdn.externals;
  }
};
```

- 在 public index.html 引入

```js bash
  <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width = device-width,initial-scale=1.0" />
    <link rel="shortcut icon" type="image/x-icon" href="./favicon.ico" />
    <title>xxx</title>
    <!-- 使用CDN的CSS文件 -->
    <% for (var i in htmlWebpackPlugin.options.cdn &&
    htmlWebpackPlugin.options.cdn.css) { %>
    <link href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" rel="stylesheet" />
    <% } %>
    <!-- 使用CDN的CSS文件 -->
  </head>

  <body>
    <div id="app"></div>
    <!-- 使用CDN的JS文件 -->
    <% for (var i in htmlWebpackPlugin.options.cdn &&
    htmlWebpackPlugin.options.cdn.js) { %>
    <script src="<%= htmlWebpackPlugin.options.cdn.js[i] %>"></script>
    <% } %>
  </body>
</html>
```

### 4. 代码压缩（推荐 uglifyjs-webpack-plugin）

- config 注入依赖

```js bash
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
```

- 只在生产环境开启

```js bash
module.exports = {
  configureWebpack: config => {
    if (isProduction) {
      //============代码压缩开始===========
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            //生产环境自动删除console
            compress: {
              // warnings: false, // 若打包错误，则注释这行
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ['console.log', 'console.info']
            }
          },
          sourceMap: false,
          parallel: true
        })
      );
      //============代码压缩结束===========
    }
  }
};
```

### 5. 开启 Gip

- 添加依赖 （compression-webpack-plugin）
- 引入依赖

```bash
  // gzip压缩
  const CompressionWebpackPlugin = require('compression-webpack-plugin')
```

- 只在生产环境开启

```js bash
module.exports = {
  configureWebpack: config => {
    if (isProduction) {
      //============Gzip压缩开始===========
      const productionGzipExtensions = ['html', 'js', 'css'];
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false // 删除原文件
        })
      );
      //============Gzip压缩结束===========
    }
  }
};
```

### 6. 抽离公共代码

```js bash
 config.optimization.splitChunks({
   cacheGroups: {
   vendor: {
        chunks: 'all',
        test: /node_modules/,
        name: 'vendor',
        minChunks: 1,
        maxInitialRequests: 5,
        minSize: 0,
        priority: 100
        },
        common: {
        chunks: 'all',
        test: /[\\/]src[\\/]js[\\/]/,
        name: 'common',
        minChunks: 2,
        maxInitialRequests: 5,
        minSize: 0,
        priority: 60
        },
        styles: {
        name: 'styles',
        test: /\.(sa|sc|c)ss$/,
        chunks: 'all',
        enforce: true
        },
        runtimeChunk: {
        name: 'manifest'
        }
       }
      }
    })
```
