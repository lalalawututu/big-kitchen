import { useState } from 'react'
import { createContainer } from "unstated-next"
import { useMount } from '../../utils'
import {APS_Server} from "../../common";

const getDataFromBlockchain = APS_Server + "/data/blockchain/tasks?model="

const useList = () => {
    const [initialData, setInitialData] = useState([]);
    const [data, setData] = useState([])

    useMount(() => {
        let url = getDataFromBlockchain + "disinfection"
        fetch(`${url}`).then(async (response) => {
            if (response.ok) {
                let dataJson = await response.json()
                // console.log(dataJson.content)
                let planList = JSON.parse(dataJson.content)
                // console.log(planList)
                let data = []
                planList.forEach((item, index) => {
                    let panInfo = {
                        key: item.info.taskId,
                        Floor: item.action,
                        KillDate: item.startAt,
                        StartDate: item.startAt,
                        UseTime: item.duration,
                        type: item.info.taskType,
                    }
                    data.push(panInfo)
                })
                setData(data)
                setInitialData(data)
            }
        })
    })
    return {data, setData, initialData}
}

let ozoneKillContainer = createContainer(useList)
export default ozoneKillContainer
