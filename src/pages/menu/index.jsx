import React from 'react';
import { Link } from 'react-router-dom'

export const Menu = () => {
    return (
        <div className="Tab_link">
            <h3>welcome</h3>
            <div>
                业务流程：
                <Link target="_blank" to='/workflow/mes'>MES业务流程</Link>
                <Link target="_blank" to='/workflow/supplyChain'>供应链</Link>
                <Link target="_blank" to='/workflow/sales'>营销部</Link>
                <Link target="_blank" to='/workflow/processing'>生产部</Link>
                <Link target="_blank" to='/workflow/qControl'>品控</Link>
                <Link target="_blank" to='/workflow/qInspection'>检验</Link>
                <Link target="_blank" to='/workflow/hr'>行政</Link>
                <Link target="_blank" to='/workflow/finance'>财务部</Link>
                <Link target="_blank" to='/workflow/dev'>研发部</Link>
                <Link target="_blank" to='/workflow/it'>信息部</Link>
                <Link target="_blank" to='/workflow/management'>企业管理事业部</Link>
            </div>
            <div>
                数据同步：
                <Link to='/thirdparty/orders'>销售订单</Link>
                <Link to='/thirdparty/customer'>客户信息</Link>
                <Link to='/thirdparty/sku'>SKU</Link>
                <Link to='/thirdparty/supplier'>供应商信息</Link>
                <Link to='/thirdparty/employee'>员工信息</Link>
                <Link to='/thirdparty/demand'>生产需求</Link>
                <Link to='/thirdparty/purchase'>采购订单</Link>
            </div>
            <div>
                供应商管理：
                <Link to='/supplier/index'>供应商管理</Link>
                <Link to='/supplier/price'>比价</Link>
                <Link to='/supplier/orders'>采购订单</Link>
                <Link to='/supplier/index'>评级</Link>
            </div>
            <div>
                生产计划-1：
                <Link to='/productionlist/all'>全部计划</Link>
                <Link to='/ProduceManage/receiving'>接货计划</Link>
                <Link to='/ProduceManage/recvquality'>接货质检计划</Link>
                <Link to='/ProduceManage/prod'>生产计划</Link>
                <Link to='/ProduceManage/quality'>质检计划</Link>
                <Link to='/ProduceManage/picking'>领料计划</Link>
                <Link to='/ProduceManage/loading'>装车配送计划</Link>
                <Link to='/ProduceManage/clean'>车间清洗计划</Link>
                {/* <Link to='/check_work'>实时排工排产</Link> */}
                {/* <Link to='/product_admin'>计划列表</Link> */}
                {/* <Link to='/check_list'>实时排工排产列表</Link> */}
            </div>
            <div>
                生产计划-2：
                <Link to='/ProduceManage/disinfection'>消杀计划</Link>
                <Link to='/ProduceManage/maintain'>设备维护计划</Link>
                <Link to='/ProduceManage/repaire'>设备维修计划</Link>
                <Link to='/ProduceManage/poweron'>设备启动计划</Link>
                <Link to='/ProduceManage/fixstock'>盘库计划</Link>
                <Link to='/ProduceManage/recycle'>回筐计划</Link>
                <Link to='/ProduceManage/enter'>入库计划</Link>
                <Link to='/ProduceManage/sample'>留样计划</Link>
            </div>
            <div>
                看板-1：
                <Link to='/mine/home'>看板首页</Link>
                <Link to='/mine/receiving'>接货看板</Link>
                <Link to='/mine/recvinspection'>接货检验看板</Link>
                <Link to='/mine/recvcontrol'>接货品控看板</Link>
                <Link to='/mine/picking'>领料看板</Link>
                <Link to='/mine/prod'>生产看板</Link>
                <Link to='/mine/quality'>质检看板</Link>
                <Link to='/mine/sample'>留样看板</Link>
                <Link to='/mine/enter'>入库看板</Link>
                <Link to='/mine/enter'>返库看板</Link>
                <Link to='/mine/fixstock'>盘库看板</Link>
            </div>
            <div>
                看板-2：
                <Link to='/mine/maintain'>设备维护看板</Link>
                <Link to='/mine/poweron'>设备启动看板</Link>
                <Link to='/mine/repaire'>设备维修看板</Link>
                <Link to='/mine/loading'>物流配送看板</Link>
                <Link to='/mine/packing'>装箱看板</Link>
                <Link to='/mine/clean'>车间清洗看板</Link>
                <Link to='/mine/disinfection'>消杀看板</Link>
                <Link to='/mine/recycle'>回筐看板</Link>
                <Link to='/mine/exception'>异常上报看板</Link>
                <Link to='/mine/leader'>班组长看板</Link>
            </div>

            <div>
                生产管理：
                <Link to="/craft">工艺管理</Link>
                <Link to="/workinformation">工艺详情</Link>
                <Link to="/workcreate">工艺创建</Link>
                <Link to="/materialsManage">BOM管理</Link>
                <Link to='/peoplemanage'>岗位管理</Link>
                <Link to='/stockIndex'>仓库首页</Link>
                <Link to='/StockList'>仓库管理</Link>
                <Link to='/FrmLossIndex'>报损管理</Link>
                <Link to='/TurnoverBasketIndex'>周转筐管理</Link>
                <Link to='/OzoneKillIndex'>臭氧消杀管理</Link>
                <Link to='/VoucherIndex'>凭证管理</Link>
                <Link to='/qualityreport'>第三方质检报告</Link>
            </div>
            <div>
                生产分析：
                <Link to='/cost'>成本管理</Link>
                <Link to='/groupHour'>绩效管理-工时</Link>
                <Link to='/groupYield'>绩效管理-产出</Link>
                <Link to='/groupAttendance'>绩效管理-在岗</Link>
                <Link to='/DistributionIndex'>配送管理</Link>
                <Link to='/ProductReviewIndex'>产品追溯</Link>
                <Link to='/qualityretrospect'>质检追溯</Link>
                <Link to='/QualityRetrospect'>视频监控和异常行为</Link>
                <Link to='/QualityRetrospect'>统计报表</Link>
            </div>

            <div>
                基础数据：
                <Link to='/AssetIndex'>资产管理</Link>
                <Link to='/AssetEquipmentIndex'>设备管理</Link>
                <Link to='/PersonnelIndex'>人员管理</Link>
                <Link to='/MaterialIndex'>物料管理</Link>
                <Link to='/QualityStandardIndex'>质检标准管理</Link>
                <Link to='/WorkshopIndex'>车间管理</Link>
                <Link to='/RoleIndex'>角色管理</Link>
                <Link to='/TeamIndex'>班组管理</Link>
                <Link to='/BrandIndex'>品牌管理</Link>
                <Link to='/OrganizationIndex'>组织机构管理</Link>
                <Link to='/UserIndex'>用户管理</Link>
                <Link to='/MenuIndex'>菜单管理</Link>
            </div>

            <div>
                大屏：
                <Link to='/screen'>能源能耗</Link>
                <Link to='/screen'>大屏-能源能耗A</Link>
                <Link to='/screen'>大屏-能源能耗B</Link>
                <Link to='/screen'>大屏-能源能耗C</Link>
                <Link to='/screen'>物流配送</Link>
                <Link to='/screen'>生产计划</Link>
                <Link to='/screen'>环境监测</Link>
                <Link to='/screen'>仓库监测</Link>
                <Link to='/screen'>设备管理</Link>
            </div>

            <div>
                移动端：
                <Link to='/UserIndex'>运单查看</Link>
                <Link to='/OrganizationIndex'>路线打卡</Link>
            </div>
        </div>
    )
}
