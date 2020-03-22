
# 2、纯 css 实现轮播图(手动)

<!--效果展示：  -->
效果展示：
<template>
 <div class="container">
      <input type="radio" id="pic1" name="pic" checked />
      <input type="radio" id="pic2" name="pic" />
      <input type="radio" id="pic3" name="pic" />
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
      <div class="arrow left">
        <label for="pic1">左箭头1</label>
        <label for="pic2">左箭头2</label>
        <label for="pic3">左箭头3</label>
      </div>
      <div class="arrow right">
        <label for="pic1">右箭头1</label>
        <label for="pic2">右箭头2</label>
        <label for="pic3">右箭头3</label>
      </div>
    </div>
</template>
实现原理：利用 css3 中 input:checked 和 + ～选择器实现

```css
/* 设置容器大小*/
.container {
  position: relative;
  width: 800px;
  height: 300px;
}
/* 设置input位置 */
.container input {
  position: absolute;
  z-index: 23;
  bottom: 10px;
}
/* 设置input位置 */
#pic1 {
  left: 48%;
}
#pic2 {
  left: 50%;
}
#pic3 {
  left: 52%;
}
/* 设置图片大小，透明度为0 */
.wrap img {
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
}
/* 默认选中第一张，根据选中的input，展示对应的图片 */
#pic1:checked ~ .wrap img:nth-of-type(1),
#pic2:checked ~ .wrap img:nth-of-type(2),
#pic3:checked ~ .wrap img:nth-of-type(3) {
  opacity: 1;
  animation: showImg linear 1s 1 0s normal;
}
/* 设置图片展示出来时候的动画 */
@keyframes showImg {
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
/* 设置箭头的位置大小 */
.arrow {
  position: absolute;
  z-index: 1;
  top: 50%;
  color: #fff;
}
/* 设置箭头的图片的大小，替换图中文字即可 */
/* .arrow img {
  width: 40px;
  height: 40px;
} */
/* 设置左箭头位置 */
.left {
  left: 0;
}
/* 设置右箭头位置 */
.right {
  right: 0;
}

/* 默认隐藏箭头 */
.arrow label {
  display: none;
}

/* 根据选中的input设置需要展示哪个左边箭头 */
#pic1:checked ~ .left label:nth-of-type(3),
#pic2:checked ~ .left label:nth-of-type(1),
#pic3:checked ~ .left label:nth-of-type(2) {
  display: block;
}

/* 根据选中的input设置需要展示哪个右边箭头 */
#pic1:checked ~ .right label:nth-of-type(2),
#pic2:checked ~ .right label:nth-of-type(3),
#pic3:checked ~ .right label:nth-of-type(1) {
  display: block;
}
```

```html
<div class="container">
  <input type="radio" id="pic1" name="pic" checked />
  <input type="radio" id="pic2" name="pic" />
  <input type="radio" id="pic3" name="pic" />
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
  <div class="arrow left">
    <label for="pic1">左箭头1</label>
    <label for="pic2">左箭头2</label>
    <label for="pic3">左箭头3</label>
  </div>
  <div class="arrow right">
    <label for="pic1">右箭头1</label>
    <label for="pic2">右箭头2</label>
    <label for="pic3">右箭头3</label>
  </div>
</div>
```


<style scoped>
   .container {
      position: relative;
      width: 800px;
      height: 300px;
    }
    .container input {
      position: absolute;
      z-index: 23;
      bottom: 10px;
    }

    #pic1 {
      left: 48%;
    }
    #pic2 {
      left: 50%;
    }
    #pic3 {
      left: 52%;
    }

    .wrap img {
      opacity: 0;
      position: absolute;
      width: 100%;
      height: 100%;
    }
    
   
    #pic1:checked ~ .wrap img:nth-of-type(1),
    #pic2:checked ~ .wrap img:nth-of-type(2),
    #pic3:checked ~ .wrap img:nth-of-type(3) {
      opacity: 1;
      animation: showImg linear 1s 1 0s normal;
    }

    @keyframes showImg {
      0% {
        opacity: 0.2;
      }
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 1;
      }
    }

    .arrow {
      position: absolute;
      z-index: 1;
      top: 50%;
      color: #fff;
    }

    .left {
      left: 0;
    }
    .right {
      right: 30px;
    }

    /* 箭头 */
    .arrow label {
      display: none;
    }

    /* 左箭头 */
    #pic1:checked ~ .left label:nth-of-type(3),
    #pic2:checked ~ .left label:nth-of-type(1),
    #pic3:checked ~ .left label:nth-of-type(2) {
      display: block;
      cursor:pointer;
    }

    /* 右箭头 */
    #pic1:checked ~ .right label:nth-of-type(2),
    #pic2:checked ~ .right label:nth-of-type(3),
    #pic3:checked ~ .right label:nth-of-type(1) {
      display: block;
      cursor:pointer;
    }
    
</style>
