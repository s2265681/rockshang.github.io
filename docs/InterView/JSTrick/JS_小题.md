
# JS 小题

## 1、 让 a===1&&a===2 为true

```js
var val = 1;
Object.defineProperty(window,'a',{
    get(){
        return this.val++
    }
})

 a===1&&a===2&&a===3 // true
 ```

## 2、转成千位符的金钱格式

如： 9824523.33 转为  9，824，523.33 
```js
// 方法一
var num = 9824523.33 // 转化成 9，824，523.33 
function transNum(num){
  var strNum = String(num)
  var beforeDot =  strNum.split('.')[0].toString()
  var aftrDot = strNum.match(/\./g) ? '.'+strNum.split('.')[1].toString(): ''
  var beforTxt = [...beforeDot].reverse().join('').replace(/(\d{3})/g,'$1,')
  var nextTxt = [...beforTxt].includes('.')?[...beforTxt].slice(0,-1).reverse().join(''):[...beforTxt].reverse().join('')

  var result = nextTxt + aftrDot
  return result
}

var v = transNum(num)
console.log(v,'v')

// 方法二
function transNum(num){
   var num =(num||0).toString(),result="";
   while(num.length>3){
       result=','+num.slice(-3) + result
       num = num.slice(0,num.length-3)
   }
   if(num){
       result = num + result
   }
   return result
}

// 方法三
function toThousands(num) {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}
```