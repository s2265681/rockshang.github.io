# ES

[前端面试必备ES6全方位解读](https://mp.weixin.qq.com/s/5-8KOv210ji5d_Dq_pq6cw)
[]()https://mp.weixin.qq.com/s/17HqvnR4o8Zo1SuWDIzSXQ

- new Set 数组去重
```js
  法一 利用解构赋值
  let [...arr] = new Set([1,2,3,3,3,4,4])
  arr = [1,2,3,4]
  法二 利用Array的方法
  Array.from(new Set([1,2,3,3,3,4,4]))
```
