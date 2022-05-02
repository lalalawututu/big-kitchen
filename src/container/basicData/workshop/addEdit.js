import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";
import { useLocation, useNavigate } from 'react-router-dom';

const useWorkshop = () => {
    let location = useLocation();
    let navigate = useNavigate();
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

    //保存接口
    function SaveOrUpdateWorkShop(data) {
        fetch('SaveOrUpdateWorkShop', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(async (response) => {
            let res = await response.json();
            if (res.data.Code === '200') {
                navigate('/WorkshopIndex')
            }
        })
    }

    //保存操作
    const onFinish = (values) => {
        SaveOrUpdateWorkShop(values);
    };

    //删除接口
    function DelWorkShopById() {
        fetch('DelWorkShopById', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ 'WorkShopId': WorkShopId })
        }).then(async (response) => {
            let res = await response.json();
            if (res.data.Code === '200') {
                navigate('/WorkshopIndex')
            }
        })
    }

    return { workshopDetail, onFinish, DelWorkShopById }
}

let WorkshopContainer = createContainer(useWorkshop)
export default WorkshopContainer