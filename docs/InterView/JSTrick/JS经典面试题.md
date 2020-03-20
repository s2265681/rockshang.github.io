# JS 经典面试题

## 1、头条最新--手动实现一个 printf 函数。具备以下功能。

```js
let str = 'My name is ${name}, I am from ${city}',
    info = {
       name: 'AaDerBrane',
       city: 'GungZhou'
    };
    console.log(printf(str, info));
    // My name is AaDerBrane, I am from GuangZhou
    function printf(str, info)
```

思路：利用正则表达式，匹配替换，string.replace() 方法比较简单。

实现：

```js
function printf(str, info) {
  var reg = /\$\{\w+\}/g;
  return str.replace(reg, function(match, key) {
    return info[match.slice(2, -1)];
  });
}
```

## 2、头条最新--手动实现一个防抖和节流。

概念：

- 防抖是高频事件后 n 秒只会执行一次，n 秒内在此触发重新计算时间。常见的是鼠标的移动事件捕捉。

- 节流是在规定时间内只触发一次，再此触发 return

作用：都是为了限制函数的执行频次，优化函数触发频率过高而导致死都跟不上引起延迟，卡顿。

使用场景：

1. 搜索框 input 事件，例如要支持输入实时搜索可以使用节流方案（间隔一段时间就必须查询相关内容），或者实现输入间隔大于某个值（如 500ms），就当做用户输入完成，然后开始搜索，具体使用哪种方案要看业务需求。还有点击按钮调用方法，适合节流。
2. 页面 resize 事件，常见于需要做页面适配的时候。需要根据最终呈现的页面情况进行 dom 渲染（这种情形一般是使用防抖，因为只需要判断最后一次的变化情况），鼠标的滑动。页面滚动条的滚动等。

（1）防抖(debounce)：实现方式，每次触发事件都设置一个延迟调用方法。并且取消之前的演示调用方法。缺点就是如果一直在时间间隔内触发，则调用方法不断的延迟。

```js
function debounce(fn, delay) {
  let timer = null; //借助闭包
  return function() {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, delay); // 简化写法
  };
}
// 然后是旧代码
function showTop() {
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  console.log("滚动条位置：" + scrollTop);
}
window.onscroll = debounce(showTop, 1000); // 为了方便观察效果我们取个大点的间断值，实际使用根据需要来配置
```

（2）节流（throttle）在不断出发滚动事件的情况下，依然可以在固定时间内触发函数响应。

实现原理，设计一种类似阀门一样定期开放的函数。执行一次后，在某个时间内失效，然后过了之后在重新激活。加上状态 valid 表示当前的工作状态

```js
function throttle(fn, deplay) {
  let valid = true;
  return function() {
    if (!valid) {
      // 休息时间 暂不接客
      return false;
    } else {
      // 工作时间，执行函数并且在规定的时间间隔内将状态设置为无效
      setTimeout(() => {
        fn();
        valid = true;
      }, deplay);
    }
  };
}
/* 请注意，节流函数并不止上面这种实现方案,
   例如可以完全不借助setTimeout，可以把状态位换成时间戳，然后利用时间戳差值是否大于指定间隔时间来做判定。
   也可以直接将setTimeout的返回的标记当做判断条件-判断当前定时器是否存在，如果存在表示还在冷却，并且在执行fn之后消除定时器表示激活，原理都一样
    */
// 以下照旧
function showTop() {
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  console.log("滚动条位置：" + scrollTop);
}
window.onscroll = throttle(showTop, 1000);
```

## 3、获取 url 地址栏中的参数

```js
var url = window.location.search.slice(1);
// url = "name=lisi&age=20&school=xiaoxue";
// console.log(url.trim())
// 求参数取出放到对象中
// obj={
//   name:'lisi';
//   age:20;
//   school:'xiaoxue';
// }

// 法一：
var obj = {};
url
  .replace(/\s*/gm, "")
  .split("&")
  .forEach(el => {
    // ['name=lisi','age=20',school='xiaoxue']
    var key = el.split("=")[0];
    var value = el.split("=")[1]; // ['name','lisi']
    obj[key] = value;
  });

// 法二：正则表达式
var obj = {};
url = "name=lisi&age=20&school=xiaoxue";
function getQueryString(name) {
  var reg = eval(`/(^|&)${name}=([^&]*)(&|$)/i`);
  //    var u = reg.exec(url)
  //    console.log(u,'u')
  var r = url.match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
obj["name"] = getQueryString("name");
obj["age"] = getQueryString("age");
obj["school"] = getQueryString("school");
console.log(obj, "mmm");
```

// 法三：正则表达式--简单点版本

```js
function fn(url,name){
  let res = ''
  let reg = new RegExp(`${name}=(\\w+)`,'g')
  // let reg = eval(`\${name}=(\w+)\g`)
  url.replace(reg,(r,r1)=>res=r1)
  return res
}

fn('www.baidu.com?aa=1&bb=2','bb')  // 2

```

## 4、 完成 extname 函数，它会接受一个文件名作为参数，你需要返回它的扩展名。例如，输入 emoji.png，返回 .png。

```js
const extname = filename => {
  /* TODO */
  if (!filename.match(/(\w+)\./)) return "";
  return filename.slice(filename.lastIndexOf("."));
};
```

## 5、 apply、call、bind 方法的区别及实现

区别：apply和call主要是参数不同，apply传数组，call一个一个传, bind和前两个的区别的bind返回一个函数，前两个立即执行。

```js
// ES5 call
Function.prototype.ES5Call = function(context) {
  context = context || arguments[0] || window;
  context.fn = this;
  var arr = [];
  // 注意参数需要从第二个参数开始
  for (var i = 1; i < arguments.length; i++) {
    arr.push("arguments[" + i + "]");
  }
  // eval(context.fn(arguments[1],arguments[2],...)) 执行函数
  var result = eval("context.fn(" + arr.toString() + ")");
  delete context.fn;
  return result;
};

// ES6 call
Function.prototype.ES6Call = function(context = window, ...rest) {
  context.fn = this;
  var result = context.fn(...rest);
  delete context.fn;
  return result;
};
```

```js
// ES5Apply
Function.prototype.ES5Apply = function(context, arr) {
  context = context || arguments[0] || window;
  context.fn = this;
  if (!arr) {
    result = context.fn();
  } else {
    var args = [];
    for (var i = 0; i < arr.length; i++) {
      args.push("arr[" + i + "]");
    }
    result = eval("context.fn(" + args.toString() + ")");
  }
  delete context.fn;
  return result;
};

//ES6Apply
Function.prototype.ES6Apply = function(context = window, arr) {
  context.fn = this;
  var result;
  if (arr) {
    result = context.fn(...arr);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};
```



```js
// MyBind
  Function.prototype.MyBind = function(){
        var context = arguments[0]
        var self = this;
        return function(){
            self.apply(context,arguments)
        }
    }
```
