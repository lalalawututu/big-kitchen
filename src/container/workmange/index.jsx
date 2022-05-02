import { useState } from 'react';
import { createContainer } from "unstated-next";
import { useMount } from '../../utils';
import {Sync_Server} from "../../common";

const apiGetCraftList = Sync_Server + "/data/blockchain?model=craft"

const useWorkMange = () => {
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
        planList.craft.forEach((item, index) => {
          let WorkingHours = 0;
          if (item.working_procedure) {
            let WorkingProcedure = item.working_procedure;
            WorkingProcedure.forEach((item, index) => {
              WorkingHours += item.duration
            })
          }
          let workInfor = {
            key: index,
            WorkmanshipId: item.workmanship_id,
            WorkmanshipName: item.workmanship_name,
            FinishedProduct: item.finished_product,
            WorkmanshipContent: item.workmanship_content,
            ProcedureQuantity: item.working_procedure.length,
            WorkingHours: WorkingHours/60 + '分钟',
            Qualified_rate: item.qualified_rate,
          }
          data.push(workInfor);
        });
        setInitialData(data);
        setData(data);
      }
    });
  })
  return {initialData, data, setData}
}

let WorkMangeContainer = createContainer(useWorkMange)
export default WorkMangeContainer
