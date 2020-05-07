---
 title: express
 date: 2019-05-05
 tags:
  - express
  - mongoose
 categories:
  - node.js
---

### express 安装

```bash
npm install express --save
```

### 下载安装 mongodb

> 下载连接： [MongoDB Download Center \| MongoDB](https://www.mongodb.com/download-center/community)

### 安装 mongoose

```bash
npm i mongoose'
```

### 安装 mongoose gui

> 下载连接：[NoSQLBooster - The Smartest GUI Admin Tool for MongoDB](https://nosqlbooster.com/downloads)

### 安装 nodemon

> 文件更改之后nodemon 会自动重启应用

```bash

npm install -g nodemon

```

-  配置文件
   + Nodemon 默认会监听当前目录下（也就是执行 nodemon 命令所在的目录）的所有文件，不过有些情况下，虽然项目文件发生了改动，但是不需要 Nodemon 重启应用，那如何让文件不被 Nodemon 监听呢？不需要监听的文件，可以通过设置 Nodemon 的配置文件排除掉，新建文件 server/nodemon.json，添加代码：

```bash
  {
    "ignore": [
         "config.default.js"
      ]
  }
```  

 - 手动重启
    + 有时候可能 Nodemon 还在运行的时候，需要手动重启它，在这种情况下不需要关闭正在运行的 Nodemon 进程然后再重启 Nodemon，只要在 Nodemon 命令运行的终端 窗口中输入 rs 两个字符，然后再按下回车键，就能重启 Nodemon 了

```bash
   rs
```

### mongoose 连接数据库

```bash
mongoose.connect("mongodb://localhost:27017/express-auth",{
    useNewUrlParser: true,
    useCreateIndex:true
})
```

> 如果数据库不存在mongoose会自动创建

### mongoose 定义模型

> schema 是mongoose 里会用到一种数据模式，可以理解为表结构；没个schema会映射到一个mongodb的一个collection，它不具备操作数据库的能力！
+ 允许的schemaTypes
   - String
   - Number
   - Date
   - Buffer
   - Boolean
   - Mixed
   - OblectId
   - Array  
+ 创建一个model

```bash
 const User = mongoose.model('User',new mongoose.Schema({
 }))
```

### 使用express

+ 引入express 并 创建实例

```bash
const express = require('express')
const app = express()
```

+ 注册路由，转换为json格式

```bash
app.use(express.json())
//get 方式
app.get('/',async(req,res)=>{

})
//post 方法
app.post('/',async(req,res)=>{

})
适应RESTful Api风格
```
