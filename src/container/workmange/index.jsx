import { useState } from 'react';
import { createContainer } from "unstated-next";
import { useMount } from '../../utils/index.ts';

const apiWorkUrl = process.env.REACT_APP_API_WORKURL;

const useWorkMange = () => {
  const [initialData, setInitialData] = useState([]);
  const [data, setData] = useState([]);

  useMount(() => {
    fetch(`${apiWorkUrl}`).then(async (response) => {
      if (response.ok) {
        let dataJson = await response.json();
        let workData = dataJson.workmanship;
        let data = [];
        workData.forEach((item, index) => {
          let WorkingHours = 0;
          let WorkerQuantity = 0;
          let WorkNumber = 0;
          if (item.WorkingProcedure !== null) {
            WorkNumber = item.WorkingProcedure.length;
          }
          if (item.WorkingProcedure !== null) {
            let WorkingProcedure = item.WorkingProcedure;
            WorkingProcedure.forEach((item, index) => {
              WorkingHours += item.WorkingHours
              WorkerQuantity += item.WorkerQuantity
            })
          }
          let workInfor = {
            key: index,
            WorkmanshipId: item.WorkmanshipId,
            WorkmanshipName: item.WorkmanshipName,
            FinishedProduct: item.FinishedProduct,
            ProductionLineName: item.ProductionLineName,
            workerNumber: WorkerQuantity,
            WorkerQuantity: WorkNumber,
            WorkingHours: WorkingHours
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