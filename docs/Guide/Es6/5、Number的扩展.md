# 5、Number的扩展

- <a href="#one"> 1、新增方法</a>
- <a href="#two"> 2、Math 对象的扩展</a>

---

#### <a name="one">一、Number 新增方法</a>

**1. Number.isFinite()**

判断数字是不是有限的 finit，非数值一律 false

```js
Number.isFinite(15); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
```

**2. Number.isNaN() **

判断数字是不是 NaN 类型

`Number.isNaN()`只有对于`NaN`才返回`true`，非`NaN`一律返回`false`。

```js
Number.isFinite("25"); // false

isNaN(NaN); // true
isNaN("NaN"); // true
```

**3. Number.parseInt()、Number.parseFloat()\*\***

ES6 讲全局的 parseInt、parseFloat 移植到了 Number 对象上面，行为完全不变，好处是减少全局性方法，语言逐步模块化

```js
// ES5
parseInt("12.34"); // 12
parseFloat("122.45#"); // 123.45

// ES6
Number.parseInt("12.34"); // 12
Number.parseFloat("122.45#"); // 123.45

Number.parseInt === parseInt; // true
Number.parseFloat === parseFloat; // true
```

**4. Number.isInteger()**

`Number.isInteger()`用来判断一个数值是否为整数。

```js
Number.isInteger(25); // true
Number.isInteger(25.0); // true
Number.isInteger(25.1); // false
```

#### <a name ="two">二、Math 对象的扩展</a>

ES6 在 Math 对象上新增了 17 个与数学相关的方法。所有这些方法都是静态方法，只能在 Math 对象上调用。

**1.Math.trunc()**

`Math.trunc`方法用于去除一个数的小数部分，返回整数部分。

```javascript
Math.trunc(4.1); // 4
Math.trunc(-4.1); // -4
```

```js
Math.trunc =
  Math.trunc ||
  function(x) {
    return x < 0 ? Math.ceil(x) : Math.floor(x);
  };
```

**2.Math.sign()**

`Math.sign`方法用来判断一个数到底是正数(+1)、负数(-1)、还是零(0)。对于非数值，会先将其转换为数值(NAN)

```js
Math.sign(-5); // -1
Math.sign(5); // +1
Math.sign(-0); // -0
Math.sign(NaN); // NaN
```

```js
Math.sign =
  Math.sign ||
  function(x) {
    x = +x; // conver to a number
    if (x === 0 || isNaN(x)) {
      return x;
    }
    return x > 0 ? 1 : -1;
  };
```

**3.Math.cbrt()**

`Math.cbrt`方法用于计算一个数的立方根。

```js
Math.cbrt(-1); // -1
Math.cbrt(0); // 0
```

```js
Math.cbrt =
  Math.cbrt ||
  function(x) {
    var y = Math.pow(Math.abs(x), 1 / 3);
    return x < 0 ? -y : y;
  };
```

---

2020.3.7
