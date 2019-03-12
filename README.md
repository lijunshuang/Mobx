
## react 脚手架

使用create-react-app 创建react项目

打开终端，使用npx 创建项目，`my-order` 是项目名称
```
npx create-react-app my-order
```

## create-react-app与mobx结合

### 创建项目

```javascript
npx create-react-app mobx-react

//创建本地仓库
git init

git add .
git commit -m "Saving begore ejecting"
npm run eject
//安装 装饰器插件
//(安装该模块中间可能有告警自行消除即可)
npm install --save-dev babel-plugin-transform-decorators-legacy 
npm install --save-dev @babel/plugin-proposal-decorators
npm install --save-dev @babel/plugin-proposal-class-properties
```

在 package.json 里修改 babel 如下所示

```
"babel": {
  "plugins":[
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy":true
      }
    ],
    [
      "@babel/plugin-proposal-class-properties",
      {
        "loose":true
      }
    ]
  ],
  "presets":[
    "react-app"
  ]
}
```
以上配置完成 可以使用 Mobx的 装饰器了！！




每个文件夹都是独立的demo

## 实现TodoList 功能

- TODO条目的列表展示
- 增加TODO条目
- 修改完成状态
- 删除TODO条目
 





