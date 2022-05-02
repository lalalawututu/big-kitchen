import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";
import request from '../../../net/api.js'
import {Sync_Server} from "../../../common";

const useSupplier = () => {
    const [tableData, setTableData] = useState([]);  //表格数据
    const [Name, setName] = useState(''); //搜索人员姓名
    const [isModalVisible, setIsModalVisible] = useState(false); //修改工种
    const [selectedTags, setSelectedTags] = useState(''); //选中的工种
    const [EmployeeId, setEmployeeId] = useState(''); //操作的人员id
    let tagsData = ['浸泡', '清洗', '去皮', '分拣', '切割', '消毒', '沥水', '去毛', '搅拌', '速冻', '凉拌', '解冻', '放置', '滚揉', '留样', '包装'];
    const getDataFromBlockchain = Sync_Server + "/data/blockchain?model="

    useEffect(() => {
        getTableData(); //获取供应商管理列表数据
    }, [])

    //获取员工列表数据
    function getTableData() {
        let url = getDataFromBlockchain + "employees"
        fetch(`${url}`).then(async (response) => {
            if (response.ok) {
                let dataJson = await response.json()
                console.log(dataJson.content)
                let planList = JSON.parse(dataJson.content)
                // console.log(planList)
                let data = []
                planList.forEach((item, index) => {
                    let panInfo = {
                        key: item.employee_id,
                        id: item.employee_id,
                        Name: item.name,
                        Sex: item.gender,
                        Team: item.team,
                        EmployeePosition: item.main_position,
                    }
                    data.push(panInfo)
                })
                setTableData(data)
            }
        })
    }

    //查询条件
    function searchInfo(event) {
        setName(event)
    }

    //搜索查询
    function searchOpt() {
        getTableData();
    }

    //修改工种确认接口
    function handleOk() {
        request.basicPersonnel.getUpdateEmployeePosition(EmployeeId, {
            body: JSON.stringify({ 'employeePosition': selectedTags.join('#') }) //此处后台接受不到主体内的内容
        }).then((res) => {
            setIsModalVisible(false);
            getTableData(); //获取供应商管理列表数据
        })
    };

    //工种的选择
    function handleChange(tag, checked) {
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        setSelectedTags(nextSelectedTags)
    }

    return { tableData, Name, isModalVisible, tagsData, selectedTags, searchInfo, searchOpt, handleOk, handleChange }
}

let SupplierContainer = createContainer(useSupplier)
export default SupplierContainer
