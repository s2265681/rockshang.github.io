var fs = require('fs');
module.exports = {
  title: "RockShang",
  description: "The description of the site.",
  head: [["link", { rel: "icon", href: `/rock.ico` }]],
  base: "/",
  themeConfig: {
    search: true,
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/Guide/" },
      { text: "Projects", link: "/Projects/product.md" },
      { text: "InterView", link: "/InterView/" },
      { text: "Homepage", link: "http://rockshang.cn" },
      { text: "GitHub", link: "https://github.com/s2265681" }
    ],
    sidebar: {
      '/Guide/': getGuideConfig(),
      '/InterView/': getInterViewConfig()
    },
  },
};

//Guide
function getGuideConfig () {
  return [
    {
      title:'Guide',
      collapsable: true,
      path: '/Guide/'
    },
    {
      title:'CSS',
      collapsable: true,
      children:getChildUrl('/Guide/MCSS/') 
    },
    {
      title:'Javascript',
      collapsable: true,
      children:getChildUrl('/Guide/Javascript/') 
    },
    {
      title:'ES6',
      collapsable: true,
      children:getChildUrl('/Guide/Es6/')
    },
    {
      title:'TypeScript',
      collapsable: true,
      children:getChildUrl('/Guide/MTypeScript/')
    },
    {
      title:'Webpack',
      collapsable: true,
      children:getChildUrl('/Guide/MWebpack/')
    },
    {
      title:'Vue',
      collapsable: true,
      children:getChildUrl('/Guide/Vue/')
    },
    {
      title:'React',
      collapsable: true,
      children:getChildUrl('/Guide/React/')
    },
    {
      title:'Node',
      collapsable: true,
      children:getChildUrl('/Guide/Node/')
    },
    {
      title:'Nest',
      collapsable: true,
      children:getChildUrl('/Guide/Nest/')
    },
    {
      title:'PicStudy',
      collapsable: true,
      children:getChildUrl('/Guide/PicStudy/') 
    },
  ]
}

// InterView
function getInterViewConfig (title) {
  return [
    {
      title:'InterView',
      collapsable: true,
      path: '/InterView/'
    },
    {
      title:'HTML|CSS相关',
      collapsable: true,
      children:getChildUrl('/InterView/HTMLCSSTrick/')
    },
    {
      title:'JS|JS进阶相关',
      collapsable: true,
      children:getChildUrl('/InterView/JSTrick/')
    },
    {
      title:'浏览器|性能优化|项目工程化相关',
      collapsable: true,
      children:getChildUrl('/InterView/BrowserWebpack/')
    },
    {
      title:'框架相关',
      collapsable: true,
      children:getChildUrl('/InterView/Frame/')
    },
    {
      title:'构建工具',
      collapsable: true,
      children:getChildUrl('/InterView/_Webpack/')
    },
    {
      title:'算法',
      collapsable: true,
      children:getChildUrl('/InterView/Arithmetic/')
    }
  ]
}


// 遍历children Url
function getChildUrl(fileurl){
  let components = []
  const files = fs.readdirSync('./docs/'+fileurl)
  files.forEach(function (item, index) {
        console.log(item,'item')
        if(item!=='.DS_Store'){;
           components.push(fileurl+item)
        }
  })
 return components
}