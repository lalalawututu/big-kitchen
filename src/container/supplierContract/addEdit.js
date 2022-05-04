import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";
import { useLocation, useNavigate } from 'react-router-dom';
import { Sync_Server } from "../../common";

const useSupplier = () => {
    let location = useLocation();
    let navigate = useNavigate();
    let BrandId = location.state ? location.state.BrandId : '';
    const [brandDetail, setBrandDetail] = useState([]);  //供应商详情内容
    const [supplierList, setSupplierList] = useState([]); //供应商名称

    useEffect(() => {
        getSuppliersList(); //获取供应商列表
        getTableDetail(); //获取供应商管理列表数据
    }, [BrandId])

    //获取供应商管理列表数据
    function getTableDetail() {
        fetch('GetBrandView?BrandId=' + BrandId).then(async (response) => {
            if (response.ok) {
                let res = await response.json();
                setBrandDetail(res.data)
            }
        })
    }

    //获取供应商列表数据
    function getSuppliersList() {
        const url = Sync_Server + "/data/blockchain?model=suppliers"
        fetch(`${url}`).then(async (response) => {
            if (response.ok) {
                let dataJson = await response.json()
                let supplierList = JSON.parse(dataJson.content);
                setSupplierList(supplierList.suppliers)
            }
        })
    }

    //保存接口
    function SaveOrUpdateBrand(data) {
        fetch('SaveOrUpdateBrand', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(async (response) => {
            let res = await response.json();
            if (res.data.Code === '200') {
                navigate('/BrandIndex')
            }
        })
    }

    //保存操作
    const onFinish = (values) => {
        SaveOrUpdateBrand(values);
    };

    //删除接口
    function DelBrandById() {
        fetch('DelBrandById', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ 'BrandId': BrandId })
        }).then(async (response) => {
            let res = await response.json();
            if (res.data.Code === '200') {
                navigate('/BrandIndex')
            }
        })
    }
    return { supplierList,onFinish, DelBrandById, brandDetail }
}

let SupplierUpdateContainer = createContainer(useSupplier)
export default SupplierUpdateContainer
