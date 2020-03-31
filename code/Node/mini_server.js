
const http = require('http')

const server = http.createServer((req,res) => {
     //解决中文乱码
     res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
     res.end('hello,world+访问路径：'+req.url);
})

server.listen(9000)

server.on('connection',(req,socket,head)=>{
    console.log('有连接');
});