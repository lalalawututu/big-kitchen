import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";
import { useLocation } from 'react-router-dom';

const useMaterial = () => {
    let location = useLocation();
    let MaterialId = location.state ? location.state.MaterialId : '';
    const [materialDetail, setMaterialDetail] = useState([]);  //物流详情内容

    useEffect(() => {
        getMaterialDetail(); //获取物流详情内容
    }, [])

    //获取物流详情内容
    function getMaterialDetail() {
        fetch('GetMaterialView?MaterialId='+MaterialId).then(async (response) => {
            if(response.ok){
                let res = await response.json();
                setMaterialDetail(res.data)
            }
        })
    }

    return { materialDetail }
}

let MaterialContainer = createContainer(useMaterial)
export default MaterialContainer