# 1、 算法

- 对数组乱序
 const arr = [1,2,3,4,5,6,7]
 arr.sort(()=>Math.random()-0.5)
 
- 对数组倒序 
 const arr = [1,2,3,4,5,6,7]
 arr.sort((a,b)=>{b-a})

- 对字符串乱序
  const welcome = "Hello";
  const newWel = [...welcome].sort(()=>Math.random-0.5).join();

- 实现一个随机产生颜色的功能 

  Math.random().toString(16).slice(-6)