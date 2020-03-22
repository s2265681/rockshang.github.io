# 3、纯 css 实现轮播图(自动)

<!-- 效果展示 -->
效果展示：
<template>
  <div class="container">
      <div class="wrap">
        <img
          src="http://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1585280100&t=7742945a74ebcce9fa6e646bd9889417"
          alt=""
        />
        <img
          src="http://t8.baidu.com/it/u=2247852322,986532796&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1585280100&t=c20ff8a56019a498659ca44cdfdb0006"
          alt=""
        />
        <img
          src="http://t7.baidu.com/it/u=3204887199,3790688592&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1585280100&t=a16e6d27e5998430add1983fd553673f"
          alt=""
        />
      </div>
    </div>
</template>

实现原理：利用 css3 中 动画和 overflow:hidden 实现

```css
/* 容器大小 */
.container {
  height: 300px;
  width: 800px;
  overflow: hidden;
}

/* .wrap */
.wrap {
  position: relative;
  left: 0px;
  width: 2400px;
  animation: animateImg ease 5s infinite normal;
}

/* 图片大小 */
.wrap img {
  width: 800px;
  float: left;
  height: 300px;
  display: block;
}

/* 动画 */
@keyframes animateImg {
  0% {
    left: 0px;
  }
  20% {
    left: -0px;
  }
  40% {
    left: -800px;
  }
  60% {
    left: -800px;
  }
  80% {
    left: -1600px;
  }
  100% {
    left: -1600px;
  }
}
```

```html
<div class="container">
  <div class="wrap">
    <img
      src="http://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1585280100&t=7742945a74ebcce9fa6e646bd9889417"
      alt=""
    />
    <img
      src="http://t8.baidu.com/it/u=2247852322,986532796&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1585280100&t=c20ff8a56019a498659ca44cdfdb0006"
      alt=""
    />
    <img
      src="http://t7.baidu.com/it/u=3204887199,3790688592&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1585280100&t=a16e6d27e5998430add1983fd553673f"
      alt=""
    />
  </div>
</div>
```


<style scoped>
  /* 容器大小 */
    .container {
      height: 300px;
      width: 800px;
      overflow: hidden;
    }

    /* .wrap */
    .wrap{
      position: relative;
      left: 0px;
      width: 2400px;
      animation: animateImg ease 5s infinite normal;
    }

    /* 图片大小 */
    .wrap img {
      width: 800px;
      float: left;
      height: 300px;
      display: block;
    }
    
    /* 动画 */
    @keyframes animateImg {
      0% {
        left: 0px;
      }
      20% {
        left: -0px;
      }
      40% {
        left: -800px;
      }   
      60% {
        left: -800px;
      }
      80% {
        left: -1600px;
      }
      100% {
        left: -1600px;
      }
    }
</style>
