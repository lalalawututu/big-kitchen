import React, { PureComponent } from 'react';
import { Input, Table, Button, Space, Modal, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './index.less';
import {Sync_Server} from "../../common";

const { Search } = Input;
const { CheckableTag } = Tag;
const tagsData = ['浸泡', '清洗', '去皮', '分拣', '切割', '消毒', '沥水', '去毛', '搅拌', '速冻', '凉拌', '解冻', '放置', '滚揉', '留样', '包装'];
const getDataFromBlockchain = Sync_Server + "/data/blockchain?model="

class PeopleManage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isModalVisible: false,
            selectedTags: [],
            EmployeeId: '',
        }
    }

    componentDidMount() {
        let url = getDataFromBlockchain + "ejobs"
        fetch(`${url}`).then(async (response) => {
            if (response.ok) {
                let dataJson = await response.json()
                console.log(dataJson.content)
                let planList = JSON.parse(dataJson.content)
                // console.log(planList)
                let data = []
                planList.employee.forEach((item, index) => {
                    let panInfo = {
                        key: item.employeeId,
                        id: item.employeeId,
                        EmployeePosition: item.positionalTitles,
                    }
                    data.push(panInfo)
                })
                this.setState({ data: data })
            }
        })
    }

    handleChange(tag, checked) {
        const { selectedTags } = this.state;
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        this.setState({ selectedTags: nextSelectedTags });
    }

    render() {
        const showModal = (text) => {
            console.log(text)
            this.setState({
                isModalVisible: true,
                EmployeeId: text.id,
            });
        };

        const handleOk = () => {
            let tagsArr = this.state.selectedTags;
            let tagsStr = tagsArr.join('#');
            let peopleId = this.state.EmployeeId;

            this.setState({
                isModalVisible: false,
                selectedTags: [],
                EmployeeId: ''
            });

            fetch('UpdateEmployeePosition/'+peopleId, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({'employeePosition':tagsStr})
            }).then(async (response) => {
                if (response.ok) {
                    // let res = await response.json();
                    window.location.reload();
                }
            })
        };

        const handleCancel = () => {
            this.setState({ isModalVisible: false });
        };

        const { selectedTags } = this.state;
        const columns = [
            {
                align: 'center',
                title: '员工ID',
                dataIndex: 'id',
                key: 'id',
                // render: text => <a>{text}</a>,
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
                        <Button className="common-btn-bg" onClick={() => showModal(text)}>修改工种</Button>
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

export default PeopleManage;
