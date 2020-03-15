### React-Core

- 手写React核心api
- 探究setState
- 探究diff算法

最核心api： 1、创建虚拟DOM React.createElement
           2、实现自定义组件 React.Component 
           3、渲染真实Dom ReactDOM.render

常见问题:
1、 JSX？why？how？ ： 对js语法的扩展，替代常规js，用js的方式描述视图，（js执行更快，开发效率，类型安全）

总结:
1、 webpack+babel编译时，替换JSX为React.createElement(type,props,...children)
2、所有React.createElement() 执行结束后得到一个JS对象，它能够完整的描述dom结构，称之为vdom
3、ReactDOM.render(vdom,container) 可以将vdom转化为don并且追加到container中，通过递归遍历vdom树，根据type的不同，执行不同的逻辑，vtype为1，生成原生元素，为2则需要将类组件实例化并执行其render将vdom初始化，为3则将行数执行并将返回vdom初始化


setState 机制
class组件的特点，就是拥有特殊状态并且可以通过setState更新状态，从而重新渲染视图，是学习React的重要api

### 什么是虚拟dom 、 diff算法 、虚拟dom快在哪
https://blog.csdn.net/qiqingjin/article/details/51804138

虚拟dom，diff算法
what?
虚拟dom就是js对象，可以描述这个dom
why? 
DOM操作很慢，轻微的操作都可能导致页面重新排版，非常耗性能，相对于dom对象，js操作处理更快，更简单，通过diff算法对比新旧vdom之间的差异，可以批量，最小化的执行dom操作，从而提高性能。
抽象出虚拟dom这一层，去比较，减少真实dom节点的渲染
where?
react 中用JSX语法描述视图，通过babel-loading转译后他们变为React.createElement(...)形式，该函数将生成vdom来描述真实的dom，将来如果状态变化，vdom将做出相应的变化，再通过diff算法对比老得vdom区别从而得出最终dom操作。
how？
diff算法：React Diff
diff策略
1、同级比较，web UI中dom节点跨层级操作很少，忽略不计 （平行比较）
2、基于类型比较，不同类的两个组件会形成有不同的树比较  （类型比较）
3、对于同一层级的一组子节点，通过唯一的key进行区分    （key比较）
通过这三个前提策略分别对、tree diff 、 component diff、 element diff进行算法优化，事实也证明这灿哥前提策略是合理切准确的，它保证来整体界面构建的性能

element diff
替换原开