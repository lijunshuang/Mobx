import React, { Component } from 'react'
import TodoList from './component/TodoList'
import TodoListTwo from './component/TodoListTwo'
export default class componentName extends Component {
  render() {
    return (
      <div className="app">
        <h2>TodoList</h2>
        <TodoList />
        <h2>observe 工具函数练习</h2>
        <TodoListTwo />
      </div>
    )
  }
}
