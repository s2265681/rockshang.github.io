# 7、Object 的扩展

- <a href="#one"> 1、属性简洁表示</a>
- <a href="#two"> 2、Array.from()</a>
- <a href="#three">3、Array.of()</a>
- <a href="#four"> 4、数组实例的copeWithin()</a>
- <a href="#five"> 5、数组实例的find()和findIndex()</a>
- <a href="#six"> 6、数组实例的 fill()</a>
- <a href="#seven"> 7、数组实例的 includes()</a>
- <a href="#eight"> 8、数组实例的 flat()、flatMap()</a>



---

#### <a name="one">一、扩展运算符</a>

**1. 含义**

扩展运算符--好比rest参数的逆运算，讲一个数组转为用逗号分隔的参数序列

```js
console.log(...[1,2,3])
// 1 2 3
```

主要用于函数调用

```js
var arg = [1,2,3]
f(1,2,...arg,56)
```

🌰一：简化求出数组的最大最小值

```js
// ES5
Math.max.apply(null,[14,3,77])

// ES6
Math.max(...[14,3,77])

// 等同于
Math.max(14, 3, 77);
```

🌰二：因为push不能push数组ES5中使用apply变通写法

```js
// ES5
var arr1 = [1,2,3]
var arr2 = [4,5,6]
Array.prototype.push.apply(arr1,arr2);

// ES6
arr1.push(...arr2)
```



**2.应用**

- 复制数组

  ```js
// ES5中变通的方式
const a1 = [1,2];
const a2 = a1.concat();
a2[0] = 2;
a1 // [1,2]

// ES6
const a2 = [...a1];
// 或者
const [...a2] = a1;
  ```

- 合并数组（浅拷贝）

```js
// ES5 
arr1.concat(arr2)

//ES6
[...arr1,...arr2]
```

- 与解构赋值结合

```js
// ES5
const [first,...rest] = [1,2,3,4,5,6]
first // 1
rest  // [2,3,4,5,6]
```



- 字符串

```
[...'hi']  // ['h','i']
```



- 将Iterator接口的对象转为真正的数组

 ```js
let nodeList = document.querySelectorAll('div')
let array = [...nodeList]
 ```



- Map和Set结构,Generator函数

   凡具有Iterator接口的对象，都可以使用扩展运算符，如Map结构

```js
let map = new Map([
   [1,'one'],
   [2,'two'],
   [3,'three']
])
let arr = [...map.keys()]  // [1,2,3]
let arr = [...map.values()]  // ['one','two','three']
```

Generator函数运行后，也会返回一个遍历器对象，因此也可以使用

```js
const go = function*(){
  yield 1;
  yield 2;
  yield 3;
};
[...go()] // [1,2,3]
```






#### <a name ="two">二、Array.from()</a>

`Array from`方法将两类对象转化为真正的数组：类似数组的对象和可遍历的对象（包括Map和Set）

```js
let arrayLike = {
  '0':'a',
  '1':'b',
  length:2
}
// ES5的写法
var arr1 = [].slice.call(arrayLike) // ['a','b']

// ES6的写法
var arr2 = Array.from(arrayLike)   // ['a','b']
```

第二个参数，类似map对数据进行处理放回返回的数组

```js
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);

Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]
```



#### <a name ="three">三、Array.of()</a>

用于将一组值，转化为数组,弥补Array() 因为参数个数不同造成的行为差异

```js
Array(2)   // [empty x 2]
Array(1,2) // [1,2]

Array.of(3,4,5,6)  // [3,4,5,6]
Array.of(1)   // [1]
```

实现方式

```js
Array.prototype.of = function (){
   return [].slice.call(arguments);
}
```



#### <a name ="four">四、数组实例的 copyWithin() </a>

`copyWithin()` 将制定位置的成员复制覆盖到其他位置的值

```js
Array.prototype.copyWithin(target,start = 0,end = this.length)
```

-target(必需)：从该位置开始替换，负值为倒数

-start(可选)：该位置开始读取数据

-end(可选)：到该位置停止读取，默认时数组长度

实现该方法

```js
[].copyWithin.call(new Int32Array([1,2,3,4,5]),0,3,4);
// Int32Array [4,2,3,4,5]
```

```js
[1,2,3,4,5].copyWithin(0,1,2) // [2,2,3,4,5]
[1,2,3,4,5].copyWithin(1,5)   // [1, 2, 3, 4, 5]
```



#### <a name ="five">五、数组实例的 find()和findIndex() </a>

`find()` 用来找出第一个符合条件的数组成员(未找到返回undefined)，第一个参数是一个回调函数, 第二个参数是绑定回调函数的`this`对象

```js
[1,2,-3,2].find(n=>n>0)
// 1
[1,2,-3,2].find(n=>n<0) 
// -3
```

回调函数可以接受三个参数，当前值，当前位置，原数组。

```js
[1,2,3,10].find(function(value,index,arr){
  return value > 9
})
```

`findIndex`和find用法类似，返回符合条件的数组成员的位置，不符合条件的话，返回-1

```js
[1,2,-3,2].findIndex(n=>n<0)
// 2
```

第二个参数是绑定回调函数的`this`对象

```js
let person1 = {name:'John',age:20}
let person2 = {name:'LiMing',age:41}
[1,2,12,17,22,35].find(function(v){
  return  v>this.age
},person1)  //  22
[1,2,12,17,22,35,45].find(function(v){
  return v>this.age
},person2)  //  45
```



#### <a name ="six">六、数组实例的 fill() </a>

`fill`方法使用给定植，填充一个数组。第一个参数是要填充的内容，第二个参数开始位置，第三个是结束位置。默认全部填充

```js
['a','b','c'].fill(6)     // [6,6,6]
['a','b','c'].fill(6,1,2) // ['a',6,'c']
```

如果填充的类型是对象，被复制的是同一个内存地址的对象，而不是深拷贝对象。

```js
let arr = new Array(3).fill({name:'Mile'});
arr[0].name = "Ben";
arr // [{name:'Ben'},{name:'Ben'},{name:'Ben'}]
```



#### <a name ="seven">七、数组实例的 includes() </a>

`Array.porototype.includes`方法返回一个布尔值，相比字符串的includes方法新增

```js
[1,2,3].includes(2)   // true
[NaN].includes(NaN)   // true
```

代替`indexOf` 使用

indexOf的不足

1、不够语义化

2、不能检查NaN  [NaN].indexOf(NaN)   //.  -1

Array.prototype.includes实现的方式

```js
const contains = (()=>{
    Array.prototype.includes ? (arr,value) => arr.includes(value)
    :
    (arr,value) => arr.some(el=>el === value)
})();

```



####  <a name ="eight">八、数组实例的 flat() , flatMap() </a>

`flat()` 用于数组拍平，多维数组变成一维数组，返回新数组，不影响原数据, 参数默认为1 拉平的是嵌套一层的数组  ,Infinity 多少层都可以拉伸，如果原数组有空位，`flat()`方法会跳过空位。

```js
[1,2,[3,4]].flat();
// [1,2,3,4]

[1,2,[3,4,[5,6]]].flat(2);
// [1,2,3,4,5,6]
```

`flatMap()` 是遍历，再flat() , 只能拍平一次

```js
[1,2,3].flatMap(x=>[x,x*2])
// 相当于[[1,1],[2,4],[3,9]].flat()
// 结果为 [1,1,2,4,3,9]
```



---

2020-3-11