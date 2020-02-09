import React from 'react';
import './App.css';

import FormElement from './components/FormElement/FormElement';
import { Switch, Route } from 'react-router-dom';
import CommonGames from './components/CommonGames/CommonGames';

function App() {
  return (
    <div className="App">
      <div className="container">
        <header>
          <h1>Find common games for your party</h1>
        </header>
        <Switch>
          <Route exact path="/" component={FormElement} />
          <Route path="/common-games/:ids" component={CommonGames} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
