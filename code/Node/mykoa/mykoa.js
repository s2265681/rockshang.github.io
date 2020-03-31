const http = require('http')

function compose(middleweares){
    return ctx => {
        const dispatch = (i) => {
            const middleweare = middleweares[i]
            if(i===middleweares.length){
                return
            }
            return middleweare(ctx,()=>dispatch(i+1))
        }
        return dispatch(0)
    }
}

class Context {
   constructor(req,res){
       this.req = req;
       this.res = res;
   }
}

class Application {
    constructor(){
        this.middleweares = []
    }
    listen(...args){
       const server = http.createServer(async (req,res)=>{
           const ctx = new Context(req,res)
            
           try {
            const fn = compose(this.middleweares)
            await fn(ctx)
            // this.middleweare(ctx)
            } catch (e) {
                console.error(e)
                ctx.res.statusCode = 500
                ctx.res.write('Internel Server Error')
            }
            ctx.res.end(ctx.body)
       })
       server.listen(...args)
    }
    use(middleweare){
      this.middleweares.push(middleweare)
    }
}
module.exports = Application