# 1、Webpack-01

## 一、什么是**webpack**

webpack is a module bundler.(模块打包⼯工具)

- 官⽅方⽹网站:https://webpack.js.org/

- 中⽂文⽹网站:https://www.webpackjs.com/

**测试:启动 webpack 打包**

```js
// es moudule 模块引⼊
// commonJs 模块引⼊入
import add from "./a"; //需要使⽤用es moudule导出
import minux from "./b";////需要使⽤用es moudule导出

npx webpack index.js //打包命令 使⽤用webpack处理理index.js这个⽂文件
```

总结:webpack 是⼀一个模块打包⼯工具，可以识别出引⼊入模块的语法 ，早起的 webpack 只是个 js 模块的 打包⼯工具，现在可以是 css，png，vue 的模块打包⼯工具

## 二、**安装**

- 环境:nodeJs https://nodejs.org/en/

版本参考官⽹网发布的最新版本，可以提升 webpack 的打包速度

- 全局 不不推荐

```js
npm install webpack webpack-cli -g//webpack-cli 可以帮助我们在命令⾏行行⾥里里使⽤用npx ,webpack等相关指令
webpack -v
npm uninstall webpack webpack-cli -g
```

- 局部安装 项⽬目内安装

```js
  npm install webpack webpack-cli --save-dev //-D
  webpack -v //command not found 默认在全局环境中查找
  npx webpack -v// npx帮助我们在项⽬目中的node_modules⾥里里查找webpack
```

- 安装指定版本

```js
  npm info webpack//查看webpack的历史发布信息
  npm install webpack@x.xx webpack-cli -D
```

**webpack 配置⽂文件**

当我们使⽤用 npx webpack index.js 时，表示的是使⽤用 webpack 处理理打包，名为 index.js 的⼊入⼝口模块。默认放在当前⽬目录下的 dist ⽬目录，打包后的模块名称是 main.js，当然我们也可以修改 webpack 有默认的配置⽂文件，叫 webpack.config.js，我们可以对这个⽂件进⾏修改，进⾏个性化配置

- 默认的配置⽂文件:webpack.config.js

```js
   npx webpack //执⾏行行命令后，webpack会找到默认的配置⽂文件，并使⽤用执⾏行行
```

- 不不使⽤用默认的配置⽂文件: webpackconfig.js

```js
  npx webpack --config webpackconfig.js //指定webpack使⽤用webpackconfig.js⽂文件来作为 配置⽂文件并执⾏行行
```

- 修改 package.json scripts 字段:有过 vue react 开发经验的同学 习惯使⽤用 npm run 来启动，我们也可以修改下

```js
  "scripts":{
     "bundle":"webpack"//这个地⽅方不不要添加npx ,因为npm run执⾏行行的命令，会优先使⽤项目工程里的包，效果和npx非常类似
  }
  npm run bundle
```

**项⽬目结构优化**

```js
dist; //打包后的资源⽬目录
node_modules; //第三⽅方模块
src; //源代码
css;
images;
index.js;
package.json;
webpack.config.js;
```

## 三、Webpack 的核⼼概念

**entry:**

指定打包入⼝⽂件

```js
 entry:{
   main: './src/index.js'
 }
 =====
 entry:"./src/index.js"
```

