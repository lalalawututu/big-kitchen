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
        let data = [];

        setInitialData(data);
        setData(data);
      }
    });
  })
  return {initialData, data, setData}
}

let ProduceMangeContainer = createContainer(useWorkMange)
export default ProduceMangeContainer
