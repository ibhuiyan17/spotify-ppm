import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import StartButton from './StartButton';

class App extends Component {
  

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <StartButton targ={'/api/recents'}/>
      </div>
    );
  }
}

export default App;