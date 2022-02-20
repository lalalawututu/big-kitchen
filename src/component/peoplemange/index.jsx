import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Input, Table, Button, Space, Modal, Tag } from 'antd';
import { SearchOutlined, DiffOutlined } from '@ant-design/icons';
import './index.less';

const { Search } = Input;
const { CheckableTag } = Tag;
const tagsData = ['浸泡', '清洗', '去皮', '分拣', '切割', '消毒', '沥水', '去毛', '搅拌', '速冻', '凉拌', '解冻', '放置', '滚揉', '留样', '包装'];

const apiUrl = process.env.REACT_APP_API_URL;

class PeopleMange extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isModalVisible: false,
            selectedTags: ['浸泡'],
        }
    }

    componentDidMount() {
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
                        EmployeePosition: item.EmployeePosition
                    }
                    data.push(peopleInfo)
                })
                this.setState({ data: data })
            }
        });
    }

    handleChange(tag, checked) {
        const { selectedTags } = this.state;
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        this.setState({ selectedTags: nextSelectedTags });
    }

    render() {
        const showModal = () => {
            this.setState({ isModalVisible: true });
        };

        const handleOk = () => {
            this.setState({ isModalVisible: false });
        };

        const handleCancel = () => {
            this.setState({ isModalVisible: false });
        };

        const { selectedTags } = this.state;
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
                        <Button className="common-btn-bg" onClick={showModal}>修改工种</Button>
                        {/*<button>删除</button>*/}
                    </Space>
                ),
            },
        ];

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

                <Modal title="修改工种"
                       width={600}
                       centered
                       visible={this.state.isModalVisible}
                       okText="确定"
                       cancelText="取消"
                       className="add-mask"
                       onOk={handleOk} onCancel={handleCancel}>
                    <div className="tags-type-box">
                        {tagsData.map(tag => (
                            <CheckableTag
                                key={tag}
                                checked={selectedTags.indexOf(tag) > -1}
                                onChange={checked => this.handleChange(tag, checked)}
                            >
                                {tag}
                            </CheckableTag>
                        ))}
                    </div>
                </Modal>
            </div>
        );
    }
}

export default connect()(PeopleMange);
