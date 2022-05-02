import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";

const useBrand = () => {
    const [tableData, setTableData] = useState([]);  //表格数据
    const [brandName, setBrandName] = useState(''); //搜索供货商姓名

    useEffect(() => {
        getTableData(); //获取供应商管理列表数据
    }, [])

    //获取供应商管理列表数据
    function getTableData() {
        setTableData([]); //清空数据
        fetch('GetBrandList?BrandName='+brandName).then(async (response) => {
            if(response.ok){
                let res = await response.json();
                setTableData(res.data.List)
            }
        })
    }

    //查询条件
    function searchInfo(event) {
        setBrandName(event)
    }

    //搜索查询
    function searchOpt() {
        getTableData();
    }

    return { tableData, brandName, searchInfo, searchOpt }
}

let BrandContainer = createContainer(useBrand)
export default BrandContainer