[多入口配置](https://www.jianshu.com/p/c915685b5c88)

```js
  webpack
  entry: {
        bundle1: './main1.js',
        bundle2: './main2.js'
    }
  html
  <script src="bundle1.js"></script>
  <script src="bundle2.js"></script>
```


**output:**

打包后的⽂文件位置

```js
 output: {
         publicPath:"xxx",
         filename: "bundle.js",
         // 必须是绝对路路径
         path: path.resolve(__dirname, "dist")
        },
```

**loader**

webpack 是模块打包⼯工具，⽽而模块不不仅仅是 js，还可以是 css，图⽚片或者其他格式 但是 webpack 默认只知道如何处理理 js 模块，那么其他格式的模块处理理，和处理理⽅方式就需要 loader 了了

```js
module: {
  rules: [
    {
      test: /\.xxx$/,
      use: {
        loader: "xxx-load"
      }
    }
  ];
}
```

当 webpack 处理理到不不认识的模块时，需要在 webpack 中的 module 处进⾏行行配置，当检测到是什什么格式的 模块，使⽤用什什么 loader 来处理理。

- loader: file-loader:处理理静态资源模块
  loader: file-loader 原理理是把打包⼊入⼝口中识别出的资源模块，移动到输出⽬目录，并且返回⼀一个地址名称

所以我们什什么时候⽤用 file-loader 呢? 场景:就是当我们需要模块，仅仅是从源代码挪移到打包⽬目录，就可以使⽤用 file-loader 来处理理，

txt，svg，csv，excel，图⽚片资源啦等等

```js
npm install file-loader -D
```

案例:

```js
module: {
    rules: [
        {
         test: /\.(png|jpe?g|gif)$/, //use使⽤用⼀一个loader可以⽤用对象，字符串串，两个loader需要⽤用数组 use: {
         loader: "file-loader",
         // options额外的配置，⽐比如资源名称 options: {
         // placeholder 占位符 [name]⽼老老资源模块的名称
         // [ext]⽼老老资源模块的后缀
         // https://webpack.js.org/loaders/file-loader#placeholders name: "[name]_[hash].[ext]",
         //打包后的存放位置
         outputPath: "images/"
        }
       }
      }
     ]
    }
```

- url-loader 可以处理理 file-loader 所有的事情，但是遇到 jpg 格式的模块，会把该图⽚片转换成 base64 格式字符串，并打包到 js 里。对⼩体积的图⽚片⽐较合适，大图片不合适。

```js
npm install url-loader -D
```

案例;

```js
 module: {
    rules: [
      {
         test: /\.(png|jpe?g|gif)$/,
         use: {
           loader: "url-loader",
           options: {
           name: "[name]_[hash].[ext]", outputPath: "images/", //⼩小于2048，才转换成base64 limit: 2048
     }
   }
  }
 ]
},
```

样式处理:
Css-loader 分析 css 模块之间的关系，并合成⼀一个 css

Style-loader 会把 css-loader ⽣生成的内容，以 style 挂载到⻚页⾯面的 heade 部分

```js
npm install style-loader css-loader -D
```

```
 {
     test: /\.css$/,
     use: ["style-loader", "css-loader"]
 }
```

sass 样式处理理
sass-load 把 sass 语法转换成 css ，依赖 node-sass 模块

```
 npm install sass-loader node-sass -D
```

案例例: loader 有顺序，从右到左，从下到上

```
 {
     test: /\.scss$/,
     use: ["style-loader", "css-loader", "sass-loader"]
 }
```

样式⾃自动添加前缀:

Postcss-loader

```
 npm i -D postcss-loader
```

webpack.config.js

```
 {
   test: /\.css$/,
   use: ["style-loader", "css-loader", "postcss-loader"]
},
```

新建 postcss.config.js 安装 autoprefixer

```js
//npm i autoprefixer -D
module.exports = {
  plugins: [require("autoprefixer")]
};
```

**Plugins**

plugin 可以在 webpack 运行到某个阶段的时候，帮你做⼀些事情，类似于⽣命周期的概念

**HtmlWebpackPlugin**

htmlwebpackplugin 会在打包结束后，⾃自动⽣生成⼀\个 html ⽂文件，并把打包生成的 js 模块引⼊到该 html 中。

```js
new HtmlWebpackPlugin({
        template:'./src/app.html',  // 使用自己的html
        title:'这里定义title',
        filename:"index.html"
    }),
```

```js
  npm install --save-dev html-webpack-plugin
```

**clean-webpack-plugin**

Clean-webpack-plugin 会在每次打包前先清空上一次打包后的产物

```js
  npm install --save-dev clean-webpack-plugin
```

```js
new CleanWebpackPlugin();
```

**处理理js模块HMR**

```js
// 抽离css
// npm i 处理理js模块HMR -D
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

{
  test: /\.css$/,
  use:[MiniCssExtractPlugin.loader,"css-loader"]   // 使用外链css 就不用加style.css了
}

{
  new  MiniCssExtractPlugin({
    filename:"[name].css"
  })
}
```

**sourceMap**

源代码与打包后的代码的映射关系,能快速帮我们定位问题，定位到源代码

在 dev 模式中，默认开启，关闭的话 可以在配置⽂件里

```
  devtool:"none"
```

devtool 的介绍:https://webpack.js.org/configuration/devtool#devtool

eval:速度最快
cheap:较快，不不⽤用管列列的报错
Module:第三⽅方模块

开发环境推荐:

```js
devtool:"cheap-module-eval-source-map"
线上环境可以不开启:如果要看到⼀一些错误信息，推荐;
devtool:"cheap-module-source-map"
```

**WebpackDevServer**

提升开发效率的利利器器

每次改完代码都需要重新打包⼀一次，打开浏览器器，刷新⼀一次，

很麻烦 我们可以安装使⽤用 webpackdevserver 来改善这块的体验

启动服务后，会发现 dist ⽬目录没有了了，这是因为 devServer 把打包后的模块不不会放在 dist ⽬目录下，⽽而是放 到内存中，从⽽而提升速度

```js
  npm install webpack-dev-server -D
```

修改下 package.json

```js
 "scripts": {
     "server": "webpack-dev-server"
     },
```

在 webpack.config.js 配置:

```js
 devServer: {
     contentBase: "./dist",
     open: true,
     port: 8081
     },
```

## 四、跨域

联调期间，前后端分离，直接获取数据会跨域，上线后我们使⽤用 nginx 转发，开发期间，webpack 就可 以搞定这件事

启动⼀一个服务器器，mock ⼀一个接口:

```js
// npm i express -D
// 创建⼀一个server.js 修改scripts "server":"node server.js" //server.js
const express = require("express");
const app = express();
app.get("/api/info", (req, res) => {
  res.json({
    name: "hello",
    age: 5,
    msg: "欢迎"
  });
});
app.listen("9092");
```

项⽬目中安装 axios ⼯工具

```js
//npm i axios -D
//index.js
import axios from "axios";
axios.get("http://localhost:9092/api/info").then(res => {
  console.log(res);
});
// 会有跨域问题
```

修改 webpack.config.js 设置服务器器代理理

```js
 proxy: {
       "/api": {
         target: "http://localhost:9092"
       }
      }
```

修改 index.js

```js
axios.get("/api/info").then(res => {
  console.log(res);
});
```

## 五、Hot Module Replacement (HMR:**热模块替换**)

启动 hmr

```js
devServer: {
 contentBase: "./dist",
 open: true,
 hot:true, //即便便HMR不不⽣生效，浏览器器也不不⾃自动刷新，就开启hotOnly          hotOnly:true
},
```

配置⽂文件头部引⼊入 webpack

```js
//const path = require("path");
//const HtmlWebpackPlugin = require("html-webpack-plugin");
//const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
```

在插件配置处添加:

```js
 plugins: [
     new CleanWebpackPlugin(),
     new HtmlWebpackPlugin({
       template: "src/index.html"
     }),
     new webpack.HotModuleReplacementPlugin()
   ],
```

案例:

```js
 //index.js
 import "./css/index.css";
 var btn = document.createElement("button"); btn.innerHTML = "新增"; document.body.appendChild(btn);
  btn.onclick = function() {
   var div = document.createElement("div");
   console.log("1");
   div.innerHTML = "item";
   document.body.appendChild(div);
   };

//index.css
 div:nth-of-type(odd) {
   background: yellow;
   }
```

**处理 js 模块 HMR**

需要使⽤用 module.hot.accept 来观察模块更新 从⽽更新

案例:

```js
//counter.js
function counter() {
  var div = document.createElement("div");
  div.setAttribute("id", "counter");
  div.innerHTML = 1;
  div.onclick = function() {
    div.innerHTML = parseInt(div.innerHTML, 10) + 1;
  };
  document.body.appendChild(div);
}
export default counter;
//number.js
function number() {
  var div = document.createElement("div");
  div.setAttribute("id", "number");
  div.innerHTML = 13000;
  document.body.appendChild(div);
}
export default number;
//index.js
import counter from "./counter";
import number from "./number";
counter();
number();
if (module.hot) {
  module.hot.accept("./b", function() {
    document.body.removeChild(document.getElementById("number"));
    number();
  });
}
```

## 六、Babel 处理 ES6

官方网站:https://babeljs.io/
中文网站:https://babeljs.cn/

```js
npm i babel-loader @babel/core @babel/preset-env -D

// npm install --save @babel/polyfill
//babel-loader是webpack 与 babel的通信桥梁，不会做把es6转成es5的工作，这部分⼯作需要⽤ 到@babel/preset-env来做

//@babel/preset-env⾥包含了es6转es5的转换规则
```

```js
//index.js
const arr = [new Promise(() => {}), new Promise(() => {})];
arr.map(item => {
  console.log(item);
});
```

通过上⾯的⼏步 还不够，Promise 等⼀些还有转换过来，这时候需要借助@babel/polyfill，把 es 的新特 性都装进来，来弥补低版本浏览器中缺失的特性

**@babel/polyfill**

```js
npm install --save @babel/ployfill
```

Webpack.config.js

```
 {
     test: /\.js$/,
     exclude: /node_modules/,
     loader: "babel-loader",
     options: {
         presets: ["@babel/preset-env"]
     }
  }
```

```js
//index.js 顶部
import "@babel/polyfill";
```

会发现打包的体积⼤了很多，这是因为 polyfill 默认会把所有特性注⼊入进来，假如我想我⽤用到的 es6+，才会注入，没⽤到的不注入，从⽽减少打包的体积，可不可以呢

当然可以 修改 Webpack.config.js

```js
options: {
  presets: [
  [
    "@babel/preset-env",
     {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1"
      },
     useBuiltIns: "usage"//按需注⼊入 }
    ]
  ]
}
```

当我们开发的是组件库，⼯工具库这些场景的时候，polyfill 就不不适合了了，因为 polyfill 是注⼊入到全局变量量， window 下的，会污染全局环境，所以推荐闭包⽅方式:@babel/plugin-transform-runtime

**@babel/plugin-transform-runtime**

```js
npm install --save-dev @babel/plugin-transform-runtime
npm install --save @babel/runtime

```

怎么使⽤用?

先注释掉 index.js ⾥里里的 polyfill

```js
//import "@babel/polyfill";
const arr = [new Promise(() => {}), new Promise(() => {})];
arr.map(item => {
  console.log(item);
});
```

修改配置⽂文件:注释掉之前的 presets，添加 plugins

```js
options: {
// //   presets: [
//     [
//       "@babel/preset-env",
//       {
//         targets:{
//                edge: "17",
//                firefox:"60",
//                chrome:"67",
//                safari:"11.1"
//           },
//           useBuiltIns:"usage"
//       }
//     ]
//   ]
"plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": 2,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
        }
     ]
   ]
}
```

扩展:
babelrc ⽂文件:

新建.babelrc ⽂文件，把 options 部分移⼊入到该⽂文件中，就可以了

```js
//.babelrc
{
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": 2,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
        }
    ]
  ]
}
//webpack.config.js
{
  test: /\.js$/,
  exclude: /node_modules/,
  loader: "babel-loader"
}}
```

## 七、配置 React 打包环境

安装

```js
npm install react react-dom --save
```

编写 react 代码:

```js
//index.js
import "@babel/polyfill";
import React, { Component } from "react";
import ReactDom from "react-dom";
class App extends Component {
  render() {
    return <div>hello world</div>;
  }
}
ReactDom.render(<App />, document.getElementById("app"));
```

安装 babel 与 react 转换的插件:

```js
npm install --save-dev @babel/preset-react
```

在 babelrc ⽂文件⾥里里添加:

```js
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
          },
       "useBuiltIns": "usage" //按需注⼊入 }
],
     "@babel/preset-react"
    ]
  }
```



## 八、tree Shaking ##

####  webpack2.x开始支持 tree shaking概念，顾名思义，"摇树"，只支持ES module的引入方式!!!!, ####

```js
//webpack.config.js
optimization: {
    usedExports: true
    }

//package.json
 "sideEffects":false 正常对所有模块进行tree shaking 或者 "sideEffects":    ['*.css','@babel/polyfill']
 
```



开发模式设置后，不会帮助我们把没有引用的代码去掉
案例:

```js
//expo.js
export const add = (a, b) => {
  console.log(a + b);
};
export const minus = (a, b) => {
  console.log(a - b);
};
//index.js
import { add } from "./expo";
add(1, 2);
```



## 九、development vs Production模式区分打包



```js
npm install webpack-merge -D
```



案例

```js
const merge = require("webpack-merge")
const commonConfig =  require("./webpack.common.js")
const devConfig = {
... 
}

module.exports = merge(commonConfig,devConfig)
//package.js
"scripts":{
    "dev":"webpack-dev-server --config ./build/webpack.dev.js",
    "build":"webpack --config ./build/webpack.prod.js"
}

```



案例2 基于环境变量



```js
//外部传入的全局变量 module.exports = (env)=>{
    if(env && env.production){
        return merge(commonConfig,prodConfig)
    }else{
        return merge(commonConfig,devConfig)
} }
//外部传入变量
scripts:" --env.production"
```



## 十、代码分割 code Splitting ##



```js
import _ from "lodash";
console.log(_.join(['a','b','c','****']))

假如我们引入一个第三方的工具库，体积为1mb，而我们的业务逻辑代码也有1mb，那么打包出来的体积大小会在2mb

导致问题:
  体积大，加载时间长
  业务逻辑会变化，第三方工具库不会，所以业务逻辑一变更，第三方工具库也要跟着变。

```

引入代码分割的概念:

```js
//lodash.js

import _ from "lodash";

window._ = _;

//index.js 注释掉lodash引用 
//import _ from "lodash";

console.log(_.join(['a','b','c','****']))
```



```js
//webpack.config.js
entry: {
    lodash: "./lodash.js",
    index: "./index.js"
  },
//指定打包后的资源位置 output: {
    path: path.resolve(__dirname, "./build"),
    filename: "[name].js"
  }
```



其实code Splitting概念 与 webpack并没有直接的关系，只不过webpack中提供了一种更加方便的方法供我们实现 代码分割

基于https://webpack.js.org/plugins/split-chunks-plugin/

```js
optimization: {
     splitChunks: {
     chunks: 'async',//对同步，异步，所有的模块有效
     minSize: 30000,//当模块大于30kb
     maxSize: 0,//对模块进行二次分割时使用，不推荐使用
     minChunks: 1,//打包生成的chunk文件最少有几个chunk引用了这个模块 maxAsyncRequests: 5,//模块请求5次

    maxInitialRequests: 3,//入口文件同步请求3次 automaticNameDelimiter: '~',
     name: true,
     cacheGroups: {

    vendors: {
     test: /[\\/]node_modules[\\/]/, priority: -10//优先级 数字越大，优先级越高

    }, default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
         } 
       }
      } 
    }
```

​         

使用下面配置即可:

```js
optimization:{ 
  //帮我们自动做代码分割 
  splitChunks:{
  chunks:"all",//默认是支持异步，我们使用all }
}
```





## 十一、打包分析 ##

https://github.com/webpack/analyse

官方推荐工具

https://webpack.js.org/guides/code-splitting/#bundle-analysis



## 十二、webpack 官方推荐的编码方式 ##

```js
optimization:{ 
  //帮我们自动做代码分割 
  splitChunks:{
  chunks:"async",
  //默认是支持异步 }
}
```



代码利用率的问题

```js
//index.js
document.addEventListener("click", () => {
  const element = document.createElement("div");
  element.innerHTML = "welcome to webpack4.x";
  document.body.appendChild(element);
});
通过控制台看看代码利用率
```



把里面异步代码抽离出来

```js
//index.js
document.addEventListener("click", () => { import("./click.js").then(({ default: func }) => {
//需要用到 npm install --save-dev @babel/plugin-syntax-dynamic-import
func(); });
});
//click.js
function handleClick() {
  const element = document.createElement("div");
  element.innerHTML = "welcome to webpack4.x";
  document.body.appendChild(element);
}
export default handleClick
```



[项目GitHub](https://github.com/s2265681/Webpack/tree/master/webpack_01)