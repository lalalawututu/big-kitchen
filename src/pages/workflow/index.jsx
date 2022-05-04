import React, {PureComponent} from 'react';
import {Tabs} from 'antd';
import './index.less';
import {Link} from "react-router-dom";
import {getAnchorModel} from "../../utils";

const model = getAnchorModel()
const {TabPane} = Tabs;
const initialPanes = {
    'mes': {
        department: 'MES系统',
        tasks: {
            "information": [
                {title: '系统任务管理', content: 'Content of Tab 1', key: '1'},
                {title: '订单数据', content: '/thirdparty/orders', key: '3'},
                {title: '生产需求', content: 'Content of Tab 1', key: '30'},
                {title: '采购订单', content: 'Content of Tab 1', key: '31'},
                {title: '供应商送货单', content: 'Content of Tab 1', key: '4'},
                {title: '供应商比价', content: 'Content of Tab 1', key: '6'},
                {title: '供应商抛单', content: 'Content of Tab 1', key: '7'},
                {title: '供应商评级', content: 'Content of Tab 1', key: '8'},
                {title: '环境监控', content: 'Content of Tab 3', key: '15'},
                {title: '设备监控', content: 'Content of Tab 3', key: '16'},
                {title: '客户评级', content: 'Content of Tab 1', key: '18'},
            ],
            "board": [
                {title: '生产需求计算', content: 'Content of Tab 1', key: '5'},
                {title: 'APS排产', content: 'Content of Tab 2', key: '9'},
                {title: '成本计算', content: 'Content of Tab 2', key: '10'},
                {title: '绩效计算', content: 'Content of Tab 2', key: '11'},
                {title: '能耗计算', content: 'Content of Tab 2', key: '12'},
                {title: '出成率计算', content: 'Content of Tab 2', key: '13'},
                {title: '生产过程监控', content: 'Content of Tab 3', key: '14'},
                {title: '分拣码垛', content: 'Content of Tab 3', key: '17'},
                {title: '报警管理', content: 'Content of Tab 1', key: '2'},
            ],
            "screen": [
                {title: '物流配送大屏', content: 'Content of Tab 2', key: '20'},
                {title: '环境监测大屏', content: 'Content of Tab 3', key: '21'},
                {title: '生产计划大屏', content: 'Content of Tab 3', key: '22'},
                {title: '设备管理大屏', content: 'Content of Tab 3', key: '23'},
                {title: '仓储管理大屏', content: 'Content of Tab 3', key: '24'},
                {title: '能源能耗大屏', content: 'Content of Tab 3', key: '25'},
            ]
        }
    },
    'supplyChain': {
        department: '供应链',
        tasks: {
            "erp": [
                {title: '供应商入住(ERP)', content: '/supplier/index', key: '23'},
                {title: '供应商报价(ERP)', content: '/simerp/purchase', key: '24'},
                {title: '供应商接单(ERP)', content: '/simerp/porders', key: '25'},
            ],
            "information": [
                {title: '供应商评级', content: '/supplier/estimate', key: '4'},
                {title: '供应商合同管理', content: '/supplier/contracts', key: '4'},
                {title: '仓库监控', content: '/StockIndex', key: '5'},
                {title: '仓库管理', content: '/StockList', key: '5'},
                {title: '物料管理', content: '/MaterialIndex', key: '6'},
                {title: '周转筐管理', content: '/TurnoverBasketIndex', key: '19'},
                {title: '品牌管理', content: '/BrandIndex', key: '18'},
            ],
            "prod": [
                {title: '供应商比价', content: '/supplier/price', key: '2'},
                {title: '采购订单', content: '/supplier/orders', key: '18'},
                {title: '接货计划', content: '/ProduceManage/receiving', key: '1'},
                {title: '入库计划', content: '/ProduceManage/enter', key: '16'},
                {title: '盘库计划', content: '/ProduceManage/fixstock', key: '15'},
            ],
            "board": [
                {title: '接货看板', content: '/mine/receiving', key: '8'},
                {title: '入库看板', content: '/mine/enter', key: '9'},
                {title: '返库看板', content: '/mine/reenter', key: '11'},
                {title: '盘库看板', content: '/mine/fixstock', key: '12'},
            ],
            "screen": [
                {title: '仓储管理大屏', content: '/screen', key: '13'},
            ]
        }
    },
    'sales': {
        department: '营销部',
        tasks: {
            "erp": [
                {title: '客户签约(ERP)', content: '/simerp/customer', key: '2'},
                {title: '客户下单(ERP)', content: '/simerp/orders', key: '3'},
                {title: '客户确认收货(ERP)', content: 'Content of Tab 3', key: '4'},
            ],
            "prod": [
                {title: '生产需求', content: '/thirdparty/demand', key: '1'},
                {title: '采购订单', content: '/supplier/orders', key: '18'},
                {title: '物流配送计划', content: '/ProduceManage/loading', key: '17'},
                {title: '回筐计划', content: '/ProduceManage/recycle', key: '12'},
            ],
            "information": [
                {title: '产品追溯', content: '/ProductReviewIndex', key: '7'},
                {title: '配送管理', content: '/DistributionIndex', key: '13'},
            ],
            "board": [
                {title: '物流配送看板', content: '/mine/loading', key: '8'},
                {title: '回筐看板', content: '/mine/recycle', key: '9'},
                {title: '报损看板', content: '/mine/exception', key: '10'},
            ],
            "screen": [
                {title: '物流配送大屏', content: '/screen', key: '11'},
                {title: '物流配送移动端', content: '/screen', key: '14'},
            ]
        }
    },
    'processing': {
        department: '生产部',
        tasks: {
            "prod": [
                {title: '生产需求', content: '/thirdparty/demand', key: '1'},
                {title: '生产计划', content: '/ProduceManage/prod', key: '30'},
                {title: '领料计划', content: '/ProduceManage/picking', key: '30'},
                {title: '车间清洗计划', content: '/ProduceManage/clean', key: '2'},
                {title: '消杀计划', content: '/ProduceManage/disinfection', key: '3'},
            ],
            "information": [
                {title: '设备管理', content: '/AssetEquipmentIndex', key: '6'},
                {title: '消杀管理', content: '/OzoneKillIndex', key: '7'},
                {title: '清洗管理', content: '/OzoneKillIndex', key: '7'},
                {title: '岗位管理', content: '/peoplemanage', key: '6'},
                {title: '晨检', content: '/MorningCheck', key: '7'},
            ],
            "board": [
                {title: '领料看板', content: '/mine/picking', key: '30'},
                {title: '生产工序执行看板', content: '/mine/prod', key: '20'},
                {title: '消杀看板', content: '/mine/disinfection', key: '18'},
                {title: '清洗看板', content: '/mine/clean', key: '19'},
                {title: '装箱看板', content: '/mine/packing', key: '21'},
                {title: '异常上报看板', content: '/mine/exception', key: '22'},
                {title: '班组长看板', content: '/mine/leader', key: '10'},
            ],
            "screen": [
                {title: '生产计划大屏', content: '/screen', key: '12'},
                {title: '环境监测大屏', content: '/screen', key: '11'},
                {title: '库存大屏', content: '/stockScreen', key: '13'},
            ]
        }
    },
    'engineer': {
        department: '工程部',
        tasks: {
            "prod": [
                {title: '设备启动计划', content: '/ProduceManage/poweron', key: '4'},
                {title: '设备维保计划', content: '/ProduceManage/maintain', key: '5'},
                {title: '设备维修计划', content: '/ProduceManage/repaire', key: '9'},
            ],
            "board": [
                {title: '设备启动看板', content: '/mine/poweron', key: '15'},
                {title: '设备维修看板', content: '/mine/repaire', key: '16'},
                {title: '设备维护看板', content: '/mine/maintain', key: '17'},
            ],
            "screen": [
                {title: '设备管理大屏', content: '/screen', key: '14'},
            ]
        }
    },
    'qControl': {
        department: '品控',
        tasks: {
            "prod": [
                {title: '品控计划', content: '/ProduceManage/recvctrl', key: '1'},
            ],
            "information": [
                {title: '品控标准管理', content: '/QualityStandardIndex', key: '2'},
            ],
            "board": [
                {title: '品控看板', content: '/mine/recvctrl', key: '3'},
            ],
        }
    },
    'qInspection': {
        department: '检验',
        tasks: {
            "prod": [
                {title: '接货检验计划', content: '/ProduceManage/recvinsp', key: '1'},
                {title: '留样计划', content: '/ProduceManage/sample', key: '2'},
                {title: '检验追溯', content: '/qualityretrospect', key: '3'},
                {title: '第三方质检报告管理', content: '/qualityreport', key: '4'},
            ],
            "board": [
                {title: '检验检测看板', content: '/mine/recvinsp', key: '6'},
                {title: '留样看板', content: '/mine/sample', key: '5'},
            ],
        }
    },
    'hr': {
        department: '行政人事',
        tasks: {
            "information": [
                {title: '员工管理', content: '/PersonnelIndex', key: '8'},
                {title: '组织架构管理', content: '/OrganizationIndex', key: '3'},
                {title: '车间管理', content: '/WorkshopIndex', key: '4'},
                {title: '班组管理', content: '/TeamIndex', key: '5'},
            ],
            "prod": [
                {title: '岗位管理', content: '/peoplemanage', key: '6'},
                {title: '晨检', content: 'Content of Tab 2', key: '7'},
            ],
        }
    },
    'finance': {
        department: '财务部',
        tasks: {
            "information": [
                {title: '报损管理', content: '/FrmLossIndex', key: '6'},
                {title: '资产管理', content: '/AssetIndex', key: '5'},
                {title: '设备耗材管理', content: '/materialsManage', key: '8'},
            ],
            "prod": [
                {title: '发票开具', content: 'Content of Tab 3', key: '3'},
                {title: '成本管理', content: '/cost', key: '1'},
                {title: '凭证管理', content: '/VoucherIndex', key: '2'},
            ],
            "screen": [
                {title: '能源能耗大屏', content: '/screen', key: '13'},
            ]
        }
    },
    'dev': {
        department: '研发部',
        tasks: {
            "information": [
                {title: 'BOM管理', content: '/bom', key: '1'},
                {title: 'SKU管理', content: '/sku', key: '1'},
                {title: '工序管理', content: '/workprocedure', key: '2'},
                {title: '工艺管理', content: '/craft', key: '2'},
            ],
            "board": [
                {title: '补单看板', content: '/mine/supplement', key: '3'},
            ],
        }
    },
    'it': {
        department: '信息部',
        tasks: {
            "information": [
                {title: '角色管理', content: '/RoleIndex', key: '1'},
                {title: '用户管理', content: '/UserIndex', key: '2'},
                {title: '系统管理', content: 'Content of Tab 1', key: '3'},
            ],
        }
    },
    'management': {
        department: '企业管理事业部',
        tasks: {
            "prod": [
                {title: '绩效考评', content: '/perf', key: '1'},
                // {title: '工时绩效考评', content: '/groupHour', key: '1'},
                // {title: '在岗绩效考评', content: '/groupAttendance', key: '2'},
                // {title: '产出绩效考评', content: '/groupYield', key: '3'},
            ],
            "screen": [
                {title: '生产计划大屏', content: '/screen', key: '12'},
            ]
        }
    },
    'flow': {
        department: '天府智厨生产流程',
        tasks: {
            "information": [
                {title: '供应链事业部', content: '/workflow/supplyChain', key: '1'},
                {title: '营销事业部', content: '/workflow/sales', key: '1'},
                {title: '生产、工程部', content: '/workflow/processing', key: '1'},
                {title: '品控部', content: '/workflow/qControl', key: '1'},
                {title: '检验检测部', content: '/workflow/qInspection', key: '1'},
                {title: '财务部', content: '/workflow/finance', key: '1'},
                {title: '行政人事部', content: '/workflow/hr', key: '1'},
                {title: '研发部', content: '/workflow/dev', key: '1'},
                {title: '信息部', content: '/workflow/it', key: '1'},
                {title: '企事业管理部', content: '/workflow/management', key: '1'},
            ],
            "board": [],
            "screen": []
        }
    }
};

