---
title: vue开发奇技淫招
date: 2020-4-9
tags:
  - vue
categories:
  - 前端
---

## 路由参数解耦

一般组件内使用路由参数，大多数人是这样

```js
export default {
  methods: {
    getDataId() {
      return this.$route.params.id;
    }
  }
};
```

在组件中使用$route 会使与之对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。

正确的做法是通过 props 解耦

``` js {{6}}
const router = new VueRouter({
  routes: [
    {
      path: '/detail/:id', 
      component: Detail,
      prop: true
    }
  ]
});
```

将 prop 设置为 true 后，组件内可通过 prop 接收到 params 参数

```js
export default {
  prop: ['id'],
  methods: {
    getDetailId() {
      return this.id;
    }
  }
};
```

另外可以通过函数模式返回 props

```js
const router = new VueRouter({
  routes: [
    {
      path: '/detail/:id',
      component: Detail,
      props: router => ({
        id: route.query.id
      })
    }
  ]
});
```

## 函数式组件
