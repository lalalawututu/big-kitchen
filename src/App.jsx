import React, { PureComponent } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'antd';
import Header from './common/index'
import Mine from './component/mine';
import WorkMange from './component/workmange';
import PeopleMange from './component/peoplemange';
import './App.less';

class App extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact component={Mine}></Route>
          <Route path="/workmange" component={WorkMange}></Route>
          <Route path="/peoplemange" component={PeopleMange}></Route>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect()(App);

