import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";
import { useLocation, useNavigate } from 'react-router-dom';

const useSupplier = () => {
    let navigate = useNavigate();
    let location = useLocation();
    let SupplierId = location.state ? location.state.SupplierId : '';
    const [supplierDetail, setSupplierDetail] = useState([]);  //供应商详情内容

    useEffect(() => {
        getTableDetail(); //获取供应商管理详情页面数据
    }, [])

    //获取供应商管理详情页面数据
    function getTableDetail() {
        fetch('GetSupplierView?SupplierId=' + SupplierId).then(async (response) => {
            if (response.ok) {
                let res = await response.json();
                setSupplierDetail(res.data)
            }
        })
    }

    //保存接口
    function SaveOrUpdateSupplier(data) {
        fetch('SaveOrUpdateSupplier', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(async (response) => {
            let res = await response.json();
            if (res.data.Code === '200') {
                navigate('/SupplierIndex')
            }
        })
    }

    //保存操作
    const onFinish = (values) => {
        SaveOrUpdateSupplier(values);
    };

    //删除接口
    function DelSupplierById() {
        fetch('DelSupplierById', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ 'SupplierId': SupplierId })
        }).then(async (response) => {
            let res = await response.json();
            if (res.data.Code === '200') {
                navigate('/SupplierIndex')
            }
        })
    }

    return { supplierDetail, onFinish, DelSupplierById }
}

let SupplierContainer = createContainer(useSupplier)
export default SupplierContainer