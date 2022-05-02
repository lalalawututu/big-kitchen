import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";
import { useLocation } from 'react-router-dom';

const useWorkshop = () => {
    let location = useLocation();
    let WorkShopId = location.state ? location.state.WorkShopId : ''; //车间id
    const [workshopDetail, setWorkshopDetail] = useState([]);  //车间管理详情内容

    useEffect(() => {
        getWorkshopDetail(); //获取供应商详情页面数据
    }, [])

    //获取供应商详情页面数据
    function getWorkshopDetail() {
        fetch('GetWorkShopView?WorkShopId=' + WorkShopId).then(async (response) => {
            if (response.ok) {
                let res = await response.json();
                setWorkshopDetail(res.data)
            }
        })
    }

    return { workshopDetail }
}

let WorkshopContainer = createContainer(useWorkshop)
export default WorkshopContainer