import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Input, Table, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './index.less';

const { Search } = Input;
const apiUrl = process.env.REACT_APP_API_URL;

class PeopleMange extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount(){
        fetch(`${apiUrl}/Employee`).then(async (response) => {
            if (response.ok) {
                let workData = await response.json();
                let data = [];
                workData.forEach((item, index) => {
                    let peopleInfo = {
                        key: index,
                        Name: item.Name,
                        Sex: item.Sex,
                        Team: item.Team,
                        EmployeePosition: item.EmployeePosition,
                    }
                    data.push(peopleInfo)
                })
                this.setState({data: data})
            }
        });
    }
    render() {
        return (
            <div className="container">
                <div className="search-container">
                    <Search placeholder="人员姓名"
                        prefix={<SearchOutlined />}
                        allowClear
                        enterButton="搜索" size="default" />
                </div>
                <div className="common-long-table">
                    <Table columns={columns} dataSource={this.state.data} />
                </div>
            </div>
        );
    }
}
const columns = [
    {
        align: 'center',
        title: '姓名',
        dataIndex: 'Name',
        key: 'Name',
        // render: text => <a>{text}</a>,
    },
    {
        align: 'center',
        title: '性别',
        dataIndex: 'Sex',
        key: 'Sex',
    },
    {
        align: 'center',
        title: '班组',
        dataIndex: 'Team',
        key: 'Team',
    },
    {
        align: 'center',
        title: '工种',
        dataIndex: 'EmployeePosition',
        key: 'EmployeePosition'
    },
    {
        align: 'center',
        title: '详细',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <Button className="common-btn-bg">修改工种</Button>
                {/*<button>删除</button>*/}
            </Space>
        ),
    },
];
export default connect()(PeopleMange);
