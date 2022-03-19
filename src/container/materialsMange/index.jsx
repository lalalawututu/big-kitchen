import { useState } from 'react'
import { createContainer } from "unstated-next"
import { useMount } from '../../utils/index.ts'

const materialUrl = process.env.REACT_APP_API_MATERIALURL

const useList = () => {
  const [initialData, setInitialData] = useState([]);
  const [data, setData] = useState([])

  useMount(() => {
    fetch(`${materialUrl}`).then(async (response) => {
      if (response.ok) {
        let dataJson = await response.json()
        let planList = dataJson.data.List
        let data = []
        planList.forEach((item, index) => {
          let panInfo = {
            materialName : item.materialName,
            type : item.type,
            Unit : item.Unit,
            supplier : item.supplier,
            brand : item.brand,
            imgurl: item.imgurl,
            key: index
          }
          data.push(panInfo)
        })
        setData(data)
        setInitialData(data)
      }
    })
  })
  return {data, setData, initialData}
}

let materialsMangeContainer = createContainer(useList)
export default materialsMangeContainer