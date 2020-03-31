koa_mini 源码
[使用四十行代码实现一个精简版 koa](https://mp.weixin.qq.com/s/1zw2mBeYPMU-2Nj3FBXB6Q)


![koa](https://mmbiz.qpic.cn/sz_mmbiz_jpg/po6IxVbAMcQ8qEw9VnKiboTwRibv0JTJNsmdExI1ZMrp4cu95HjZMCHbgpm1dGMdyALBp2icicYicGeRYd0ZTPdEM4A/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

三步：
一：Application 理解http server 封装
二：理解koa的上下文
三：深入理解洋葱模型

```js 
// 实现以下效果
const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  console.log('Middleware 1 Start')
  await next()
  console.log('Middleware 1 End')
})

app.use(async (ctx, next) => {
  console.log('Middleware 2 Start')
  await next()
  console.log('Middleware 2 End')

  ctx.body = 'hello, world'
})

app.listen(3000)

// output
// Middleware 1 Start
// Middleware 2 Start
// Middleware 2 End
// Middleware 1 End

```