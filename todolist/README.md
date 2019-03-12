
# Mobx
Mobx todolist 小案例
## 启动项目
```
yarn 

yarn start
```
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

部分代码

```
import React, { Component, Fragment} from "react";
import { observable, action, computed } from 'mobx'
import PropTypes from 'prop-types'
import { observer, PropTypes as ObservablePropTypes } from 'mobx-react'

import "./App.scss"
class Todo { 
  @observable id = Math.random();
  @observable title = ""
  @observable finished = false

  constructor (title) {
    this.title =  title;
  }

  @action.bound finishedToggle() {
    this.finished = !this.finished;
  }
}
class Store { 
  @observable todos = [];
  @action.bound addTodo(title) {    
    this.todos.unshift(new Todo(title));
  }
  @action.bound removeTodo(todo) {    
    //remove非数组自带方法，是mobx-react提供的
    this.todos.remove(todo);
  }
  // 计算属性
  @computed get unfinished() { 
    return this.todos.filter(todo=>!todo.finished).length
  }
}

const store = new Store()
@observer
class TodoItem extends Component { 
  static propTypes = {
    // 传入todo
    todo: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      finished: PropTypes.bool.isRequired,
      finishedToggle:PropTypes.func
    }).isRequired,
    // 传入store
    store: PropTypes.shape({
      todos: PropTypes.array.isRequired,
    }).isRequired
  }
  handleClick = e => {
    this.props.todo.finishedToggle()
  }

  render() {
    const todo = this.props.todo
    return (
      <Fragment>
        <input
          type="checkbox"
          className="toggle"
          checked={todo.finished}
          onChange={()=>''}
        />
        <span className={['title',todo.finished && 'finished'].join(' ')}>{todo.title}</span>
      </Fragment>
    )
  }
}
@observer
class TodoList extends Component {
  static propTypes = {
    store: PropTypes.shape({
      // 对store内的数据进行类型校验
      addTodo: PropTypes.func,
      // todos为observableArray，其内数据为observableObject，isRequire表示store、todos必须存在
      todos: ObservablePropTypes.observableArrayOf(ObservablePropTypes.observableObject).isRequired
    }).isRequired

  }
  state = {
    inputVal :''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const store = this.props.store
    const inputVal = this.state.inputVal
    console.log(store);
    
    store.addTodo(inputVal)
    this.setState({
      inputVal: ''
    })

  }
  handleChange = (e) => { 
    const inputVal = e.target.value
    this.setState({
      inputVal
    })
  }
  render() {
    const store = this.props.store
    const todos = store.todos
    return (
      <div className="todo-list">
        <header>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              className="input"
              placeholder="What needs to finished ?"
              value={this.state.inputVal}
              onChange={this.handleChange}
            />
          </form>
        </header>
        <ul>
          {
            todos.map(todo => <li key={todo.id} onClick={() => todo.finishedToggle()}>
              <TodoItem todo={todo} store={store} />
              <span className="delete" onClick={e=>store.removeTodo(todo)}>X</span>
            </li>)
          }
        </ul>
        <footer> {store.unfinished} item(s) is unfinished !</footer>
      </div>
    )
  }
}

```
