import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";

const useWorkshop = () => {
    const [tableData, setTableData] = useState([]);  //表格数据
    const [workShopName, setWorkShopName] = useState(''); //搜索车间名称

    useEffect(() => {
        getTableData(); //获取车间管理列表
    }, [])

    //获取车间管理列表
    function getTableData() {
        setTableData([]); //清空数据
        fetch('GetWorkShopList?WorkShopName='+workShopName).then(async (response) => {
            if(response.ok){
                let res = await response.json();
                setTableData(res.data.List)
            }
        })
    }
   
    //查询条件
    function searchInfo(event) {
        setWorkShopName(event)
    }

    //搜索查询
    function searchOpt() {
        getTableData();
    }

    return { tableData, workShopName, searchInfo, searchOpt }
}

let WorkshopContainer = createContainer(useWorkshop)
export default WorkshopContainer