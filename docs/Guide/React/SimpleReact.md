# 实现一个简单的 React

**1、 什么是虚拟 dom？**
就是具有固定格式的 js 对象

```js
const obj = {
  tag: "div",
  attrs: {
    className: "test"
  },
  children: [
    tag: "p",
    attrs: {
    className: "text"
    },
    tag: "span",
    attrs: {
    className: "txt"
    }
   ]
}
```

**2、 怎么生成虚拟dom对象？**

- 生成抽象语法树（AST）
- 对应的处理
- 输出浏览器可是别的js对象

其中Bable会做以下工作

```js
class App extends React.Component{
    render(){
        return <div>123</div>
    }
}
```
将上面的代码转化成下面的代码

```js
...
_createClass(App,[{
    key:'render',
    value:function render(){
       return React.createElement('div',null,'123')
    }
}])

```

最核心的一段jsx代码, return <div>123</div>被转换成了：return React.createElement("div", null, "123");

我们写的jsx语法，都会转化成React.createElement这种形式

