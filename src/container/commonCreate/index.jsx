import React, { useState } from 'react';
import { createContainer } from 'unstated-next';

const useWorkMange = () => {
  const [data, setData] = useState([]);

  
  return { data, setData };
}

let creatorContainer = createContainer(useWorkMange)
export default creatorContainer