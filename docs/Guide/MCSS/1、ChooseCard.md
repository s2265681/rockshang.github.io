
# 1、纯 css 实现选项卡功能

实现原理：利用css3 中input:checked 和 + ～选择器实现

```css
ul li {
  float: left;
  height: 30px;
  width: 100px;
  cursor: pointer;
}

input:checked + li {
  color: #f00;
}

input:checked ~ div {
  visibility: visible !important;
}

#box input {
    visibility: hidden;
}

#box div {
  position: absolute;
  top: 60px;
  visibility: hidden;
}
```

```html
<div>
  <ul id="box">
    <label>
      <input type="radio" name="color" checked value="1" />
      <li>标签一</li>
      <div>我是内容一</div>
    </label>
    <label>
      <input type="radio" name="color" value="2" />
      <li>标签二</li>
      <div>我是内容二</div>
    </label>
    <label>
      <input type="radio" name="color" value="3" />
      <li>标签三</li>
      <div>我是内容三</div>
    </label>
    <label>
      <input type="radio" name="color" value="4" />
      <li>标签四</li>
      <div>我是内容四</div>
    </label>
  </ul>
</div>
```


    /* 三种隐藏显示方式的对比 */
    /*
        display：none;
        1、DOM结构： dom元素消失，不占空间
        2、事件监听：无法监听事件
        3、性能方面：会引发重排，性能差
        4、继承方面：不会被子类继承

        visibility:hidden;
        1、DOM结构： dom元素隐藏不会消失，占空间
        2、事件监听：无法监听事件
        3、性能方面：会引发重绘，性能较高
        4、继承方面：会被子类继承，子元素可以通过visibility:visible显示出来
        
        opacity:0
        1、DOM结构：透明度100%，元素隐藏，占空间
        2、事件监听：可以DOM监听事件
        3、性能方面：提升合成层，不会触发重绘，性能较高
        4、继承方面：会被子类继承，子元素不可以通过opacity:1显示出来
      */

效果展示：

<template>
  <div  id="box">
      <ul >
        <label>
          <input type="radio" name="color" checked value="1"/>
          <li>标签一</li>
          <div>我是内容一</div>
        </label>
        <label>
          <input type="radio" name="color" value="2"/>
          <li>标签二</li>
          <div>我是内容二</div>
        </label>
        <label>
          <input type="radio" name="color" value="3"/>
          <li>标签三</li>
          <div>我是内容三</div>
        </label>
        <label>
          <input type="radio" name="color" value="4"/>
          <li>标签四</li>
          <div>我是内容四</div>
        </label>
      </ul>
    </div>
</template>

<style scoped>
#box ul{
    position:relative;
}
#box ul li {
    float: left;
    height: 30px;
    width: 100px;
    cursor: pointer;
}
input:checked + li {
    color: #f00;
}
input:checked~div {
    visibility:visible !important;
}
#box input{
    display: none;
}
    #box div{
    position: absolute;
    top: 40px;
    visibility: hidden;
} 
</style>



