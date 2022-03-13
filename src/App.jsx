import React, { PureComponent } from 'react';
import { Router, Route } from 'react-router-dom';
// import Header from './component/header'
import { Mine } from './component/mine';
import { WorkMange } from './component/workmange';
import PeopleMange from './component/peoplemange';
import WorkInfo from './component/workinformation';
import WorkCreate from './component/workcreate';
import CommonCreate from './component/commonCreate';
import Screen from './component/screen';
import history from './history';
import './App.less';

class App extends PureComponent {
  render() {
    return (
      <Router history={history}>
        <div>
          {/* <Header /> */}
          <Route path="/" exact component={WorkMange}></Route>
          <Route path="/mine" component={Mine}></Route>
          <Route path="/peoplemange" component={PeopleMange}></Route>
          <Route path="/workinformation" component={WorkInfo}></Route>
          <Route path="/workcreate" component={WorkCreate}></Route>
          <Route path="/commonCreate" component={CommonCreate}></Route>
          <Route path="/screen" component={Screen}></Route>
        </div>
      </Router>
    );
  }
}

export default App;

