import React, { PureComponent } from 'react';
import { Router, Route } from 'react-router-dom';
import Header from './component/header'
import { Mine } from './component/mine';
import { WorkMange } from './component/workmange';
import { ProductionList } from './component/productionlist';
import { ProductionCheck } from './component/productioncheck';
import { ProductionDetail } from './component/productiondetail';
import { MaterialsMange } from './component/materialsMange';
import PeopleMange from './component/peoplemange';
import WorkInfo from './component/workinformation';
import WorkCreate from './component/workcreate';
import CommonCreate from './component/commonCreate';
import {ProduceMange} from './component/producemange';
import {ThirdPartyMange} from './component/thirdpartymange';

import Screen from './component/screen';
import history from './history';
import './App.less';

class App extends PureComponent {
  render() {
    return (
      <Router history={history}>
        <div>
          <Header />
          <Route path="/" exact component={WorkMange}></Route>
          <Route path="/mine" component={Mine}></Route>
          <Route path="/peoplemange" component={PeopleMange}></Route>
          <Route path="/workinformation" component={WorkInfo}></Route>
          <Route path="/workcreate" component={WorkCreate}></Route>
          <Route path="/commonCreate" component={CommonCreate}></Route>
          <Route path="/productionlist" component={ProductionList}></Route>
          <Route path="/productioncheck" component={ProductionCheck}></Route>
          <Route path="/productiondetail" component={ProductionDetail}></Route>
          <Route path="/producemange" component={ProduceMange}></Route>
          <Route path="/screen" component={Screen}></Route>
          <Route path="/thirdparty" component={ThirdPartyMange}></Route>
          <Route path="/materialsMange" component={MaterialsMange}></Route>
        </div>
      </Router>
    );
  }
}

export default App;

