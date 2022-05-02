import { useState } from 'react';
import { createContainer } from 'unstated-next';

const useScreen = () => {
  const [data, setData] = useState([]);

  
  return { data, setData };
}

const ScreenContainer = createContainer(useScreen)
export default ScreenContainer