# 6、Function 的扩展

- <a href="#one"> 1、函数参数的默认值</a>
- <a href="#two"> 2、rest 参数</a>
- <a href="#three"> 3、严格模式</a>
- <a href="#four"> 4、name 属性</a>
- <a href="#five"> 5、箭头函数</a>

---

#### <a name="one">一、函数参数的默认值</a>

**1. 基本用法**

ES6 之前不能指定函数参数默认值，只能使用变通的方式

```js
function log(x, y) {
  y = y || "Word";
  console.log(x, y);
}
log("Hello"); // Hello World
log("Hello", "China"); // Hello China
log("Hello", ""); // Hello World
```

当第三个参数传空字符串时，仍然改为了默认值，所以为避免还需要判断是否赋值了

```js
function log(x, y) {
  if (typeof y === "undefined") {
    y = y || "Word";
  }
  console.log(x, y);
}
```

现在 ES6 支持直接在参数上面赋默认值，并且时默认声明，在函数体内不能用 let 或 const 再次声明。并且注意用参数默认值时，不能有同名参数，否则报错，如果参数默认值是表达式，每次都要重新计算表达式

```js
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}

foo(); // 100

x = 100;
foo(); // 101
```

**2. 作用域**

设置参数默认值后，函数声明进行初始化的时候，参数会形成单独的作用域，初始化结束后，作用域就会消失。

```js
var x = 1;
function f(x, y = x) {
  console.log(y);
}

f(2); //2
```

参数 x 指向了第一个 x，形成了单独的作用域，所以指向了参数 x 而不是全局 x，所以输出 2，如果没有参数传入，x 为 undefined，输出 undefined。

```js
let x = 1;
function f(y = x) {
  let x = 2;
  console.log(y);
}
f(); // 1
```

以上参数 y=x 形成了单独作用域，在这个作用域中，变量 x 本身没有定义，所以指向外层的全局变量 x。函数调用时，函数体内的局部变量 x 影响不到默认值 x，如果全局 x 不存在，则会报错

```javascript
var x = 1;
function foo(x = x) {
  // 实际执行的是let x =x 暂时性死区，会报x未定义
  // ...
}
foo(); // ReferenceError: x is not defined
```

#### <a name ="two">二、rest 参数</a>

ES6 中引入了 rest 参数（形式为...变量名），用于获取函数的多余参数，就不用使用 arguments 对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

```js
function add(...values) {
  let sum = 0;
  for (var val of values) {
    sum += val;
  }
  return sum;
}

add(2, 5, 3); // 10
```

使用 rest 参数代替 arguments 变量的例子。

```js
// arguments变量的写法
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}

// const sortNumbers = (...numbers) => numbers.sort();
```

因为 arguments 对象不是数组，而是一个类似数组的对象。所以为了使用数组的方法，必须使用 Array.prototype.slice.call 先讲其转为数组。rest 参数是一个真正的数组，可以直接使用数组的方法。

注意：

- rest 参数后面不能再跟参数
- 函数 length 属性，不包括 rest 参数

```js
(function(a, ...b) {}.length); // 1
```

#### <a name ="three">三、严格模式</a>

ES5 开始函数内部可以设为严格模式。

```js
function doSomething(a, b) {
  "use strict";
  // code
}
```

ES2016 开始，规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显示设定为严格模式，否则报错，原因是函数先执行函数参数再执行函数体，然后才能知道参数是否按严格模式执行。

```js
function doSomething(a, b = a) {
  // 报错
  "use strict";
}
function doSomething({ a, b }) {
  // 报错
  "use strict";
}
function doSomething(...a) {
  // 报错
  "use strict";
}
```

解决方式

- 设定全局性的严格模式

- 第二种是函数包在无参数的立即执行函数里面。

#### <a name ="four">四、name 属性</a>

函数 name 属性，返回该函数的函数名

```js
function foo(){}
foo.name. // 'foo'
```

ES5 和 ES6 的区别

