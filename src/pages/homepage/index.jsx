import React, {PureComponent} from 'react';
import {Tabs} from 'antd';
import './index.less';
import {Link} from "react-router-dom";

const model = 'flow'
const {TabPane} = Tabs;
const initialPanes = {
    'flow': {
        department: '天府智厨综合管控 - ',
        tasks: {
            "dayunhui": [
                {title: '菜单提交', content: '/unimenu', key: '1'},
                {title: '车辆人员提交', content: '/unibarcode', key: '2'},
                {title: '二维码获取', content: '/unibarcode', key: '3'},
                {title: '刷卡界面', content: '/unicardswipe', key: '15'},
            ],
            "information": [
                {title: '供应链事业部', content: '/workflow/supplyChain', key: '4'},
                {title: '营销事业部', content: '/workflow/sales', key: '5'},
                {title: '财务部', content: '/workflow/finance', key: '6'},
                {title: '行政人事部', content: '/workflow/hr', key: '7'},
                {title: '企事业管理部', content: '/workflow/management', key: '8'},
            ],
            "board": [
                {title: '生产部', content: '/workflow/processing', key: '9'},
                {title: '工程部', content: '/workflow/engineer', key: '10'},
                {title: '品控部', content: '/workflow/qControl', key: '11'},
                {title: '检验检测部', content: '/workflow/qInspection', key: '12'},
                {title: '信息部', content: '/workflow/it', key: '13'},
                {title: '研发部', content: '/workflow/dev', key: '14'},
            ],
        }
    }
};

class HomePage extends PureComponent {
    state = {
        activeKey: initialPanes[model].tasks["information"][0].key,
        panes: initialPanes,
    };
    render() {
        const {panes} = this.state;
        // alert(model)
        return (
            <div className="work-flow-information">
                <div className="process-container">
                    <h2 className="common-title">{panes[model].department + '大运会业务'}</h2>
                    <Tabs activeKey='0' type="card"
                          className="tabs-list">
                        {panes[model].tasks["dayunhui"].map(task => (
                            <TabPane closeIcon key={task.key} closable={task.closable}
                                     tab={<span><Link target={"_blank"} to={task.content}>{task.title}</Link></span>}/>
                        ))}
                    </Tabs>
                </div>
                <div className="process-container">
                    <h2 className="common-title">{panes[model].department + '综合管理'}</h2>
                    <Tabs activeKey='0' type="card"
                          className="tabs-list">
                        {panes[model].tasks["information"].map(task => (
                            <TabPane closeIcon key={task.key} closable={task.closable}
                                     tab={<span><Link target="_blank" to={task.content}>{task.title}</Link></span>}/>
                        ))}
                    </Tabs>
                </div>
                <div className="process-container">
                    <h2 className="common-title">{panes[model].department + '生产任务执行'}</h2>
                    <Tabs activeKey='0' type="card"
                          className="tabs-list">
                        {panes[model].tasks["board"].map(task => (
                            <TabPane closeIcon key={task.key} closable={task.closable}
                                     tab={<span><Link target={"_blank"} to={task.content}>{task.title}</Link></span>}/>
                        ))}
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default HomePage;
