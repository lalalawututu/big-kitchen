import { useState } from 'react';
import { createContainer } from "unstated-next";
import { useMount } from '../../utils/index.ts';

const apiWorkUrl = process.env.REACT_APP_API_WORKURL;

const useMange = () => {
  const [data, setData] = useState([]);

  useMount(() => {
    fetch(`${apiWorkUrl}`).then(async (response) => {
      if (response.ok) {
        let data = [];
        setData(data);
      }
    });
  })
  return {data, setData}
}

let AssetAddEditContainer = createContainer(useMange)
export default AssetAddEditContainer
