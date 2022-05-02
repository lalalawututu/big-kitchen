import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";
import request from '../../../net/api.js'

const useTeam = () => {
    const [tableData, setTableData] = useState([]);  //表格数据
    const [teamName, setTeamName] = useState(''); //搜索班组名称

    useEffect(() => {
        getTableData(); //获取班组管理列表数据
    }, [])

    //获取班组管理列表数据
    function getTableData() {
        setTableData([]); //清空数据
        fetch('GetTeamList?TeamName='+teamName).then(async (response) => {
            if(response.ok){
                let res = await response.json();
                setTableData(res.data.List)
            }
        })
    }

    //查询条件
    function searchInfo(event) {
        setTeamName(event)
    }

    //搜索查询
    function searchOpt() {
        getTableData();
    }

    return { tableData, teamName, searchInfo, searchOpt }
}

let TeamContainer = createContainer(useTeam)
export default TeamContainer