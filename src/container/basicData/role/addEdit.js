import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";
import { useLocation, useNavigate } from 'react-router-dom';

const useRole = () => {
    let location = useLocation();
    let navigate = useNavigate();
    let RoleId = location.state ? location.state.RoleId : '';
    const [selectedTags, setSelectedTags] = useState(''); //访问权限
    const [selectedTags2, setSelectedTags2] = useState(''); //基础修改权限
    const [roleDetail, setSupplierDetail] = useState([]);  //角色详情内容

    let tagsData = ['生产', '质检', '追溯', '留样', '绩效', '设备', '能耗', '统计', '系统', '仓储', '物流', '成本'];
    let tagsData2 = ['车间', '工位', '生产线', '设备', '班组', '人员', '角色', '产品', '原料', '调料', '调理包', '包材', '耗材', '品牌', '供应商', '工艺', '质检标准'];

    useEffect(() => {
        getRoleDetail(); //获取角色详情内容
    }, [])

    //获取角色详情内容
    function getRoleDetail() {
        fetch('GetRoleView?RoleId=' + RoleId).then(async (response) => {
            if (response.ok) {
                let res = await response.json();
                setSupplierDetail(res.data)
                if(RoleId){
                    //访问权限
                    var nextSelectedTags=res.data.AccessPermissions?res.data.AccessPermissions.split('#'):[];
                    setSelectedTags(nextSelectedTags)
                    //基础信息权限
                    var nextSelectedTags2=res.data.EditPermissions?res.data.EditPermissions.split('#'):[];
                    setSelectedTags2(nextSelectedTags2)
                }
            }
        })
    }

    //保存接口
    function SaveOrUpdateRole(data) {
        data.AccessPermissions = selectedTags.join('#'); //访问权限
        data.EditPermissions = selectedTags2.join('#');//基础修改权限
        fetch('SaveOrUpdateRole', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(async (response) => {
            let res = await response.json();
            if (res.data.Code === '200') {
                navigate('/RoleIndex')
            }
        })
    }

    //保存操作
    const onFinish = (values) => {
        SaveOrUpdateRole(values);
    };

    //删除接口
    function DelRoleById() {
        fetch('DelRoleById', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ 'RoleId': RoleId })
        }).then(async (response) => {
            let res = await response.json();
            if (res.data.Code === '200') {
                navigate('/RoleIndex')
            }
        })
    }

    //设置访问权限工种的选择
    function handleChange(tag, checked) {
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        setSelectedTags(nextSelectedTags)
    }
    //基础信息维护权限工种的选择
    function handleChange2(tag, checked) {
        const nextSelectedTags = checked ? [...selectedTags2, tag] : selectedTags2.filter(t => t !== tag);
        setSelectedTags2(nextSelectedTags)
    }

    return { tagsData, selectedTags, tagsData2, selectedTags2, roleDetail, onFinish, DelRoleById, handleChange, handleChange2 }
}

let RoleContainer = createContainer(useRole)
export default RoleContainer