import { Table, Descriptions } from 'antd';
import DistributionContainer from '@/container/distribution/detail';

//配送详情
function DistributionDetail() {
    return (
        <div className='work-information'>
            <div className='basic-info bg-fff'>
                <h2 className="common-title">基本信息：</h2>
                <Descriptions size={'default'} column={5} className="descriptions-basic">
                    <Descriptions.Item label="运单编号">12548</Descriptions.Item>
                    <Descriptions.Item label="客户名称">国务院办公厅</Descriptions.Item>
                    <Descriptions.Item label="车牌号">川A88888</Descriptions.Item>
                    <Descriptions.Item label="运单状态">配送中</Descriptions.Item>
                    <Descriptions.Item label="车辆状态">正常</Descriptions.Item>
                </Descriptions>
            </div>
            <div className="common-long-table bg-fff">
                <h2 className="common-title">车辆轨迹</h2>
                <Descriptions size={'default'} column={5} className="descriptions-basic">
                    <Descriptions.Item label="车辆轨迹"></Descriptions.Item>
                </Descriptions>
            </div>

            <TableFun />

        </div>
    )
}

//表格
function TableFun() {
    let distribution = DistributionContainer.useContainer();

    const columns = [
        { title: '时间', dataIndex: 'Time', key: 'Time', width: 200 },
        { title: '接收人', dataIndex: 'Receiver', key: 'Receiver', width: 200 },
        { title: '产品', dataIndex: 'Product', key: 'Product' },
    ]

    return (
        <div className='common-long-table'>
            <h2 className="common-title">工艺修改日志</h2>
            <Table
                rowKey={record => record.key}
                columns={columns}
                dataSource={distribution.data}
            />
        </div >
    )
}

export default function detail() {
    return (
        <div className='supplierIndex'>
            <DistributionDetail />
        </div >
    )
}
