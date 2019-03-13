import React, { Component } from "react";
import ReactDOM from "react-dom";
import { observer } from 'mobx-react';
import Observer from './component/Observer'
import Context from './component/Context'
 
@observer
class App extends Component {

  render() {
    return (
      <div>
        <h2>Observer</h2>
        <Observer />
        <h2>Context</h2>
        <Context/>
      </div>
    )
  }
}
export default App