class WorkFlow extends PureComponent {
    newTabIndex = 0;
    state = {
        activeKey: '1',
        panes: initialPanes,
    };
    onChange = activeKey => {
        this.setState({activeKey});
    };
    onEdit = (targetKey, action) => {
        console.log(targetKey, action)
        if (action === 'add') { //创建
            this.setState({isModalTab: true});
        }
        this[action](targetKey); //增加Tab
    };
    add = () => {
        const {panes} = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        const newPanes = [...panes];
        newPanes.push({title: 'New Tab', content: '', key: activeKey});
        this.setState({
            panes: newPanes,
            activeKey,
        });
    };

    render() {
        const {panes} = this.state;
        // alert(model)
        return (
            <div className="work-flow-information">
                {
                    panes[model].tasks["erp"] ?
                        <div className="process-container">
                            <h2 className="common-title">{panes[model].department + ' - ERP'}</h2>
                            <Tabs activeKey='0' type="card" onChange={this.onChange} onEdit={this.onEdit}
                                  className="tabs-list">
                                {panes[model].tasks["erp"].map(task => (
                                    <TabPane closeIcon key={task.key} closable={task.closable}
                                             tab={<span><Link to={task.content}>{task.title}</Link></span>}/>
                                ))}
                            </Tabs>
                        </div>
                        : null
                }
                {
                    panes[model].tasks["prod"] ?
                        <div className="process-container">
                            <h2 className="common-title">{panes[model].department + ' - 生产过程管理'}</h2>
                            <Tabs activeKey='0' type="card" onChange={this.onChange} onEdit={this.onEdit}
                                  className="tabs-list">
                                {panes[model].tasks["prod"].map(task => (
                                    <TabPane closeIcon key={task.key} closable={task.closable}
                                             tab={<span><Link to={task.content}>{task.title}</Link></span>}/>
                                ))}
                            </Tabs>
                        </div>
                        : null
                }
                {
                    panes[model].tasks["information"] ?
                <div className="process-container">
                    <h2 className="common-title">{panes[model].department + ' - 基础数据管理'}</h2>
                    <Tabs activeKey='0' type="card" onChange={this.onChange} onEdit={this.onEdit}
                          className="tabs-list">
                        {panes[model].tasks["information"].map(task => (
                            <TabPane closeIcon key={task.key} closable={task.closable}
                                     tab={<span><Link to={task.content}>{task.title}</Link></span>}/>
                        ))}
                    </Tabs>
                </div>
                        : null
                }
                {
                    panes[model].tasks["board"] ?
                <div className="process-container">
                    <h2 className="common-title">{panes[model].department + ' - 生产看板'}</h2>
                    <Tabs activeKey='0' type="card" onChange={this.onChange} onEdit={this.onEdit}
                          className="tabs-list">
                        {panes[model].tasks["board"].map(task => (
                            <TabPane closeIcon key={task.key} closable={task.closable}
                                     tab={<span><Link to={task.content}>{task.title}</Link></span>}/>
                        ))}
                    </Tabs>
                </div>
                : null
                }
                {
                    panes[model].tasks["screen"] ?
                <div className="process-container">
                    <h2 className="common-title">{panes[model].department + ' - 生产大屏'}</h2>
                    <Tabs activeKey='0' type="card" onChange={this.onChange} onEdit={this.onEdit}
                          className="tabs-list">
                        {panes[model].tasks["screen"].map(task => (
                            <TabPane closeIcon key={task.key} closable={task.closable}
                                     tab={<span><Link to={task.content}>{task.title}</Link></span>}/>
                        ))}
                    </Tabs>
                </div>
                : null
                }

            </div>
        );
    }
}

export default WorkFlow;
