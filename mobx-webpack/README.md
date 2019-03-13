

# 本项目是 Mobx 结合webpack的配置

启动项目
```
yarn 
yarn start
```

预览地址：http://localhost:8080

## Mobx、React与webpack 结合使用的问题

1、 Module parse failed: Unexpected character '@'报错

2、The 'decorators' plugin requires a 'decoratorsBeforeExport' option, whose value must be a boolean. If you are migrating from Babylon/Babel 6 or want to use the old decorators proposal, you should use the 'decorators-legacy' plugin instead of 'decorators'.

原因是 babel-loader的版本过高，更换7版本就可以了
```
npm i babel-loader@7
或者
yarn add babel-loader@7
```

本项目使用了 webpack-dev-server来实现热更新。



