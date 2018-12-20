import 'antd-mobile/dist/antd-mobile.css'
import React, {Component} from 'react'
import './App.css'
import Home from './home/Home'
import ManageBalloons from './balloon/ManageBalloons'
import ManageFees from './fee/ManageFees'

class App extends Component {
  state = {location: "home"}

  choose = which => {
    if (which === "fee" || which === "balloon")
      this.setState({location: which})
  }

  goHome = () => this.setState({location: "home"})

  render() {
    if (this.state.location === "home")
      return (<div className="App"><Home onClick={this.choose}/></div>)
    if (this.state.location === "balloon")
      return (<ManageBalloons goHome={this.goHome}/>)
    if(this.state.location ==="fee")
      return (<ManageFees goHome={this.goHome}/>);
  }
}

export default App;
