import React, { Component } from 'react'

// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
// const ThemeContext = React.createContext('light')
const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};
const ThemeContext = React.createContext(
  themes.dark // 默认值
);
// 一个使用 ThemeButton 的中间组件。
const Toolbar = (props) => { 
  return <ThemeButton onClick={props.changeTheme}>
          Change Theme
        </ThemeButton>
}

class ThemeButton extends Component { 
  static contextType = ThemeContext
  render() {
    let props = this.props;
    let theme = this.context
    return <button
      {...props}
      style={{ width: 150, height: 30,background:theme.background,color:theme.background == theme.background ? theme.foreground: theme.background}}>
      
    </button>
  }
}

class Context extends Component {
  static contextType = ThemeContext
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };

  }
  toggleTheme = () => {
    this.setState(state => ({
      theme:
        state.theme === themes.dark
          ? themes.light
          : themes.dark,
    }));
  };
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      // 在 ThemeProvider 内部的 ThemedButton 按钮组件使用 state 中的 theme 值，
      // 而外部的组件使用默认的 theme 值
      <div>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <section>
          <ThemeButton />
        </section>
      </div>
    )
  }
}
export default Context