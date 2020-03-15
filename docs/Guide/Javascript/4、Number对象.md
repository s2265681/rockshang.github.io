# 4、Number对象

---

- <a href="#one"> 1、概述</a>
- <a href="#two"> 2、静态属性</a>
- <a href="#three"> 3、实例方法</a>
- <a href="#four"> 4、自定义方法</a>

---

### <a name="two"> 一、 概述 </a>

`Number`对象是数值对应的包装对象，可以作为构造函数使用，也可以作为工具函数使用。

**1、作为构造函数时，用于生成值为数值的对象。**

```js
var n = new Number(1)
typeod n // 'object'
```

**2、作为工具函数时，可以将任何类型的值转为数值**

```js
Number(true)  // 1
```



### <a name="two"> 二、实例属性</a>

- `Number.POSITIVE_INFINITY`：正的无限，指向`Infinity`。

- `Number.NEGATIVE_INFINITY`：负的无限，指向`-Infinity`。

- `Number.NaN`：表示非数值，指向`NaN`。

- `Number.MIN_VALUE`：表示最小的正数（即最接近0的正数，在64位浮点数体系中为`5e-324`），相应的，最接近0的负数为`-Number.MIN_VALUE`。

- `Number.MAX_SAFE_INTEGER`：表示能够精确表示的最大整数，即`9007199254740991`。

- `Number.MIN_SAFE_INTEGER`：表示能够精确表示的最小整数，即`-9007199254740991`。

  

### <a name="three">三、实例方法</a>

`Number`对象有4个实例方法，都跟将数值转换成指定格式有关。

#### 3.1 Number.prototype.toString()

用来讲一个数值转化成字符串,接受一个参数，表示输入的进制，默认时10进制,整数不加括号会报错，会解析成整数点，也可以写两个点

```js
(10).toString()  // '10'
(10).toString(2) // '1010'
(10).toString(8) // '12'
(10).toString(16)// 'a'

10.toString()  // 报错
10..toString() // 不报错
10.1.toString() // 不报错
10['toString'](2) // '1010'
```

toString方法会将十进制的数转化成其他进制的字符串，想要转回来用parseInt

```js
var a = 10['toString'](2)  // '1001'
parseInt(a,2)  // 10
```



#### 3.2 Number.prototype.toFixed()

`toFixed`方法可以将一个数转为指定位数的小数，由于浮点数的原因，小数5的四舍五入是不确定的。

```js
(10.055).toFixed(2) // 10.05
(10.005).toFixed(2) // 10.01
```



#### 3.3 Number.prototype.toExponential()

`toExponential`方法用于将一个数转为科学计数法形式。

```js
(10).toExponential()  // "1e+1"
(10).toExponential(1) // "1.0e+1"
(10).toExponential(2) // "1.00e+1"
```



#### 3.4 Number.prototype.toPrecision()

`Number.prototype.toPrecision()`方法用于将一个数转为指定位数的有效数字。

```js
(12.34).toPrecision(1) // "1e+1"
(12.34).toPrecision(2) // "12"
(12.34).toPrecision(3) // "12.3"
(12.34).toPrecision(4) // "12.34"
(12.34).toPrecision(5) // "12.340"
```

#### 3.4 Number.prototype.toLocaleString()

`Number.prototype.toLocaleString()`方法接受一个地区码作为参数，返回一个字符串，表示当前数字在该地区的当地书写形式。第二个参数style属性指定输出样式。

```js
(123).toLocaleString('zh-Hans-CN-u-nu-hanidec')
// "一二三"

(123).toLocaleString('zh-Hans-CN', { style: 'percent' })
// "12,300%"

(123).toLocaleString('zh-Hans-CN', { style: 'currency', currency: 'CNY' })
// "￥123.00"

(123).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
// "123,00 €"

(123).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
// "$123.00"
```




### <a name="four">四、自定义方法</a>
与其他对象一样，`Number.prototype`对象上面可以自定义方法，被`Number`的实例继承。

```js
Number.prototype.add = function(x) {
   return this+x
}
Number.prototype.subtract = function(x) {
   return this-x
}
8..add(2)     // 10
8['add'](2)  // 10
var v = 4['add'](3).subtract(1)  // 6
```

```js
var n = 1;
n.x = 1;
n.x // undefined
```





---

2020.3.06