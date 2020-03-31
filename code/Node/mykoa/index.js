const MyKoa = require('./mykoa')
const app = new MyKoa()

app.use((ctx,next)=>{
    ctx.body = "hi"
    console.log('hi')
    next()
})

app.use((ctx,next)=>{
    ctx.body = "hello"
    next()
    console.log('hi2')
})

// 错误处理中间件
app.use(async (ctx, next) => {
    try {
      await next();
    }
    catch (err) {
      // 1. 异常结构化
      // 2. 异常分类
      // 3. 异常级别
      // 4. 异常上报
    }
  })
  
app.listen(7000)