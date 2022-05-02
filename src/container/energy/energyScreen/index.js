import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";
import request from '@/net/api.js'

const useEnergy = () => {
    const [waterList, setWaterList] = useState([]); //水
    const [electricList, setElectricList] = useState([]); //电
    const [gasList, setGasList] = useState([]); //气

    const [waterconsumeList, setWaterconsumeList] = useState([]); //水消耗列表
    const [electricconsumeList, setElectricconsumeList] = useState([]); //电消耗列表
    const [gasconsumeList, setGasconsumeList] = useState([]); //气消耗列表

    useEffect(() => {
        getLineChart(); //获取折线图数据
        getConsumeList(); //获取消耗列表数据
    }, [])

    //获取折线图数据
    function getLineChart() {
        request.energy.getConsumeRecordList().then((res) => {
            if (res.data.Code === '200') {
                setWaterList(res.data.List[0])
                setElectricList(res.data.List[1])
                setGasList(res.data.List[2])
            }
        })
    }

    //获取消耗列表数据
    function getConsumeList() {
        request.energy.getConsumeList().then((res) => {
            if (res.data.Code === '200') {
                setWaterconsumeList(res.data.List.Water)
                setElectricconsumeList(res.data.List.Electricity)
                setGasconsumeList(res.data.List.Gas)
            }
        })
    }

    return { waterList, electricList, gasList, waterconsumeList, electricconsumeList, gasconsumeList }
}

let EnergyContainer = createContainer(useEnergy)
export default EnergyContainer