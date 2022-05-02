import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";
import request from '@/net/api.js'

const useEnergy = () => {
    const [waterList, setWaterList] = useState([]); //水

    useEffect(() => {
        getData(); //获取数据
    }, [])

    //获取数据
    function getData() {
        request.energy.getEnergyConsumeMonitor().then((res) => {
            console.log(res, 888)
            if (res.data.Code === '200') {

            }
        })
    }


    //查询条件
    function searchInfo(event) {
        console.log(Event)
        // setSupplierName(event)
    }

    //搜索查询
    function searchOpt() {
        console.log('baocun')
        // getTableData();
    }

    return { searchInfo, searchOpt }
}

let EnergyContainer = createContainer(useEnergy)
export default EnergyContainer