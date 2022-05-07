import { useState } from 'react';
import { createContainer } from "unstated-next";
import { useMount } from '../../utils';
import {Sync_Server} from "../../common";

const apiGetCraftList = Sync_Server + "/data/blockchain?model=procedure"

const useWorkMange = () => {
  const [initialData, setInitialData] = useState([]);
  const [data, setData] = useState([]);

  useMount(() => {

  })
  return {initialData, data, setData}
}

let WorkMangeContainer = createContainer(useWorkMange)
export default WorkMangeContainer
