import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Input, Table, Button, Space, Modal, Tag } from 'antd';
import { SearchOutlined, DiffOutlined } from '@ant-design/icons';
import axios from 'axios';
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
            selectedTags: [],
            EmployeeId: '',
        }
    }

    componentDidMount() {
        fetch(`getEmployeeList`).then(async (response) => {
            if (response.ok) {
                let workData = await response.json();
                console.log(workData,'getEmployeeList')
                let data = [];
                workData.Employees.forEach((item, index) => {
                    let peopleInfo = {
                        id: item.EmployeeId,
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

        // fetch(`${apiUrl}/Employee`).then(async (response) => {
        //     if (response.ok) {
        //         let workData = await response.json();
        //         let data = [];
        //         workData.forEach((item, index) => {
        //             let peopleInfo = {
        //                 id: item.id,
        //                 key: index,
        //                 Name: item.Name,
        //                 Sex: item.Sex,
        //                 Team: item.Team,
        //                 EmployeePosition: item.EmployeePosition
        //             }
        //             data.push(peopleInfo)
        //         })
        //         this.setState({ data: data })
        //     }
        // });
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
                    let res = await response.json();
                    window.location.reload();
                }
            })
            // fetch(`${apiUrl}/Employee/${peopleId}`).then(async (response) => {
            //     let peopleData = await response.json();
            //     peopleData["EmployeePosition"] = tagsStr;
            //     await axios.put(`${apiUrl}/Employee/${peopleId}`, peopleData)
            //         .then(function (response) {
            //             window.location.reload();
            //         })
            //         .catch(function (error) {
            //             console.log(error);
            //         });
            // })
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

export default connect()(PeopleMange);
