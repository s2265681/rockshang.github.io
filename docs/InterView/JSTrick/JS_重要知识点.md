
#  JS重要知识点

参考：
[来自原形与原型链的拷问](https://mp.weixin.qq.com/s/DrRpDzh6TcGcmJ6H_mSqzg)
[一文吃透所有JS原型相关知识点](https://mp.weixin.qq.com/s/5C-F3s1hvwPQCpWLlbTQBQ)


## 1、 原型与原型链

### 原型与构造函数的关系

![原型](https://mmbiz.qpic.cn/mmbiz_png/v735W8ZTLWkdq6dsibyI1ianFE0iaCVmiaIicrB4Oljhz07Lvb9Gfv1iaadCZtdWz3fsSBdYpVte44gSvSySV2Ik62gw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)



每个构造函数都有一个原型对象并通过constructor指向这个构造函数。

通过构造函数new的实例对象有隐式的__ proto __ 指向原型对象 



### 原型链与继承

根据上图中思考

当原型对象指向另一个类型的实例对象呢？

会发生以下的事情

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200310200147376.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDE2MDM4NQ==,size_16,color_FFFFFF,t_70))

 

js中一切即对象，会通过层层隐式查询，查询到Object这个对象的原型上面，并继承上面的属性方法

图中由`__proto__`属性组成的链子，就是原型链，原型链的终点就是**「null」**。



```

```







![](https://mmbiz.qpic.cn/mmbiz_png/v735W8ZTLWkdq6dsibyI1ianFE0iaCVmiaIicvLibRuxIzGNtVCPiaUC2OhhWPzS0SpCQG2madMJKBT6reulr4asEUvnA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

