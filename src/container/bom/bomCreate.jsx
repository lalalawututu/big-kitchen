import { createContainer } from "unstated-next";
import { useMount } from '../../utils'
import {Sync_Server} from "../../common";
import {useState} from "react";

const getDataFromBlockchain = Sync_Server + "/data/blockchain?model="

const useBOM = () => {
    const [skuList, setSkuList] = useState([]);
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
                setSkuList(data)
            }
        })
    })

    return { skuList }
}

let BOMCreateContainer = createContainer(useBOM)
export default BOMCreateContainer
