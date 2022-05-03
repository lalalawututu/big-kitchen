import { useState } from 'react'
import { createContainer } from "unstated-next"
import { useMount } from '../../utils'
import {Sync_Server} from "../../common";

const getDataFromBlockchain = Sync_Server + "/data/blockchain?model="

const useList = () => {
  const [initialData, setInitialData] = useState([]);
  const [data, setData] = useState([])
  const [boms, setBoms] = useState([])
  const [initialBoms, setIniBoms] = useState([])

  useMount(() => {
    let url = getDataFromBlockchain + "sku"
    fetch(`${url}`).then(async (response) => {
      if (response.ok) {
        let dataJson = await response.json()
        // console.log(dataJson.content)
        let planList = JSON.parse(dataJson.content)
        // console.log(planList)
        let data = []
        planList.material.forEach((item, index) => {
          let panInfo = {
            key: item.sku_code,
            sku_code: item.sku_code,
            materialName: item.sku_name,
            supplier: item.sku_supplier,
            Unit: item.sku_uom,
            brand: item.sku_brand,
            type: item.sku_type,
          }
          data.push(panInfo)
        })
        setData(data)
        setInitialData(data)
      }
    })
    getBoms()
  })

  const getBoms = () => {
    let url = getDataFromBlockchain + "boms"
    fetch(`${url}`).then(async (response) => {
      if (response.ok) {
        let dataJson = await response.json()
        // console.log(dataJson.content)
        let planList = JSON.parse(dataJson.content)
        // console.log(planList)
        let data = {}
        planList.bom.forEach((item, index) => {
          item.material.forEach((item2)=>{
            if (data.hasOwnProperty(item.finishedSkuCode)) {
              let panInfo = {
                key: item2.skuCode,
                FinishSkuCode: '',
                BomName: '',
                Material: item2.skuCode,
                Quantity: item2.quantity,
                Rate: '',
              }
              data[item.finishedSkuCode].push(panInfo)
            }else {
              let panInfo = {
                key: item2.skuCode,
                FinishSkuCode: item.finishedSkuCode,
                BomName: item.bomName,
                Material: item2.skuCode,
                Quantity: item2.quantity,
                Rate: '90%',
              }
              data[item.finishedSkuCode] = [panInfo]
            }
          })
        })
        let bom = Object.entries(data).map((value) => value[1]).reduce((arr,cur)=>arr.concat(cur))
        setIniBoms(bom)
        setBoms(bom)

      }
    })
  }
  return {data, initialBoms, boms, initialData, setData, setBoms}
}

let materialsManageContainer = createContainer(useList)
export default materialsManageContainer
