import { createContainer } from "unstated-next";
import { useMount } from '../../utils'
import {Sync_Server} from "../../common";
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const getDataFromBlockchain = Sync_Server + "/data/blockchain?model="
const useBOM = () => {
    const [materialsPostArr, setPostArr] = useState([]);
    const [skuList, setSkuList] = useState([]);
    const [bomList, setBomList] = useState([]);
    const [imgList, setImgList] = useState([]);
    const location = useLocation();
    const BomID = location.state.BomID;
    const imgUrl = location.state.imgUrl;

    useMount(() => {
        let bomUrl = Sync_Server + "/meta/bom"
        let skuUrl = getDataFromBlockchain + "sku"
        fetch(`${skuUrl}`).then(async (response) => {
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
        fetch(`${bomUrl}`).then(async (response) => {
            if (response.ok) {
                let dataJson = await response.json();
                let planList = JSON.parse(dataJson.content);
                let arr = [];
                planList.forEach(item => {
                    if(item.bom_id !== '' && item.bom_id === BomID) {
                        arr.push(item);
                        setBomList(arr);
                        setPostArr(arr[0].material);
                        let imgArr = [];
                        imgArr.push(imgUrl);
                        setImgList(imgArr);
                    };
                });
            };
        });
    });
    return { skuList, bomList, materialsPostArr, imgList, setPostArr, setImgList }
}

let BOMModifyContainer = createContainer(useBOM)
export default BOMModifyContainer
