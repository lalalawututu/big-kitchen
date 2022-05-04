import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";
import { useLocation } from 'react-router-dom';

const useSupplier = () => {
    let location = useLocation();
    let BrandId = location.state ? location.state.BrandId : '';
    const [brandDetail, setBrandDetail] = useState([]);  //供应商详情内容

    useEffect(() => {
        getTableDetail(); //获取供应商管理列表数据
    }, [])

    //获取供应商管理列表数据
    function getTableDetail() {
        fetch('GetBrandView?BrandId=' + BrandId).then(async (response) => {
            if (response.ok) {
                let res = await response.json();
                setBrandDetail(res.data)
            }
        })
    }

    return { brandDetail }
}

let SupplierDetailContainer = createContainer(useSupplier)
export default SupplierDetailContainer
