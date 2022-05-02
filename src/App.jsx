import React from 'react';
import {
    Route, Routes
} from 'react-router-dom';
import './App.less';
import Header from './components/header'
import { WorkManage } from "./pages/workmanage";
import { Mine } from "./pages/mine";
import PeopleManage from "./components/peoplemanage";
import ProduceManage from "./pages/producemanage";
import {WorkInformation} from "./pages/workinformation";
import WorkCreatePage from "./pages/workcreate";
import { ProductionList } from "./pages/productionlist";
import { ProductionCheck } from "./pages/productioncheck";
import CommonCreate from "./pages/commonCreate";
import { ProductionDetail } from "./pages/productiondetail";
import { ThirdPartyManage } from "./pages/thirdpartymanage";
import Screen from "./pages/screen";
import { MaterialsManage } from './pages/materialsManage';
import { MaterialsCreate } from './pages/materialsCreate';
import Cost from './pages/cost';
import { GroupAttendance } from './pages/groupAttendance';
import { GroupHour } from './pages/groupHour';
import { GroupYield } from './pages/groupYield';
import { AssetAddEdits } from './pages/assetAddEdit';
/* 基础数据模块-物料管理 */
import MaterialIndex from "./pages/material/index";  //物料管理列表
import MaterialAddEdit from "./pages/material/addEdit";  //物料管理新增/编辑
import MaterialDetail from "./pages/material/detail";  //物料管理详情

import {StockScreen} from './pages/stockScreen';
import {SwipeCardBoard} from './pages/swipeCard';

import WorkFlow from "./pages/workflow";
import {SimErpPage} from "./pages/simerp";
import Homepage from "./pages/homepage";
import Estimate from "./oldpages/basicData/supplier/estimate";
import UniversiadeBarcode  from "./pages/UniversiadeBarcode";
import UniversiadeMenu from "./pages/UniversiadeMenu";
import { BOMManage } from "./pages/BOMManage";

import StockIndex from "./oldpages/stock/stockIndex/stockIndex";
import StockList from "./oldpages/stock/stockList/stockList";
import StockInOut from "./oldpages/stock/stockInOut/stockInOut";
import StockSafe from "./oldpages/stock/stockSafe/stockSafe";
import QualityIndex from "./oldpages/quality/qualityIndex/qualityIndex"
import Quality from "./oldpages/quality/quality";
import QualityRetrospect from "./pages/retrospect/index"; //质检追溯管理
import QualityReport from "./oldpages/quality/qualityReport/index"; //第三方质检报告
/* 基础数据模块-供应商管理 */
import SupplierIndex from "./oldpages/basicData/supplier/index";  //供应商管理列表
import SupplierPrice from "./oldpages/basicData/supplier/prices";  //供应商管理列表
import SupplierOrders from "./oldpages/basicData/supplier/orders";  //供应商管理列表
import SupplierAdd from "./oldpages/basicData/supplier/add";  //供应商管理新增/编辑
import SupplierDetail from "./oldpages/basicData/supplier/detail";  //供应商管理详情

/* 基础数据模块-人员管理 */
import PersonnelIndex from "./oldpages/basicData/personnel/index";  //人员管理列表
import PersonnelAddEdit from "./oldpages/basicData/personnel/addEdit";  //人员管理新增/编辑
import PersonnelDetail from "./oldpages/basicData/personnel/detail";  //人员管理详情

/* 基础数据模块-质检标准管理 */
import QualityStandardIndex from "./oldpages/basicData/quality/index";  //物料管理列表
import QualityStandardAddEdit from "./oldpages/basicData/quality/addEdit";  //物料管理新增/编辑
import QualityStandardDetail from "./oldpages/basicData/quality/detail";  //物料管理详情

