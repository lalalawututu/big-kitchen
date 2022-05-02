import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";
import { useLocation, useNavigate } from 'react-router-dom';

const useAsset = () => {
    let location = useLocation();
    let navigate = useNavigate();
    let AssetsEquipmentId = location.state ? location.state.AssetsEquipmentId : '';
    const [assetDetail, setAssetDetail] = useState([]);  //资产详情内容

    useEffect(() => {
        getAssetDetail(); //获取资产详情
    }, [])

    //获取资产详情
    function getAssetDetail() {
        fetch('GetAssetsEquipmentView?AssetsEquipmentId=' + AssetsEquipmentId).then(async (response) => {
            if (response.ok) {
                let res = await response.json();
                setAssetDetail(res.data)
            }
        })
    }

    //保存接口
    function SaveOrUpdateAssetsEquipment(data) {
        fetch('SaveOrUpdateAssetsEquipment', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(async (response) => {
            let res = await response.json();
            if (res.data.Code === '200') {
                navigate('/AssetEquipmentIndex')
            }
        })
    }

    //保存操作
    const onFinish = (values) => {
        //添加人员信息（临时）
        const StationInfo = [
            {
                "StationName": "工位1",
                "Jobs": "岗位1"
            },
            {
                "StationName": "工位2",
                "Jobs": "岗位2"
            }, {
                "StationName": "工位3",
                "Jobs": "岗位3"
            }
        ]
        const res = {
            ...values,
            'ExpiryDate': values['ExpiryDate'].format('YYYY-MM-DD'),
            'PurchaseDate': values['PurchaseDate'].format('YYYY-MM-DD'),
            'Station': StationInfo
        };
        SaveOrUpdateAssetsEquipment(res);
    };

    //删除接口
    function DelAssetsEquipmentById() {
        fetch('DelAssetsEquipmentById', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ 'AssetsId': AssetsEquipmentId })
        }).then(async (response) => {
            let res = await response.json();
            if (res.data.Code === '200') {
                navigate('/AssetEquipmentIndex')
            }
        })
    }

    return { assetDetail, onFinish, DelAssetsEquipmentById }
}

let AssetContainer = createContainer(useAsset)
export default AssetContainer