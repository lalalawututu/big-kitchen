import { use } from 'echarts';
import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";
import {Sync_Server} from "../../common";

const useSupplier = () => {
    const [tableData, setTableData] = useState([]);  //表格数据
    const [brandName, setBrandName] = useState(''); //搜索供货商姓名
  

    useEffect(() => {
        getTableData(); //获取供应商管理列表数据
    }, [])

    //获取供应商管理列表数据
    function getTableData() {
        setTableData([]); //清空数据
        let url = Sync_Server + "/meta/contracts"
        fetch(`${url}`).then(async (response) => {
            if (response.ok) {
                let dataJson = await response.json()
                console.log(dataJson,'dataJson')
                // let planList = JSON.parse(dataJson.content)
                // // console.log(planList)
                // let data = []
                // planList.employee.forEach((item, index) => {
                //     let panInfo = {
                //         key: item.employeeId,
                //         id: item.employeeId,
                //         EmployeePosition: item.positionalTitles,
                //     }
                //     data.push(panInfo)
                // })
                // this.setState({ data: data })
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

    return { tableData, brandName,searchInfo, searchOpt }
}

let SupplierContainer = createContainer(useSupplier)
export default SupplierContainer
