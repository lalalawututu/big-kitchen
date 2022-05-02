import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";
import { useLocation } from 'react-router-dom';

const useRole = () => {
    let location = useLocation();
    let RoleId = location.state ? location.state.RoleId : '';
    const [roleDetail, setSupplierDetail] = useState([]);  //角色详情内容

    useEffect(() => {
        getRoleDetail(); //获取角色详情内容
    }, [])

    //获取角色详情内容
    function getRoleDetail() {
        fetch('GetRoleView?RoleId=' + RoleId).then(async (response) => {
            if (response.ok) {
                let res = await response.json();
                res.data.AccessPermissions = res.data.AccessPermissions ? res.data.AccessPermissions.split('#') : [];//访问权限
                res.data.EditPermissions = res.data.EditPermissions ? res.data.EditPermissions.split('#').join('、') : [];//基础修改权限
                var tag = res.data.EditPermissions.length ? '基础信息：' + res.data.EditPermissions : [];
                if (tag.length > 0) { res.data.AccessPermissions.push(tag) }
                setSupplierDetail(res.data)
            }
        })
    }
    return { roleDetail }
}

let RoleContainer = createContainer(useRole)
export default RoleContainer