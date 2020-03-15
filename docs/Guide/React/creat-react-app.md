### creat-react-app

npx create-react-app + 项目名

学写一次到处运行
jsx js 编译成 js 对象
react 负责逻辑层控制层
react-dom 负责渲染 渲染层

- 组件创建

  函数式 rfc
  function Comp(props){
  return(...)
  }

  组件式、类 rcc
  class Comp extends React.Component{
  render(){
  return(...)
  }
  }

- setState 内部激活更新
  this.setState({}) 异步批量执行，不会立刻拿到结果，改成同步或者通过传入函数获得最新参数
  this.setState((state)=>{})
  state 里面是最新的

- 事件处理

- 生命周期
  React V16.3 之前的生命周期

  14.4 之后
  新增 fiber

![新版的生命周期函数]](https://img-blog.csdnimg.cn/20191009202247333.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDE2MDM4NQ==,size_16,color_FFFFFF,t_70)

创建时： constructor ->static getDerivedStateFromProps -> shouldComponentUpdate -> render -> getSnapshotBeforeUpdate

componentCatch(error,info){
错误捕获
}

复习：

- React 逻辑控制，视图模型的控制 jsx-> React.createElement() 形成虚拟 dom， 维护一组数据，执行 render 函数把数据通过 diff 算法渲染成真正的 dom。

- JSX 表达式{expr} 属性 id={expr} jsx 本身也是表达式

- 组件的描述方式：函数式、组件式

- 条件和循环
  {三元表达式}
  {短路表达式}
  {.map 循环}

## 事件 注意回调函数 this 的指向

< input onChange={this.onChange}>
1、 < input onChange={()=>this.onChange(参数)}>
2、 < input onChange={this.onChange.bind(this， 参数)}>
3、 在 constructor 里面绑定 bind

## 通讯

< Comp title={} submit={this.submit}>

# 组件化

api 很少，组件化管理，工作方式简单：UI=F(state)

npm install antd --save

## antd 按需加载

安装
用 react-app-rewired 取代 react-scripts 用来扩展 webpack 配置，类似于 vue 的 vue.config.js
babel-plugin-import
按需加载见 antd 文档

## 组件设计原则

容器组件 VS 展示组件
设计思路：1、工作和展示分离  2、重用性高  3、更高的可用性  4、更易于测试

## shouldComponentUpdate

CommentList
shouldComponentUpdate 里面优化
或者通过 V15 版本之后新增了 PureComponent 纯组件代替 shouldComponentUpdate 优化，内部对 shouldComponentUpdate 做了处理，进行了浅拷贝(注意不能传深层次数据，不要传对象，或者引用地址不发生变化，就可以规避问题，否则会失效)

## React.memo

CommentList.js
\*\* V16.6 之后版本，新增了 React.memo,是高阶组件浅对比（效率高），让函数式组件也有了 PureComponent 的功能,见 CommentList 组件

## 高阶组件 （扩展组件功能，属性）

- 高阶组件，高阶组件是函数，传入一个组件返回一个新的组件，提高复用率，抽离相同逻辑，在 React 中就有了 HOC（Height-Order Components） 概念，高阶组件是一个函数，但是他返回另一个组件，产生新的组件可以对属性进行包装，也可以重写部分生命周期

## 高阶组件装饰器

Hoc.js
高阶组件可以多次链式调用，但是写法蛋疼，于是 ES7 中出了新的写法，装饰器，安装
npm install --save-dev babel-plugin-transform-decorators-legacy
使用装饰器包裹的组件必须要是类，组件式的

## 扩展组件最好不用继承，用复合组件更好更安全

Composition.js
// 扩展获得函数 Api 值的调用
// 过略数组
// 写一个 RedioGroup 组件
修改和操作 children
React.Children

 ```
    {React.Children.map(props.children,(child)=>{
        // vdom 不可更改，克隆一个新的去改才行
        // child.props.name = props.name;
        // return child;
        return React.cloneElement(child,{name:props.name})
    })}
 ```

1、函数化组件Hook
2、上下文Context

## 函数化组件Hook（钩子）  --> 最新  V16.8新增项
-> HookTest.js

特点：1、不编写class就能享受到class的功能
     2、更简洁 更容易理解
     3、无需更改组件结构，提高复用状态逻辑

升级react 、 react-dom
npm i react react-dom -S

## 副作用钩子 Effect Hook
-> HookTest.js

useEffect就是Effect Hook，给函数增加了副作用的能力，
跟class中componentidMount，componentDidUpdate，componentWillUnmount

  // 副作用钩子会在每次渲染的时候都执行，重新渲染, 第二个是状态依赖，
  是个数组，
  
  写了哪个哪个改变时调用，如[ count ] ,只有count改变时才会调用
  写空[],那么只会执行一次， 任何状态改变都不会调用
  如果不写，哪个状态改变都会执行， 任何状态改变都会调用


## 自定义钩子
-> 自定义的Hook是一个函数，名称用use开头，函数内部可以调用其他的钩子
```
function useAge(){
    const [age,setAge] = useState(0);
    useEffect(()=>{
        setTimeout(() => {
            setAge(20);
      }, 2000);
    })
    return age;
}

```

## 其他Hook useContext、useReducer、useCallback、useMemo

## 组件跨层级通讯 - Context 
--> ContextType.js

  - 上下文提供一种不需要每层设置props就能跨多级传递数据的方式
  Context的相关api
  - React.CreateContent
  - Context.Provider
  - Class.contextType
  - Context.Consumer

## AntdForm.js 创建一个表单组件
--> KForm

## redux
Action->dispatch->store->Reducers(更改状态)->store(数据存储)->state->React Component
纯粹，单向，同步
npm i redux --save
 
原始redux 繁琐

## react-redux
npm i react-redux --save
 

## react-router


## 异步 ->  react 默认只支持同步，实现异步任务比如延迟，网络请求，需要中间件的支持 如 redux-thunk

npm i redux-thunk --save   redux 中间件 dispatch异步操作

npm i redux-logger --save  记录redux 操作日志


## redux-router-4
https://www.reacttrainning.com/react-router
npm i react-router-dom -S
-> ReactSample.js
路由即组件

路由守卫
具有校验路由功能


-- umi 、 redux解决方案dva 、 generator 、 redux-saga(更强大的异步处理方案和react-thunk(较弱))
## 企业级框架  -- umi


## redux-saga
概述：redux-saga使副作用（数据获取、浏览器缓存获取）易于管理、执行、测试和失败处理
npm i --save redux-saga
 

 ## generator 
 function * login(){} * 位置都可以
 生成器函数 他返回一个generator对象 ， 满足可循环可迭代

 ```
  // 定义生成器函数
  function *g(){
    yield 'a';
    yield 'b';
    yield 'c';
    return 'ending'
  }
  // 返回Generator对象
   console.log(g()); // g {<suspended>}
   console.log(g().toString()); // [object Generator]

 ```

## 企业级开发框架 umi  

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
      2、components组件
      3、layout布局
      4、models数据
      config 配置
      mock 数据模拟
      test测试

Umi的基本使用

npm int 
npm install umi -D    // -D就是–save-dev 开发时的框架，放到devDependencies里面 ， 只有开发时用的

npm install antd -S    // -D就是–save 开发时的框架，放到dependencies 里面 ，运行打包时用的


选型：1、按材选择
     2、Ts vue对Ts还是有点蹩脚，react更容易
     3、Angular 对原生js支持更好










