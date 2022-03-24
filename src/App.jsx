import React, { PureComponent } from 'react';
import { Router, Route } from 'react-router-dom';
import Header from './pages/header'
import { Mine } from './pages/mine';
import { WorkManage } from './pages/workmanage';
import { ProductionList } from './pages/productionlist';
import { ProductionCheck } from './pages/productioncheck';
import { ProductionDetail } from './pages/productiondetail';
import { MaterialsManage } from './pages/materialsManage';
import { MaterialsCreate } from './pages/materialsCreate';
import { Cost } from './pages/cost';
import { GroupAttendance } from './pages/groupAttendance';
import { GroupHour } from './pages/groupHour';
import { GroupYield } from './pages/groupYield';
import PeopleManage from './pages/peoplemanage';
import WorkInfo from './pages/workinformation';
import WorkCreate from './pages/workcreate';
import CommonCreate from './pages/commonCreate';
import {ProduceManage} from './pages/producemanage';
import {ThirdPartyManage} from './pages/thirdpartymanage';
import {AssetAddEdit} from './pages/assetAddEdit';
import Screen from './pages/screen';
import history from './history';
import './App.less';

class App extends PureComponent {
  render() {
    return (
      <Router history={history}>
        <div>
          <Header />
          <Route path="/" exact component={WorkManage}></Route>
          <Route path="/mine" component={Mine}></Route>
          <Route path="/peoplemanage" component={PeopleManage}></Route>
          <Route path="/workinformation" component={WorkInfo}></Route>
          <Route path="/workcreate" component={WorkCreate}></Route>
          <Route path="/commonCreate" component={CommonCreate}></Route>
          <Route path="/productionlist" component={ProductionList}></Route>
          <Route path="/productioncheck" component={ProductionCheck}></Route>
          <Route path="/productiondetail" component={ProductionDetail}></Route>
          <Route path="/producemanage" component={ProduceManage}></Route>
          <Route path="/screen" component={Screen}></Route>
          <Route path="/thirdparty" component={ThirdPartyManage}></Route>
          <Route path="/materialsManage" component={MaterialsManage}></Route>
          <Route path="/materialsCreate" component={MaterialsCreate}></Route>
          <Route path="/cost" component={Cost}></Route>
          <Route path="/groupAttendance" component={GroupAttendance}></Route>
          <Route path="/groupHour" component={GroupHour}></Route>
          <Route path="/groupYield" component={GroupYield}></Route>
          <Route path="/assetAddEdit" component={AssetAddEdit}></Route>
        </div>
      </Router>
    );
  }
}

export default App;