/* 基础数据模块-车间管理 */
import WorkshopIndex from "./oldpages/basicData/workshop/index";  //车间管理列表
import WorkshopAddEdit from "./oldpages/basicData/workshop/addEdit";  //车间管理新增/编辑
import WorkshopDetail from "./oldpages/basicData/workshop/detail";  //车间管理详情

/* 基础数据模块-角色管理 */
import RoleIndex from "./oldpages/basicData/role/index";  //车间管理列表
import RoleAddEdit from "./oldpages/basicData/role/addEdit";  //车间管理新增/编辑
import RoleDetail from "./oldpages/basicData/role/detail";  //车间管理详情

/* 基础数据模块-班组管理 */
import TeamIndex from "./oldpages/basicData/team/index";  //班组管理列表
import TeamAddEdit from "./oldpages/basicData/team/addEdit";  //班组管理新增/编辑
import TeamDetail from "./oldpages/basicData/team/detail";  //班组管理详情

/* 基础数据模块-品牌管理 */
import BrandIndex from "./oldpages/basicData/brand/index";  //班组管理列表
import BrandAddEdit from "./oldpages/basicData/brand/addEdit";  //品牌管理新增/编辑
import BrandDetail from "./oldpages/basicData/brand/detail";  //品牌管理详情

/* 基础数据模块-资产管理 */
import AssetIndex from "./oldpages/basicData/asset/index";  //资产管理列表
import AssetAddEdit from "./oldpages/basicData/asset/addEdit";  //资产管理新增/编辑
import AssetDetail from "./oldpages/basicData/asset/detail";  //资产管理详情

/* 基础数据模块-资产(设备)管理 */
import AssetEquipmentIndex from "./oldpages/basicData/assetEquipment/index";  //资产设备管理列表
import AssetEquipmentAddEdit from "./oldpages/basicData/assetEquipment/addEdit";  //资产设备管理新增/编辑
import AssetEquipmentDetail from "./oldpages/basicData/assetEquipment/detail";  //资产设备管理详情

/* 系统管理-组织机构管理 */
import OrganizationIndex from './oldpages/system/organization/index'; //组织机构管理列表

/* 系统管理-用户管理 */
import UserIndex from './oldpages/system/user/index'; //组织机构管理列表

/* 系统管理-数据字典 */
import DictionaryIndex from './oldpages/system/dictionary/index'; //数据字典列表
/* 系统管理-菜单管理 */
import MenuIndex from './oldpages/system/menu/index';

/* 设备管理 */
import EquipmentIndex from './pages/equipment/index'; //设备管理首页
import EquipmentAddEdit from './pages/equipment/addEdit'; //设备管理编辑
import EquipmentDetail from './pages/equipment/detail'; //设备管理详情

/* 凭证管理 */
import VoucherIndex from './pages/voucher/index'; //财务凭证页面

/* 周转筐管理 */
import TurnoverBasketIndex from './pages/TurnoverBasket/index'; //周转筐管理首页

/* 报损管理 */
import FrmLossIndex from './pages/frmLoss/index'; //报损管理

/* 臭氧消杀 */
import OzoneKillIndex from './pages/OzoneKill/index'; //臭氧消杀

/* 产品追溯 */
import ProductReviewIndex from './pages/productReview'; //产品追溯首页
import ProductReviewDetail from './pages/productReview/detail'; //产品追溯详情

/* 配送管理 */
import DistributionIndex from './pages/distribution'; //配送管理首页
import DistributionDetail from './pages/distribution/detail'; //配送管理详情

