import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";
import request from '../../../net/api.js'

const useQuality = () => {
  const [unqualifiedProblem, setUnqualifiedProblem] = useState(''); //不合格原因
  const [unqualifiedProblemList, setUnqualifiedProblemList] = useState([]); //不合格原因列表

  useEffect(() => {

  }, [])

  //保存接口
  function SaveOrUpdateQualityStandard(data) {
    fetch('SaveOrUpdateQualityStandard', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    }).then(async (response) => {
      // let res = await response.json();
      console.log(response)
    })
  }

  //保存操作
  const onFinish = (values) => {
    var obj = ''
    unqualifiedProblemList && unqualifiedProblemList.map((item, index) => {
      obj += item.name + ','
    })
    const res = {
      ...values,
      'NonconformityProblem': '质量'
    };
    SaveOrUpdateQualityStandard(values);
  };

  //不合格原因input
  const unqualified = (event) => {
    setUnqualifiedProblem(event)

  }

  //添加不合格原因
  const addHandle = () => {
    setUnqualifiedProblemList([...unqualifiedProblemList, {
      name: unqualifiedProblem
    }])
    setUnqualifiedProblem('')
    console.log('不合格原因')
  }

  //删除接口
  function DelQualityStandardById() {
    request.basicQuality.getDelQualityStandardById({ StandardId: 'c8m4qa2vkvf3pc0ippl0' }).then((res) => {
      console.log(res)
    })
  }

  return { unqualifiedProblem, unqualifiedProblemList, onFinish, DelQualityStandardById, addHandle, unqualified }
}

let QualityContainer = createContainer(useQuality)
export default QualityContainer
