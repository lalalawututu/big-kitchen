import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";
import {useMount} from "../../../utils";
import {Sync_Server} from "../../../common";

const getDataFromBlockchain = Sync_Server + "/data/blockchain?model="

const useQuality = () => {
    const [tableData, setTableData] = useState([]);  //表格数据
    const [standardName, setStandardName] = useState(''); //搜索质检标准名称

    useMount(() => {
        getTableData(); //获取质检标准列表数据
    })

    useEffect(() => {
        getTableData(); //获取质检标准列表数据
    }, [])

    //获取质检标准列表数据
    function getTableData() {
        let url = getDataFromBlockchain + "spec"
        fetch(`${url}`).then(async (response) => {
            if (response.ok) {
                let dataJson = await response.json()
                console.log(dataJson.content)
                let planList = JSON.parse(dataJson.content)
                // console.log(planList)
                let data = []
                planList.standards.forEach((item, index) => {
                    let panInfo = {
                        key: item.standard_id,
                        StandardId: item.standard_id,
                        StandardName: item.standard_name,
                        System: item.system,
                        StandardDescription: item.standard_description,
                        problems: item.problems,
                    }
                    data.push(panInfo)
                })
                setTableData(data)
            }
        })
    }

    //查询条件
    function searchInfo(event) {
      setStandardName(event)
    }

    //搜索查询
    function searchOpt() {
        getTableData();
    }

    return { tableData, standardName, searchInfo, searchOpt }
}

let QualityContainer = createContainer(useQuality)
export default QualityContainer
