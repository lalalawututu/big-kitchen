import React from 'react'
import { Table, Button, Space, Breadcrumb, Rate, Modal } from 'antd';
import './index.less'
import SupplierContainer from '../../../container/basicData/supplier/index'
import { SearchBanner } from '../../../components/searchContentOr'
import history from '../../../history'
// import {Breadcrumb} from "antd/lib/breadcrumb";

//表格
function TableFun() {
    let supplier = SupplierContainer.useContainer();
    //const data = supplier.tableData || [];
    const columns = [
        {
            title: '供应商ID',
            dataIndex: 'supplier_id',
            key: 'supplier_id',
            ellipsis: true,
            align: 'center',
        },
        {
            title: '供应商名称',
            dataIndex: 'supplier_name',
            key: 'supplier_name',
            ellipsis: true,
            align: 'center',
        },
        {
            title: '联系人',
            dataIndex: 'linkman',
            key: 'linkman',
            ellipsis: true,
            align: 'center',
        },
        {
            title: '联系电话',
            dataIndex: 'phone',
            key: 'phone',
            ellipsis: true,
            align: 'center',
        },
        {
            title: '评级分数',
            dataIndex: 'score',
            key: 'score',
            ellipsis: true,
            align: 'center',
            render: (text, record) => (
                <Space size="middle" style={{"cursor": "pointer"}} onClick={() => supplier.setModalVisible(true)}>
                    <Rate disabled allowHalf defaultValue={2.5} style={{'color': '#6C6CE5',"cursor": "pointer"}} />
                </Space>
            ),
        },
    ];
    const data = [
        {
            supplier_id: 'GYS23423423',
            supplier_name: '成都承传设备有限公司',
            linkman: '刘科',
            phone: '13999898765',
        },
    ];
    return (
        <div className='common-long-table'>
            <Table
                rowKey={record => record.SupplierId}
                columns={columns}
                dataSource={data}
            />
        </div>
    )
}

//搜索
function SearchFun() {
    let supplier = SupplierContainer.useContainer();
    const create = () => {
        history.push(`/supplierAdd`);
    }
    return (
        <div className="">
            <SearchBanner initialData={supplier.iniTableData} setData={supplier.setTableData} searchKeys={['supplier_name', 'linkman']}/>
        </div>
    )
}

//查看弹框
function ModalDetail() {
    let supplier = SupplierContainer.useContainer();
    return (
        <Modal
            className="add-mask common-mask"
            title="供应商评级"
            visible={supplier.modalVisible}
            onCancel={() => supplier.setModalVisible(false)}
            footer={null}
            // footer={[
            //     <Button key="back" className="none-btn" onClick={() => supplier.setModalVisible(false)}>关闭</Button>
            // ]}
        >
            <div className='score-mask-container'>
                <h4 className="name">成都承传设备有限公司</h4>
                <div className="list">
                    <div className="stars">
                        <span className="title">评级分数</span>
                        <Rate disabled allowHalf defaultValue={4.5} style={{'color': '#6C6CE5'}} />
                    </div>
                    <div className="stars">
                        <span className="title">准时率</span>
                        <Rate disabled allowHalf defaultValue={4.5} style={{'color': '#6C6CE5'}} />
                    </div>
                    <div className="stars">
                        <span className="title">良品率</span>
                        <Rate disabled allowHalf defaultValue={4.5} style={{'color': '#6C6CE5'}} />
                    </div>
                    <div className="stars">
                        <span className="title">合格率</span>
                        <Rate disabled allowHalf defaultValue={4.5} style={{'color': '#6C6CE5'}} />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default function Estimate() {
    return (
        <div className='supplierIndex container'>
            <SupplierContainer.Provider>
                <div className='crumbHeader'>
                    <Breadcrumb separator="<">
                        <Breadcrumb.Item style={{ 'color': '#333951' }}>供应商评级</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className='optBtn'>
                        <div className='title'>添加资产</div>
                        <img src={require('../../../style/img/icon/icon-craftAdd.png')} alt="" />
                    </div>
                </div>
                <SearchFun />
                <TableFun />
                <ModalDetail />
            </SupplierContainer.Provider>
        </div >
    )
}