```js
var f = function() {};
// ES5
f.name; // ""
// ES6
f.nsme; // 'f'
```

#### <a name ="four">五、箭头函数</a>

箭头函数不会在函数体内重新定义 `this` 的值，这使得在回调中的行为更容易预测，并且避免了 `this` 在回调中潜存的 `bug`

ES6 允许使用箭头定义函数(=>)

```js
var f = v => v;
// 等同于
var f = function(v) {
  return v;
};
```

箭头函数的大括号会被解释为代码块，如果箭头函数直接返回一个对象，必须在对象外面加括号。

```js
var f = id => ({ id: id, name: "Temp" });
```

箭头函数可以与变量解构结合使用。

```js
var f = ({ first, last }) => first + " " + last;
// 等同于
function full(person) {
  return person.first + " " + person.last;
}
```

箭头函数使得表达更加简洁

```js
const isEven = n => n % 2 === 0;
const square = n => n * n;
```

简化回调函数

```js
// 正常写法
[1，2，3].map(function(x){
    return x*X
})
var result = values.sort(function (a,b){
   return a-b
})
// 箭头函数
[1,2,3].map(x=>x*x);
var result = values.sort((a,b)=>a-b);
```

rest 参数与箭头函数结合

```js
const numbers = (...nums) => nums;
numbers(1, 2, 3, 4, 5);
// [1,2,3,4,5]
```

**注意**

（1）函数体内的 this 对象，就是定义时所在的对象，而不是运行时所在的对象。this 对象指向是固定的。并不是因为内部绑定了 this，是因为箭头函数根本没有自己的 this，导致内部的 this 是环境

（2）不可以当作构造函数，不能 new 实例

（3）不能用 arguments 对象，可以用 rest 代替

（4）不可以使用 yield 命令，不能用做 Generator 函数

```js
function foo() {
  setTimeout(() => {
    console.log("id", this.id);
  }, 100);
}
var id = 21;
foo.call({ id: 42 });
// id: 42
```

箭头函数可以让`this`指向固定化，这种特性很有利于封装回调函数。下面是一个例子，DOM 事件的回调函数封装在一个对象里面。

```js
var handler = {
  id: "123456",
  init: function() {
    document.addEventListener(
      "click",
      event => this.doSomething(event.type),
      false
    );
  },
  doSomething: function(type) {
    console.log("Handling" + type + "for" + this.id);
  }
};
```

this 指向的固定化，并不是箭头函数内部绑定 this 机制，而是箭头函数根本没有自己的 this,导致内部的 this 就是外部代码块的 this，所以箭头函数没有 this，不能作为构造函数。

```js
// ES6
function foo() {
  setTimeout(() => {
    console.log("id", this.id);
  }, 100);
}

// ES5
function foo() {
  var _this = this;
  setTimeout(function() {
    console.log("id:", _this.id);
  }, 100);
}
```

箭头函数内没有 this，所以在对象方法中使用 this 需要非常小心，箭头函数绑定 this，很大程度解决了这个困扰。

**不适合用箭头函数的三种场景**

- （1）定义对象方法并使用内部 this

```js
const cat = {
  lives: 9,
  jumps: () => {
    this.lives--;
  }
};
```

cat.jumps()方法是一个箭头函数，如果普通函数调用时 this 指向 cat，但是箭头函数不会有预期效果，因为对象不构成单独的作用域，导致 jumps 箭头函数定义时的作用域就是全局作用域。

- （2）需要动态使用 this 时

```js
var button = document.getElementById("press");
button.addEventListener("clice", () => {
  this.classList.toggle("on");
});
```

上面代码运行报错，因为如果普通函数 this 指向的就是点击按钮的对象，但是此时箭头函数里的 this 是全局对象

- （3）函数很复杂，内部大浪读写操作，不单纯为了值时，用普通函数可以提高代码的可读性。
- 为 `性能` 着想，避免在 `render` 中使用大量箭头函数

---

2020.3.9
