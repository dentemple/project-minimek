import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import SampleComponent from './SampleComponent'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Project Mini-Mek</h1>
        </header>
        <SampleComponent />
      </div>
    )
  }
}

export default App
