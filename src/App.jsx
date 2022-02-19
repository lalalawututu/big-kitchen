import React, { PureComponent } from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'antd';
import Header from './common/index'
import Mine from './component/mine';
import WorkMange from './component/workmange';
import PeopleMange from './component/peoplemange';
import WorkInfo from './component/workinformation';
import history from './history';
import './App.less';

class App extends PureComponent {
  render() {
    return (
      <Router history={history}>
        <div>
          <Header />
          <Route path="/" exact component={Mine}></Route>
          <Route path="/workmange" component={WorkMange}></Route>
          <Route path="/peoplemange" component={PeopleMange}></Route>
          <Route path="/workinformation" component={WorkInfo}></Route>
        </div>
      </Router>
    );
  }
}

export default connect()(App);

