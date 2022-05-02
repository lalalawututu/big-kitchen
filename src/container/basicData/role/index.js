import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";

const useRole = () => {
    const [tableData, setTableData] = useState([]);  //表格数据
    const [deptName, setDeptName] = useState(''); //搜索供货商姓名

    useEffect(() => {
        getTableData(); //获取供应商管理列表数据
    }, [])

    //获取供应商管理列表数据
    function getTableData() {
        setTableData([]); //清空数据
        fetch('GetRoleList?DeptName='+deptName).then(async (response) => {
            if(response.ok){
                let res = await response.json();
                var data = res.data.List;
                for (var i = 0; i < data.length; i++) {
                    var AccessPermissions = data[i].AccessPermissions ? data[i].AccessPermissions.split('#') : []
                    var EditPermissions = data[i].EditPermissions ? '基础信息：' + data[i].EditPermissions.split('#').join('、') : ''

                    if (EditPermissions) {
                        AccessPermissions.push(EditPermissions)
                    }
                    data[i]['Power'] = AccessPermissions
                }
                setTableData(data)
            }
        })
    }

    //查询条件
    function searchInfo(event) {
        setDeptName(event)
    }

    //搜索查询
    function searchOpt() {
        getTableData();
    }

    return { tableData, deptName, searchInfo, searchOpt }
}

let RoleContainer = createContainer(useRole)
export default RoleContainer