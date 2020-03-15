

### 企业级开发框架 umi  

 - 开箱即用 内置 react、react-router
 - 类next.js且功能路由约定，支持路由方式
 - 完善的插件体系
 - 高性能，插件支持PWA
 - 支持静态页面导出，适配各种环境，如 中台业务，无限业务，支付宝钱包，云凤蝶等
 - 一键兼容到IE9，基于umi-pligin-polyfils
 - 完善的TypeScript支持
 - 与dva数据流的深入融合，支持duck directory、model的自动加载、code splitting 等




## dva 代替 redux redux-saga
![dva工作流程](https://img-blog.csdnimg.cn/20191023143342297.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDE2MDM4NQ==,size_16,color_FFFFFF,t_70)

原理：(异步) url->Route Component ->dispatch->Action->Effect->Server->Effect->Reducer->State->connect->Route Component 

(同步）url->Route Component ->dispatch->Action->Reducer->State->connect->Route Component

订阅一写操作：Subscription--->dispatch---Action

约定: src 源码
      1、pages页面
      2、components钻
      3、layout布局
      4、model数据
      config 配置
      mock 数据模拟
      test测试

Umi的基本使用

npm int 
npm install umi -D    // -D就是–save-dev 开发时的框架，放到devDependencies里面 ， 只有开发时用的

npm install antd -S    // -D就是–save 开发时的框架，放到dependencies 里面 ，运行打包时用的

## umi
- yarn global add umi # or npm install -g umi

npm init
npm install umi -D  

umi g page insex 




