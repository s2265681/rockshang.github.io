# 8、Object 的扩展

- <a href="#one"> 1、属性简洁表示</a>
- <a href="#two"> 2、属性名表达式</a>
- <a href="#three">3、属性的可枚举性和遍历</a>
- <a href="#four"> 4、属性的遍历</a>
- <a href="#five"> 5、super 关键字</a>
- <a href="#six"> 6、对象的扩展运算符...</a>

---

#### <a name="one">一、属性简洁表示</a>

属性简写
```js
const foo ='bar'
const baz = {foo}
baz  // {foo:'bar'}
=>
const baz = {foo:foo}
```
方法简写,注意：方法的简写不能用作构造函数，否则会报错

```js
const o = {
  method(){
    return 'Hello!'
  }
}
=>
const o = {
  method:function(){
    return 'Hello!'
  }
}
```



#### <a name ="two">二、属性名表达式</a>

JavaScript 定义对象的属性，有两种方法。

```js
// 方法一
obj.foo = true;
// 方法二
obj['a'+'bc'] = 123;
```


#### <a name ="three">三、属性的可枚举性和遍历</a>

对象的每个属性都有一个描述对象，用来控制该属性的行为，
Object.getOwnPropertyDescriptor方法可以获取概述行的描述对象。

```js
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,  // 是否可枚举
//    configurable: true
//  }
```
当enumerable为false时，以下操作会忽略
- for...in
- Object.keys()
- JSON.stringify()
- Object.assign()


#### <a name ="four">四、属性的遍历</a>

ES6一共5中方法可以遍历对象的属性，

1. for...in 
循环遍历对象自身和继承的可枚举属性（不含Symbol）

2. Object.keys(obj)
返回一个数组，包括对象自身（不含继承）的键名

3. Object.getOwnPropertyName(obj)
返回一个数组，返回自身所有属性的键名（包括不可枚举属性）

4. Object.getOwnPropertySymbols(obj)
返回一个数组，包含对象自身的所有Symbol属性

5. Reflect.ownKeys(pobj)
返回一个数组，包含自身所有键名（Symbol或字符串，不管是否可枚举）

```js
Reflect.ownKeys({ [Symbol()]:0 ,b:0 ,10:0,2:0,a:0 })

// ['2','10','b','a',Symbol()]
```

#### <a name ="five">五、super 关键字</a>

我们知道，this关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字super，指向当前对象的原型对象。

```js
const proto = {
  foo:"hello"
};

const obj ={
  foo:"world",
  find(){
    return super.foo;
  }
}

Object.setPrototypeOf(obj,proto);
obj.find()  // "hello"
```
上面代码中，对象obj.find()方法之中，通过super.foo引用了原型对象proto的foo属性。


#### <a name ="six">六、对象的扩展运算符... </a>

**解构赋值**

```js
let {x,y,...z} ={x:1,y:2,a:3,b:4}
x // 1
y // 2
z // a:3,b:4
```
**扩展运算符**

```js
  // 通过扩展运算符可以达到克隆的效果
  let z = {a:3,b:4};
  let n = {...z};
  n // {a:3,b:4}  
```

对象的扩展运算符等同于使用Object.assign()方法。

```js
const a = {name:'lisi'}
let aClone = { ...a };
// 等同于
let aClone = Object.assign({}, a);
```
上面例子只是拷贝了对象实例的属性，想克隆一个对象，还拷贝对象原型上的属性，可以用下面的写法。
```js
// 法一
const clone1 = {
  __proto__:Object.getPrototypeOf(obj),
  ...obj
}

// 法二
const clone2 = Object.assign(
  Object.create(Object.getPrototypeOf(obj)),
  obj
)

// 法三
const clone3 = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPrototypeDescriptors(obj)
)
```

**扩展运算符可以用于合并两个对象=Object.asign**
```js
let ab ={...a,...b};
=>
let ab = Object.assign({},a,b)
```

---

2020-3-30