# Plugin

为了将**Slim**集成到各种时下流行的框架，更利于程序的拓展，**Slim**提供了插件机制

## 使用插件

插件使用非常的简单，只需要在注册时添加**Plugin**即可

```javascript
const store = Slim.createStore({
    plugin: loggerPlugin
})
```

多个插件使用数组包裹

```javascript
const store = Slim.createStore({
    plugin: [loggerPlugin, capturePlugin]
})
```

## 注册插件

**Slim**中编写插件也是非常简单的，插件提供了四个api，多个**Plugin**将按注册顺序执行

* `init`：在插件注册被初始化的时候执行，接收一个参数`store`
* `before`和`after`：分别作用与reducer执行前后，接收两个参数`state`和`action`
* `beforeSet`：在设置新值的时候触发，接收四个参数`target`、`property`、`value`和`receiver`，详情可参考[Proxy.set](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/set)

:::warning 注意
`init`只会在store初始化的时候执行，插件使用具有顺序性，并且结果相互影响，但是再确保操作无害之前请不要随意在**Plugin**中操作**State**。总体来说，请在**Plugin**中读取**State**，将操作放到**Reducer**中。
:::

在**Store**创建时注入

```javascript
import Slim from 'slim-store'

const state = {
    count: 0
}

const counters = {
    increment: (state) => {
        state.count++
    }
}

const counterPlugin = {
	init(store) {
 	    // inject events
	},
    before(state, action) {
        if (action === 'increment') {
            console.log('before count change', state.count)
        }
    },
    beforeSet(target, property, value, receiver) {
        console.log(target, property, value, receiver)
    },
    after(state, action) {
        if (action === 'increment') {
            console.log('after count change', state.count)
        }
    }
}

const store = Slim.createStore({
    reducers: counters,
    state: state,
    plugin: [counterPlugin]
})

store.commit('increment')

// output: before count change 0
// output: after count change 1
```

在**Store**创建前注入

```javascript
Slim.use(somePlugin)

const store = Slim.createStore(...)
``` 

## 集成Slim的插件
* [VSlim](/zh/vslim.html): 在Vue中基于Slim的状态管理框架.
* [RSlim](/zh/rslim.html): 在React中基于Slim的状态管理框架.
