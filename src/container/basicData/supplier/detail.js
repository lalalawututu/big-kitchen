import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";
import { useLocation } from 'react-router-dom';

const useSupplier = () => {
    let location = useLocation();
    let SupplierId = location.state ? location.state.SupplierId : '';
    const [supplierDetail, setSupplierDetail] = useState([]);  //供应商详情内容

    useEffect(() => {
        getTableDetail(); //获取供应商管理详情页面数据
    }, [])

    //获取供应商管理详情页面数据
    function getTableDetail() {
        fetch('GetSupplierView?SupplierId='+SupplierId).then(async (response) => {
            if(response.ok){
                let res = await response.json();
                setSupplierDetail(res.data)
            }
        })
    }

    return { supplierDetail }
}

let SupplierContainer = createContainer(useSupplier)
export default SupplierContainer