const App = () => {
        return (
            <div>
                {/*<Router history={history}>*/}
                    <Routes>
                        <Route path='/' element={<Homepage />} />
                        <Route path='/workflow/*' element={<WorkFlow />} />
                        <Route path='/home/*' element={<Homepage />} />
                        <Route path="/craft" element={<div><Header /><WorkManage /></div>} />
                        <Route path="/bom" element={<div><Header /><BOMManage /></div>} />
                        <Route path="/unibarcode" element={<div><Header /><UniversiadeBarcode /></div>} />
                        <Route path="/unimenu" element={<div><Header /><UniversiadeMenu /></div>} />
                        <Route path="/peoplemanage" element={<div><Header /><PeopleManage /></div>} />
                        <Route path="/workinformation" element={<div><Header /><WorkInformation /></div>} />
                        <Route path="/workcreate" element={<div><Header /><WorkCreatePage /></div>} />
                        <Route path="/ProduceManage/*" element={<div><Header /><ProduceManage /></div>} />
                        <Route path="/productionlist/*" element={<div><Header /><ProductionList /></div>} />
                        <Route path="/productioncheck" element={<div><Header /><ProductionCheck /></div>} />
                        <Route path="/commonCreate" element={<div><Header /><CommonCreate /></div>} />
                        <Route path="/productiondetail" element={<div><Header /><ProductionDetail /></div>} />
                        <Route path="/thirdparty/*" element={<div><Header /><ThirdPartyManage /></div>} />
                        <Route path="/simerp/*" element={<div><Header /><SimErpPage /></div>} />
                        <Route path="/qualityindex" element={<div><Header /><QualityIndex /></div>} />
                        <Route path="/quality" element={<div><Header /><Quality /></div>} />
                        <Route path="/qualityretrospect" element={<div><Header /><QualityRetrospect /></div>} />
                        <Route path="/qualityreport" element={<div><Header /><QualityReport /></div>} />
                        <Route path="/sku" element={<div><Header /><MaterialsManage /></div>} />
                        <Route path="/cost" element={<div><Header /><Cost /></div>} />
                        <Route path="/materialsManage" element={<div><Header /><MaterialsManage /></div>} />
                        <Route path="/materialsCreate" element={<div><Header /><MaterialsCreate /></div>} />
                        <Route path="/groupAttendance" element={<div><Header /><GroupAttendance /></div>} />
                        <Route path="/groupHour" element={<div><Header /><GroupHour /></div>} />
                        <Route path="/groupYield" element={<div><Header /><GroupYield /></div>} />
                        <Route path="/assetAddEdits" element={<div><Header /><AssetAddEdits /></div>} />

                        <Route path="/screen" element={<Screen />} />
                        <Route path="/stockScreen" element={<StockScreen />} />

                        <Route path="/mine/*" element={<Mine />} />
                        <Route path="/unicardswipe" element={<SwipeCardBoard />} />

                        <Route path="/StockList" element={<div><Header /><StockList /></div>} />
                        <Route path="/StockIndex" element={<div><Header /><StockIndex /></div>} />
                        <Route path="/StockInOut" element={<div><Header /><StockInOut /></div>} />
                        <Route path="/StockSafe" element={<div><Header /><StockSafe /></div>} />
                        <Route path="/waybillList" element={<div><Header /><StockInOut /></div>} />

                        <Route path="/AssetIndex" element={<div><Header /><AssetIndex /></div>} />
                        <Route path="/assetAddEdit" element={<div><Header /><AssetAddEdit /></div>} />
                        <Route path="/assetDetail" element={<div><Header /><AssetDetail /></div>} />
                        <Route path="/AssetEquipmentIndex" element={<div><Header /><AssetEquipmentIndex /></div>} />
                        <Route path="/assetEquipmentAddEdit" element={<div><Header /><AssetEquipmentAddEdit /></div>} />
                        <Route path="/assetEquipmentDetail" element={<div><Header /><AssetEquipmentDetail /></div>} />
                        <Route path="/supplier/index" element={<div><Header /><SupplierIndex /></div>} />
                        <Route path="/supplier/estimate" element={<div><Header /><Estimate /></div>} />
                        <Route path="/supplier/price" element={<div><Header /><SupplierPrice /></div>} />
                        <Route path="/supplier/orders" element={<div><Header /><SupplierOrders /></div>} />
                        <Route path="/supplierAdd" element={<div><Header /><SupplierAdd /></div>} />
                        <Route path="/supplierDetail" element={<div><Header /><SupplierDetail /></div>} />
                        <Route path="/PersonnelIndex" element={<div><Header /><PersonnelIndex /></div>} />
                        <Route path="/PersonnelAddEdit" element={<div><Header /><PersonnelAddEdit /></div>} />
                        <Route path="/PersonnelDetail" element={<div><Header /><PersonnelDetail /></div>} />
                        <Route path="/MaterialIndex" element={<div><Header /><MaterialIndex /></div>} />
                        <Route path="/materialAddEdit" element={<div><Header /><MaterialAddEdit /></div>} />
                        <Route path="/materialDetail" element={<div><Header /><MaterialDetail /></div>} />
                        <Route path="/QualityStandardIndex" element={<div><Header /><QualityStandardIndex /></div>} />
                        <Route path="/qualityStandardAddEdit" element={<div><Header /><QualityStandardAddEdit /></div>} />
                        <Route path="/qualityStandardDetail" element={<div><Header /><QualityStandardDetail /></div>} />
                        <Route path="/WorkshopIndex" element={<div><Header /><WorkshopIndex /></div>} />
                        <Route path="/workshopAddEdit" element={<div><Header /><WorkshopAddEdit /></div>} />
                        <Route path="/workshopDetail" element={<div><Header /><WorkshopDetail /></div>} />
                        <Route path="/RoleIndex" element={<div><Header /><RoleIndex /></div>} />
                        <Route path="/roleAddEdit" element={<div><Header /><RoleAddEdit /></div>} />
                        <Route path="/roleDetail" element={<div><Header /><RoleDetail /></div>} />
                        <Route path="/TeamIndex" element={<div><Header /><TeamIndex /></div>} />
                        <Route path="/TeamAddEdit" element={<div><Header /><TeamAddEdit /></div>} />
                        <Route path="/TeamDetail" element={<div><Header /><TeamDetail /></div>} />
                        <Route path="/BrandIndex" element={<div><Header /><BrandIndex /></div>} />
                        <Route path="/BrandAddEdit" element={<div><Header /><BrandAddEdit /></div>} />
                        <Route path="/BrandDetail" element={<div><Header /><BrandDetail /></div>} />

                        <Route path="/DictionaryIndex" element={<div><Header /><DictionaryIndex /></div>} />
                        <Route path="/UserIndex" element={<div><Header /><UserIndex /></div>} />
                        <Route path="/OrganizationIndex" element={<div><Header /><OrganizationIndex /></div>} />
                        <Route path="/MenuIndex" element={<div><Header /><MenuIndex /></div>} />

                        <Route path="/EquipmentIndex" element={<div><Header /><EquipmentIndex /></div>} />
                        <Route path="/EquipmentAddEdit" element={<div><Header /><EquipmentAddEdit /></div>} />
                        <Route path="/EquipmentDetail" element={<div><Header /><EquipmentDetail /></div>} />
                        <Route path="/VoucherIndex" element={<div><Header /><VoucherIndex /></div>} />
                        <Route path="/TurnoverBasketIndex" element={<div><Header /><TurnoverBasketIndex /></div>} />
                        <Route path="/FrmLossIndex" element={<div><Header /><FrmLossIndex /></div>} />
                        <Route path="/OzoneKillIndex" element={<div><Header /><OzoneKillIndex /></div>} />

                        <Route path="/ProductReviewIndex" element={<div><Header /><ProductReviewIndex /></div>} />
                        <Route path="/ProductReviewDetail" element={<div><Header /><ProductReviewDetail /></div>} />
                        <Route path="/DistributionIndex" element={<div><Header /><DistributionIndex /></div>} />
                        <Route path="/DistributionDetail" element={<div><Header /><DistributionDetail /></div>} />

                 </Routes>
                {/*</Router>*/}
            </div>
        )
}

export default App;

