import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";

const useQuality = () => {
  const [qualityDetail, setQualityDetail] = useState([]);  //质检标准详情内容

  useEffect(() => {
    getQualityDetail(); //获取质检标准管理列表数据
  }, [])

  //获取质检标准管理列表数据
  function getQualityDetail() {
    var data = { StandardId: 'c8kna6qvkvf3mc7ohgl0' };
    fetch('GetQualityStandardView?StandardId=' + 'c8kna6qvkvf3mc7ohgl0').then(async (response) => {
      if (response.ok) {
        let res = await response.json();
        setQualityDetail(res.data)
      }
    })
  }

  return { qualityDetail }
}

let QualityContainer = createContainer(useQuality)
export default QualityContainer