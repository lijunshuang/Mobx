import React, { Component } from "react";
import ReactDOM from "react-dom";
import { observable, isArray, computed } from "mobx";
import { observer } from 'mobx-react';
 
class Store {
  @observable array = [];
  @observable obj = {};
  @observable map = new Map();

  @observable string = "hello";
  @observable number = 20;
  @observable bool = false;

  @computed get foo() { 
    return store.string + "/" + store.number;
  }
}
var store = new Store();

@observer
class Foo extends Component{
  constructor(props){
    super(props);
    console.log(this.props); // prints out whatever is inside props
  }
  render() {
    const store = this.props.store
    const foo = this.props.store.foo
    console.log('PureItem的render触发了');
    return (
        <div>
          <p>store.string: {store.string}</p>
          <p>store.number: {store.number}</p>
          <p>store.foo: {foo}</p>
        </div>
    );
  }
}

@observer
class Observer extends Component {
  state = {
    a:0
  }
  add = () => {
    this.setState({
      a:this.state.a+1
    })
  }
  render() {
    return (
      <div>
        {this.state.a}
        <button onClick={this.add}>点我➕1</button>
        <Foo store={store} foo={store.foo} />
      </div>
    )
  }
}
export default Observer
