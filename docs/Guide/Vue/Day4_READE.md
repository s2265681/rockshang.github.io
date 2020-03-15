### vue项目实战1
    1. 路由守卫
    2. 登录状态保存
    3. 接口mock
    4. 令牌的原理：bearer token Authorization: Bewaer <token>
    5. 跨域和请求代理

**->cube-ui**

- 适合的 ui 库 （移动端 cube-ui pc element-ui）
- 扩展性
- 登录页面 检查点
- http 拦截器 深入理解令牌机制
- 注销
- 安装自定义字体 npm install less less-loader --save-dev

## 选择一个合适的 ui 库

![市面上的ui库](https://img-blog.csdnimg.cn/20191111114902881.png)

- VUX: https://vux.li/ 一个凑合的 Vue.js 移动端 UI 组件库

- Mint UI 基于 Vue.js 的移动端组件库

- 推荐 Cube-ui 滴滴 https://didi.github.io/cube-ui/#/zh-CN/docs/quick-start
- https://didi.github.io/cube-ui/#/zh-CN

- 推荐 vant 有赞 https://youzan.github.io/vant/#/zh-CN/intro

##

## 基于 vue，cube-ui 的移动端框架

```
vue create cube-ui
cd cube-ui
vue add router
vue add vuex
vue add cube-ui
npm run serve

```

## 扩展性

任何 UI 库都不能完全满足开发需求，需要自己定制化开发

## 登录页面

vue add router
vue add vuex

## 路由守卫

router.beforEach()
to.meta.auth 去控制

## 接口的 mock

- 在开发服务器中配一个 before(app){...}

```
 devServer:{
     before(app) {
         // 模拟后台服务器 express 写法
         app.get("/api/login", function(req, res) {
           const { username, passwd } = req.query;
           // console.log(username,passwd);
           if (username == "kaikeba" && passwd == "123") {
             res.json({ code: 1, token: "jilei" });
           } else {
             res.status(401).json({ code: 0, message: "用户名或者密码错误" });
           }
         });
    }
 }

```

## 令牌验证机制

客户端--->服务器 如果客户端没有令牌，给回一个 401 状态码，
客户端去登录---获得 token，存到 cookie 或者 localStory 里面--->服务端 返回

## http 拦截器

每次请求都携带令牌
创建一个 axios 的拦截器

## 注销 -> app.vue

- 清楚 token 缓存的两种情况

  - 1、 主动注销
  - 2、 token 过期

- 需要做的事情
  - 1、清空缓存
  - 2、重置登录状态

## http 拦截响应

统一处理 401 状态吗，清理 token 跳转 login

## 深入令牌机制

**前端 Bearer Token 规范**

- 概念：描述在 HTTP 访问 OAuth2 保护自愿时如何使用令牌的规范
- 特点：令牌就是身份证明，无需证明令牌的所有权
- 具体规定：在请求头中定义 Authorization:Bear < token >

**json Web Token**

- 概念：令牌具体定义方式
- 规定：令牌由三部分构成“头.载荷.签名”
- 头：包含加密算法、令牌类型等信息
- 载荷：包含用户信息、签发时间和过期时间等信息
- 签名：根据头、载荷及迷药加密得到的哈希串 Hmac Shal 256
- token:加密防篡改
  <!-- https://jwt.io/ -->

## 配置代理服务器

- 修改配置文件，启用开发服务器代理，vue.config.js

```
 devServer:{
     //代理配置
     proxy:{
         "/api":{
             target:"http://127.0.0.1:3000",
             changOrigin:true
         }
     },
     // before(app){...}
 }

```

## 真实数据

- service--> service.js
- node service/service.js

- 跨域： 挡在浏览器中发送请求的适合只要三端（协议名，端口号，域名）不同，浏览器会拒绝你的请求，
- 解决跨域的方案，
  配置代理，
  cors
- 部署到服务器上一般都是 nginx 反向代理 就不存在跨域问题了

promise 简单来讲 做一些异步操作，异步操作的同步化，在.then 中去得到异步请求的结果，.catch 中捕获异常，

Promise.resove("返回成功") Promise.reject("返回失败")
