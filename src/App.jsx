import React, { PureComponent } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'antd';
import Mine from './component/mine';
import './App.less';

class App extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" exact component={Mine}></Route>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect()(App);

