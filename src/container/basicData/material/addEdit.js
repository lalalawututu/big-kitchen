import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";
import { useLocation, useNavigate } from 'react-router-dom';

const useMaterial = () => {
    let location = useLocation();
    let navigate = useNavigate();
    let MaterialId = location.state ? location.state.MaterialId : '';
    const [materialDetail, setMaterialDetail] = useState([]);  //供应商详情内容

    useEffect(() => {
        getMaterialDetail(); //获取物流详情内容
    }, [])

    //获取物流详情内容
    function getMaterialDetail() {
        fetch('GetMaterialView?MaterialId=' + MaterialId).then(async (response) => {
            if (response.ok) {
                let res = await response.json();
                setMaterialDetail(res.data)
            }
        })
    }

    //保存接口
    function SaveOrUpdateMaterial(data) {
        fetch('SaveOrUpdateMaterial', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(async (response) => {
            let res = await response.json();
            if (res.data.Code === '200') {
                navigate('/MaterialIndex')
            }
        })
    }

    //保存操作
    const onFinish = (values) => {
        SaveOrUpdateMaterial(values);
    };

    //删除接口
    function DelMaterialById() {
        fetch('DelMaterialById', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ 'MaterialId': MaterialId })
        }).then(async (response) => {
            let res = await response.json();
            if (res.data.Code === '200') {
                navigate('/MaterialIndex')
            }
        })
    }

    return { materialDetail, onFinish, DelMaterialById }
}

let MaterialContainer = createContainer(useMaterial)
export default MaterialContainer