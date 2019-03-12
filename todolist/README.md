
# Mobx
Mobx todolist 小案例
## 启动项目
```
yarn 

yarn start
```
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 性能优化

trace 需要在副作用中被调用

### 三大法则

- 细粒度拆分视图组件
- 使用独立组件处理列表
- 尽可能晚地解构可观察数据

TodoListTwo 是做了性能优化的，可以在控制台查看 追踪数据的变化.


## 使用 trace 进行调试

trace 是一个小工具，它能帮助你查找为什么计算值、 reactions 或组件会重新计算。

可以通过简单导入 import { trace } from "mobx" 来使用它，然后将其放置在 reaction 或计算值中。 它会打印出当前衍生重新计算的原因。

可以通过传入 true 作为最后参数来自动地进入 debugger 。 这种方式使得导致 reaction 重新运行的确切变化仍然在堆栈中，通常是〜8个堆栈帧。参见下面的图片。

在 debugger 模式中，调试信息还回透露出影响当前计算或 reaction 的完整衍生树。

调用 trace() 有几种方式，下面是一些示例:

```
import { observer } from "mobx-react" 
import { trace } from "mobx" 
@observer class MyComponent extends React.Component { 
  render() { 
    trace(true) // 每当 observable 值引起这个组件重新运行时会进入 debugger return <div>{this.props.user.name}</name> 
  } 
}

```
通过使用 reaction 或 autorun 中 reaction 参数来启用 trace :

```
mobx.autorun("loggerzz", r => {
    r.trace()
    console.log(user.fullname)
})
```