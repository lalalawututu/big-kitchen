import { useState } from 'react'
import { Table, Space, Button, Select, DatePicker, Modal } from 'antd';
import ozoneKill from "../../container/OzoneKill";
import './index.less'
const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

//搜索
function OptBtn() {
    return (
        <div className='KillOpt'>
            <div className='title'>时间范围:</div>
            <RangePicker
                className='field-date'
                format={dateFormat}
            />
            <div className='title' style={{ marginLeft: '0.5rem' }}>消杀楼层:</div>
            <Select
                placeholder="请选择"
                allowClear
                className='field-select'
                dropdownClassName='field-select-dropdown'
                dropdownMatchSelectWidth={false}
            >
                <Option value="一层车间">一层车间</Option>
                <Option value="二层车间">二层车间</Option>
                <Option value="三层车间">三层车间</Option>
            </Select>
            <Button type="primary" className='searchBtn'>查询</Button>
        </div>
    )
}


//表格
function TableFun() {
    let historyList = ozoneKill.useContainer();
    const [isModalVisible, setIsModalVisible] = useState(false)
    //隐藏消杀详情弹框
    const handleCancel = () => { setIsModalVisible(false) }

    const columns = [
        { title: '序号', align: 'center', width: 80, render: (text, record, index) => `${index + 1}` },
        { title: '楼层', dataIndex: 'Floor', key: 'Floor', ellipsis: true, align: 'center' },
        { title: '消杀日期', dataIndex: 'KillDate', key: 'KillDate', ellipsis: true, align: 'center' },
        { title: '开始时间', dataIndex: 'StartDate', key: 'StartDate', ellipsis: true, align: 'center' },
        { title: '结束时间', dataIndex: 'EndDate', key: 'EndDate', ellipsis: true, align: 'center' },
        { title: '状态', dataIndex: 'State', key: 'State', ellipsis: true, align: 'center' },
        { title: '用时', dataIndex: 'UseTime', key: 'UseTime', ellipsis: true, align: 'center' },
        {
            title: '详细', key: 'option', align: 'center', width: 180,
            render: (text, record) => (
                <Space size="middle">
                    <Button className="common-btn-bg" onClick={() => { setIsModalVisible(true) }}>查看</Button>
                </Space>
            ),
        },
    ]
    return (
        <div className='common-long-table'>
            <Table
                rowKey={record => record.key}
                columns={columns}
                dataSource={historyList.data}
            />

            {/* 查看详情弹框 */}
            <Modal title="消杀详情"
                width={600}
                centered
                visible={isModalVisible}
                okText="保存"
                cancelText="取消"
                className="add-mask"
                onCancel={handleCancel}>
                <div className="detail-list">
                    <p><span>楼层</span>一层</p>
                    <p><span>消杀日期</span>2022/01/04</p>
                    <p><span>开始时间</span>12:00</p>
                    <p><span>结束时间</span>14:00</p>
                    <p><span>状态</span>待执行</p>
                </div>
            </Modal>
        </div>
    )
}

export default function index() {
    return (
        <div className='OzoneKill container'>
            <OptBtn />
            <TableFun />
        </div>
    )
}
