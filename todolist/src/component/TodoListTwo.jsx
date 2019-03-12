import React, { Component, Fragment} from "react";
import { trace, toJS,spy, observe, observable, action, computed } from 'mobx'
import PropTypes from 'prop-types'
import { observer, PropTypes as ObservablePropTypes } from 'mobx-react'

import "../App.scss"

spy(event => { 
  // console.log(event);
})

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

  disposers = []

  constructor() {
    // observe 返回的是一个disposers
    observe(this.todos, change => {
      this.disposers.forEach(disposer => disposer());//解除监控
      this.disposers = [];//清空disposers数组

      for (let todo of change.object) {
        const disposer = observe(todo, changex => { 
          // console.log(changex);

        })//使用observe 来监视todo
        this.disposers.push(disposer)
      }
      this.save()
      // console.log(change);
      
    })
  }
  save() { 
    // toJS 是递归地将一个(observable)对象转换为 javascript 结构
    //把数据存入本地存储
    localStorage.setItem('todos', JSON.stringify(toJS(this.todos)))
    // console.log(toJS(this.todos));
    
  }

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
class Header extends Component{
  static propTypes = {
    todo: PropTypes.shape({
      title: PropTypes.string.isRequired
    })
  }
  state = {
    inputVal :''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const store = this.props.store
    const inputVal = this.state.inputVal
    //如果inputVal的值不为空，去除首尾的空格，则向store中添加todos
    if (inputVal.replace(/(^\s*)|(\s*$)/g,"")) { 
      store.addTodo(inputVal)
    }
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
    return <header>
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
   }
}
@observer
class TodoView extends Component { 
  static propTypes = {}
  render() {
    trace();
    const todos =this.props.todos
    return (
      todos.map(todo => <li key={todo.id} onClick={() => todo.finishedToggle()}>
          <TodoItem todo={todo} store={store} />
          <span className="delete" onClick={e=>store.removeTodo(todo)}>X</span>
        </li>)
    )
  }
}
@observer
class Footer extends Component {
  static propTypes = {}
  render() {
    trace();
    const store = this.props.store
    return <footer> {store.unfinished} item(s) is unfinished !</footer>
  }
}
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
    // trace();
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
  
  render() {
    trace();
    const store = this.props.store
    const todos = store.todos
    return (
      <div className="todo-list">
        <Header store={store} />
        <ul>
          <TodoView todos={todos} />
        </ul>
        <Footer store={store} />
      </div>
    )
  }
}
class App extends Component {
  render() {
    return <div>
      <TodoList store={store} />
    </div>;
  }
}
export default App