import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";
import request from '@/net/api.js'

const useSupplier = () => {
    const [personnelDetail, setPersonnelDetail] = useState([]);  //人员管理详情内容
    const [selectedTags, setSelectedTags] = useState(''); //选中的工种
    let tagsData = ['浸泡', '清洗', '去皮', '分拣', '切割', '消毒', '沥水', '去毛', '搅拌', '速冻', '凉拌', '解冻', '放置', '滚揉', '留样', '包装'];

    useEffect(() => {
        getPeopleDetail(); //获取人员管理详情内容
    }, [])

    //获取人员管理详情内容
    function getPeopleDetail() {
        fetch('GetEmployee/YG_01010001').then(async (response) => {
            if (response.ok) {
                let res = await response.json();
                setPersonnelDetail(res.Employee)
            }
        })
    }

    //保存接口
    function SaveOrUpdateSupplier(data) {
        data.EmployeePosition = selectedTags.join('#')
        request.basicPersonnel.getSaveOrUpdateEmployee(data).then((res) => {
            console.log(res)
        })
    }

    //保存操作
    const onFinish = (values) => {
        SaveOrUpdateSupplier(values);
    };

    //删除接口
    function DelEmployeeById() {
        request.basicPersonnel.getDelEmployeeById({ EmployeeId: 'c8k5n0ivkvf42u5eqrcg' }).then((res) => {
            console.log(res)
        })
    }

    //工种的选择
    function handleChange(tag, checked) {
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        setSelectedTags(nextSelectedTags)
    }

    return { personnelDetail, selectedTags, tagsData, onFinish, DelEmployeeById, handleChange }
}

let SupplierContainer = createContainer(useSupplier)
export default SupplierContainer