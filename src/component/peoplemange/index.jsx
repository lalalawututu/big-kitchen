import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Input, Table, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './index.less';

const { Search } = Input;

class PeopleMange extends PureComponent {
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
                <Table columns={columns} dataSource={data} />
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
const data = [
    {
        key: '1',
        Name: '张三',
        Sex: '男',
        Team: '早班组',
        EmployeePosition: '分拣#切割#清洗#炖煮#放置',
    },
    {
        key: '2',
        Name: '李四',
        Sex: '女',
        Team: '晚班组',
        EmployeePosition: '分拣#切割#清洗#炖煮#放置',
    },
    {
        key: '3',
        Name: '赵五',
        Sex: '男',
        Team: '晚班组',
        EmployeePosition: '分拣#切割#清洗#炖煮#放置',
    },
];
export default connect()(PeopleMange);
