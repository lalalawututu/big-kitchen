import React, { PureComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Space } from 'antd';
import { useMount } from '../../utils/index.ts';
import './index.less';
import { actionCreatorsMine } from './store';
import history from '../../history';
import { SearchBanner } from '../searchbanner/index.tsx';

const apiUrl = process.env.REACT_APP_API_URL;

export const WorkMange = () => {
    const [initialData, setInitialData] = useState([]);
    const [data, setData] = useState([]);
    const workInfo = (text) => {
        history.push(`/workinformation/?workmanshipId=${text.WorkmanshipId}`);
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
                    <Button className="common-btn-bg" onClick={() => workInfo(text)}>查看</Button>
                </Space>
            ),
        },
    ];

    useMount(() => {
        fetch(`${apiUrl}/GetWorkmanshipList`).then(async (response) => {
            if (response.ok) {
                let dataJson = await response.json();
                let workData = dataJson.workmanship;
                let data = [];
                workData.forEach((item, index) => {
                    let WorkingHours = 0;
                    let WorkerQuantity = 0;
                    let WorkNumber = 0;
                    if (item.WorkingProcedure !== null) {
                        WorkNumber = item.WorkingProcedure.length;
                    }
                    if (item.WorkingProcedure !== null) {
                        let WorkingProcedure = item.WorkingProcedure;
                        WorkingProcedure.forEach((item, index) => {
                            WorkingHours += item.WorkingHours
                            WorkerQuantity += item.WorkerQuantity
                        })
                    }
                    let workInfor = {
                        key: index,
                        WorkmanshipId: item.WorkmanshipId,
                        WorkmanshipName: item.WorkmanshipName,
                        FinishedProduct: item.FinishedProduct,
                        ProductionLineName: item.ProductionLineName,
                        workerNumber: WorkerQuantity,
                        WorkerQuantity: WorkNumber,
                        WorkingHours: WorkingHours
                    }
                    data.push(workInfor);
                });
                setInitialData(data);
                setData(data);
            }
        });
    })

    return (
        <div className="container">
            <SearchBanner initialData={initialData} setData={setData}/>
            <div className="table-no-header">
                <Table columns={columns} dataSource={data}/>
            </div>
        </div>
    )

}
