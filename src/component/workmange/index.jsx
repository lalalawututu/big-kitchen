import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Input, Table, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './index.less';

const { Search } = Input;
const columns = [
    {
        align: 'center',
        dataIndex: 'text1',
        key: 'text1',
        render: text => <span>工艺名称：<strong>{text}</strong></span>,
    },
    {
        align: 'center',
        dataIndex: 'text2',
        key: 'text2',
        render: text => <span>产成品：<strong>{text}</strong></span>,
    },
    {
        align: 'center',
        dataIndex: 'text3',
        key: 'text3',
        render: text => <span>对应生产线：<strong>{text}</strong></span>,
    },
    {
        align: 'center',
        dataIndex: 'number1',
        key: 'number1',
        render: text => <span>工人数量：<strong className="cyan">{text}</strong></span>,
    },
    {
        align: 'center',
        dataIndex: 'number2',
        key: 'number2',
        render: text => <span>工序数量：<strong className="purple">{text}</strong></span>,
    },
    {
        align: 'center',
        dataIndex: 'number3',
        key: 'number3',
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
const data = [
    {
        key: '1',
        text1: '凉拌土豆丝',
        text2: '凉拌土豆丝',
        text3: '凉拌土豆丝',
        number1: '3',
        number2: '3',
        number3: '3',
    },
    {
        key: '2',
        text1: '凉拌土豆丝',
        text2: '凉拌土豆丝',
        text3: '凉拌土豆丝',
        number1: '3',
        number2: '3',
        number3: '3',
    },
];
class WorkMange extends PureComponent {
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
            <Table columns={columns} dataSource={data} />
        </div>
      </div>
    );
  }
}

export default connect()(WorkMange);

