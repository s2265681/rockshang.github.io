# CSS 面试题

---

代码仓库于/code/经典 CSS/

## 1、实现一个盒子水平垂直居中（5 种）

- 第一种方式 绝对定位+margin 拉回 , 缺点： 里面盒子宽高要知道

```css
.container {
  position: relative;
}
.info {
  width: 300px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -150px;
  margin-top: -150px;
}
```

- 第二种方式 绝对定位+ transform:translate 拉回 优点：里面盒子可未知宽高

```css
.container {
  position: relative;
}
.info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
```

- 第三种方式 父元素设置弹性盒子 flex 布局 设置 justcontent 和 item-aline 缺点：低版本浏览器兼容问题，优点：里面盒子可未知宽高

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.info {
}
```

- 第四种方式父元素设置 display:table-cell，子元素设置 margin：0 auto；布局--缺点：父元素和子元素都需要知道宽度，不常用

```css
.container {
  display: table-cell;
  width: 1000px;
  vertical-align: middle;
}
.info {
  width: 300px;
  margin: 0 auto;
}
```

- 第五种方式-css 新特性：父元素 display:box; box-align 和 box-pack 各个浏览器支持不同，需要加内核前缀 已经越来越多支持-webkit-box

```css
.container {
  display: -webkit-box;
  /* 垂直居中 */
  -webkit-box-align: center;
  /* 水平居中 */
  -webkit-box-pack: center;
}

.info {
}
```

## 2、实现一个左图右文的布局（左固定，右伸缩）(8 种)

- 第一种方式，左右两侧都左浮动+calc 计算宽度的方法（width:cale(100% - 200px)）

```css
.box {
}

.left {
  float: left;
  width: 200px;
}

.right {
  float: left;
  width: calc(100% - 200px);
}
```

- 第二种方式，左侧浮动，右侧设置 bfc 清楚浮动（overflow:auto）

```css
.box {
}

.left {
  float: left;
  width: 200px;
}

.right {
  overflow: auto;
}
```

- 第三种方式, 使用左侧浮动+右侧 margin-left 空出

```css
.box {
}

.left {
  float: left;
  width: 200px;
}

.right {
  margin-left: 200px;
}
```

- 第四种方式，左边定位+右边 margin-left 空出

```css
.box {
}

.left {
  position: fixed;
  width: 200px;
}

.right {
  margin-left: 200px;
}
```

- 第五种方式，左边绝对定位+右边绝对定位

```css
.box {
  position: relative;
}

.left {
  position: absolute;
  width: 200px;
}

.right {
  position: absolute;
  top: 0;
  left: 200px;
}
```

- 第六种方式，flex 布局， 左侧设置 flex:0 1 200px; 右侧设置 flex:1 或 flex:1 1 0%;

```css
.box {
  display: flex;
}

.left {
  flex: 0, 1, 200px;
}

.right {
  flex: 1, 1, 0%;
}
```

- 第七种方式, 使用 display:-webkit-box

```css
.box {
  display: -webkit-box;
}

.left {
}

.right {
}
```

- 第八种方式, 使用 display:table， 左右两侧设置 display: table-cell;

```css
.box {
  display: table;
}

.left {
  display: table-cell;
  width: 200px;
}

.right {
  display: table-cell;
}
```

## 3、实现一个扇形（三角型）

```html
<div class="fan fanAnimote"></div>
```

```css
.box {
  display: table;
}

.left {
  display: table-cell;
  width: 200px;
}

.right {
  display: table-cell;
}

/* 再加个动画 */
.fanAnimote {
  /* 旋转 */
  transform: rotate(30deg);
  position: relative;
  animation: mymove infinite 5s alternate;
}

@keyframes mymove {
  from {
    top: 100px;
    left: 100px;
  }
  to {
    top: 500px;
    left: 200px;
  }
}
```

## 4、手写一个正方体，简单实现一下 360 度旋转？

```css
.box {
  transform-style: preserve-3d;
  transform: rotate3d(1, 1, 0, -30deg);
  margin: 500px;
  animation: boxAnimation 5s infinite alternate;
}

@keyframes boxAnimation {
  from {
    transform: rotateX(0deg) rotateY(0deg);
  }
  to {
    transform: rotateX(360deg) rotateY(360deg);
  }
}

.box div {
  width: 200px;
  height: 200px;
  position: absolute;
}
/* 前 */
.box div:first-child {
  transform: translateZ(100px);
  background-color: rgba(255, 0, 0, 0.2);
}

/* 后 */
.box div:nth-child(2) {
  transform: translateZ(-100px);
  background-color: rgba(255, 123, 0, 0.2);
}
/* 左 */
.box div:nth-child(3) {
  transform: translateX(-100px) rotateY(90deg);
  background-color: rgba(255, 0, 122, 0.2);
}
/* 右 */
.box div:nth-child(4) {
  transform: translateX(100px) rotateY(-90deg);
  background-color: rgba(0, 0, 111, 0.2);
}
/* 上 */
.box div:nth-child(5) {
  transform: translateY(-100px) rotateX(-90deg);
  background-color: rgba(0, 120, 0, 0.2);
}
/* 下 */
.box div:nth-child(6) {
  transform: translateY(100px) rotateX(90deg);
  background-color: rgba(25, 10, 30, 0.2);
}
```

```html
<div class="box">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
```

## 5、点击 input，边框变色，点击 input 之外的地方去掉样式。

- /code/经典 css/5.input 边框变色问题

```html
<input type="text" />
```

```css
input {
  background: none;
  outline: none;
  border: #999 solid 1px;
  width: 250px;
  height: 30px;
  margin: 100px;
}

/* 选中时 */
.chooseInput {
  background: none;
  outline: none;
  animation: inp 1s ease forwards;
}

@keyframes inp {
  0% {
    border-color: antiquewhite;
  }
  100% {
    border-color: orange;
  }
}
```

```js
var inps = document.getElementsByTagName("input")[0];

inps.onclick = function() {
  this.classList.add("chooseInput");
};

document.addEventListener(
  "click",
  function() {
    inps.classList.remove("chooseInput");
  },
  true
);
```
