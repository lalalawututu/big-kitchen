import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Input, Table, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './index.less';
import { actionCreatorsMine } from './store';

const apiUrl = process.env.REACT_APP_API_URL;
const { Search } = Input;


class WorkMange extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount(){
        fetch(`${apiUrl}/Workmanship`).then(async (response) => {
            if (response.ok) {
                let workData = await response.json();
                let data = [];
                workData.forEach((item, index) => {
                    let workInfor = {
                        key: index,
                        WorkmanshipName: item.WorkmanshipName,
                        FinishedProduct: item.FinishedProduct,
                        ProductionLineName: item.ProductionLineName,
                        workerNumber: item.workerNumber,
                        WorkerQuantity: item.WorkerQuantity,
                        WorkingHours: item.WorkingTotalHours
                    }
                    data.push(workInfor)
                })
                this.setState({data: data})
            }
        });
    }
    render() {
        return (
            <div className="container">
                <div className="search-container">
                    <Search placeholder="工艺名称、产成品、生产线"
                        prefix={<SearchOutlined />}
                        allowClear
                        enterButton="搜索" size="default" />
                </div>
                <div className="table-no-header">
                    <Table columns={columns} dataSource={this.state.data} />
                </div>
            </div>
        );
    }
}

const columns = [
    {
        align: 'center',
        dataIndex: 'WorkmanshipName',
        key: 'WorkmanshipName',
        render: text => <span>工艺名称：<strong>{text}</strong></span>,
    },
    {
        align: 'center',
        dataIndex: 'FinishedProduct',
        key: 'FinishedProduct',
        render: text => <span>产成品：<strong>{text}</strong></span>,
    },
    {
        align: 'center',
        dataIndex: 'ProductionLineName',
        key: 'ProductionLineName',
        render: text => <span>对应生产线：<strong>{text}</strong></span>,
    },
    {
        align: 'center',
        dataIndex: 'workerNumber',
        key: 'workerNumber',
        render: text => <span>工人数量：<strong className="cyan">{text}</strong></span>,
    },
    {
        align: 'center',
        dataIndex: 'WorkerQuantity',
        key: 'WorkerQuantity',
        render: text => <span>工序数量：<strong className="purple">{text}</strong></span>,
    },
    {
        align: 'center',
        dataIndex: 'WorkingHours',
        key: 'WorkingHours',
        render: text => <span>工艺总用时：<strong className="red">{text}</strong></span>,
    },
    {
        align: 'center',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <Button className="common-btn-bg">查看</Button>
            </Space>
        ),
    },
];

export default connect()(WorkMange);

