import { useState } from 'react'
import { createContainer } from "unstated-next"
import { useMount } from '../../utils'

const useList = () => {
    const [data, setData] = useState([]); //表格数据
    const [inspectorDetail, setInspectorDetail] = useState({});// 查看详情内容
    const [modalVisible, setModalVisible] = useState(false); //查看弹框

    useMount(() => {
        const data = [
            {
                key: '1',
                id: '1',
                taskNumber: 'RW20220105001',  //任务编号
                testContent: '进货土豆品质检验', //检验内容
                testType: '原材料检验', //检验类型
                testRequire: '进货土豆尺寸、外观检验', //质检要求
                planStartTime: '2022/01/02 22:38:00', //任务计划开始时间
                planEndTime: '2022/01/03 22:48:00',  //任务计划完成时间
                executionStartTime: '2022/01/02 22:38:00', //任务执行开始时间
                executionEndTime: '2022/01/02 22:38:00', //任务执行结束时间
                executionStatus: 0,  //执行状态 0:已完成 1：进行中  2：待执行
                isTimeout: 0,  //是否超时 0:是  1:否
                QualifiedRate: '98.82%', //合格率
                inspector: '张三', //检验人
            },
            {
                key: '2',
                id: '2',
                taskNumber: 'RW20220105001',
                testContent: '进货土豆品质检验',
                testType: '原材料检验',
                testRequire: '进货土豆尺寸、外观检验',
                planStartTime: '2022/01/02 22:38:00',
                planEndTime: '2022/01/03 22:48:00',
                executionStartTime: '2022/01/02 22:38:00', //任务执行开始时间
                executionEndTime: '2022/01/02 22:38:00', //任务执行结束时间
                executionStatus: 1,  //执行状态 0:已完成 1：进行中  2：待执行
                isTimeout: 1,  //是否超时 0:是  1:否
                QualifiedRate: '98.82%', //合格率
                inspector: '张三',
            },
            {
                key: '3',
                taskNumber: 'RW20220105001',
                testContent: '进货土豆品质检验',
                testType: '原材料检验',
                testRequire: '进货土豆尺寸、外观检验',
                planStartTime: '2022/01/02 22:38:00',
                planEndTime: '2022/01/03 22:48:00',
                executionStartTime: '2022/01/02 22:38:00', //任务执行开始时间
                executionEndTime: '2022/01/02 22:38:00', //任务执行结束时间
                executionStatus: 2,  //执行状态 0:已完成 1：进行中  2：待执行
                isTimeout: 0,  //是否超时 0:是  1:否
                QualifiedRate: '98.82%', //合格率
                inspector: '张三',
            },
            {
                key: '4',
                taskNumber: 'RW20220105001',
                testContent: '进货土豆品质检验',
                testType: '原材料检验',
                testRequire: '进货土豆尺寸、外观检验',
                planStartTime: '2022/01/02 22:38:00',
                planEndTime: '2022/01/03 22:48:00',
                executionStartTime: '2022/01/02 22:38:00', //任务执行开始时间
                executionEndTime: '2022/01/02 22:38:00', //任务执行结束时间
                executionStatus: 0,  //执行状态 0:已完成 1：进行中  2：待执行
                isTimeout: 0,  //是否超时 0:是  1:否
                QualifiedRate: '98.82%', //合格率
                inspector: '张三',
            },
            {
                key: '5',
                taskNumber: 'RW20220105001',
                testContent: '进货土豆品质检验',
                testType: '原材料检验',
                testRequire: '进货土豆尺寸、外观检验',
                planStartTime: '2022/01/02 22:38:00',
                planEndTime: '2022/01/03 22:48:00',
                executionStartTime: '2022/01/02 22:38:00', //任务执行开始时间
                executionEndTime: '2022/01/02 22:38:00', //任务执行结束时间
                executionStatus: 0,  //执行状态 0:已完成 1：进行中  2：待执行
                isTimeout: 0,  //是否超时 0:是  1:否
                QualifiedRate: '98.82%', //合格率
                inspector: '张三',
            },
            {
                key: '6',
                taskNumber: 'RW20220105001',
                testContent: '进货土豆品质检验',
                testType: '原材料检验',
                testRequire: '进货土豆尺寸、外观检验',
                planStartTime: '2022/01/02 22:38:00',
                planEndTime: '2022/01/03 22:48:00',
                executionStartTime: '2022/01/02 22:38:00', //任务执行开始时间
                executionEndTime: '2022/01/02 22:38:00', //任务执行结束时间
                executionStatus: 0,  //执行状态 0:已完成 1：进行中  2：待执行
                isTimeout: 0,  //是否超时 0:是  1:否
                QualifiedRate: '98.82%', //合格率
                inspector: '张三',
            },

        ]
        const detail = {
            taskNumber: 'RW20220105001',  //任务编号
            testContent: '进货土豆品质检验',  //检验内容
            testType: '原材料检验', //检验类型
            testRequire: '进货土豆尺寸、外观检验',  //质检要求
            planStartTime: '2022/01/02', //任务计划开始时间
            planEndTime: '2022/01/03',  //任务计划完成时间
            executionStartTime: '2022/01/02', //任务执行开始时间
            executionEndTime: '2022/01/02', //任务执行结束时间
            executionStatus: 1,  //执行状态 0:已完成 1：进行中  2：待执行
            isTimeout: 1,  //是否超时 0:是  1:否
            QuantityNumber: '10吨',//检验数量
            QualifiedNumber: '9.8吨', //合格数量
            QuantityDetail: '',//质检详情
            inspectorList: [
                {
                    inspectorId: '1',
                    inspectorName: '张三'
                },
                {
                    inspectorId: '2',
                    inspectorName: '王五'
                }
            ]
        }
        setData(data)
        setInspectorDetail(detail)
    })

    return { data, inspectorDetail, modalVisible, setModalVisible }
}

let voucherContainer = createContainer(useList)
export default voucherContainer