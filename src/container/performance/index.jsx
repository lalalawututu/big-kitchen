import { useState } from 'react';
import { createContainer } from "unstated-next";
import { useMount } from '../../utils';
import {Sync_Server} from "../../common";

const apiGetCraftList = Sync_Server + ""

const usePerf = () => {
  const [initialData, setInitialData] = useState([]);
  const [data, setData] = useState([]);

  useMount(() => {
    fetch(`${apiGetCraftList}`).then(async (response) => {
      if (response.ok) {
        let dataJson = await response.json()
        // console.log(dataJson.content)
        let planList = JSON.parse(dataJson.content)
        // console.log(planList)
        let data = []
        setInitialData(data);
        setData(data);
      }
    });
  })
  return {initialData, data, setData}
}

let PerformanceContainer = createContainer(usePerf)
export default PerformanceContainer
