import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";
import { useLocation, useNavigate } from 'react-router-dom';

const useAsset = () => {
    let navigate = useNavigate();
    let location = useLocation();
    let AssetsId = location.state ? location.state.AssetsId : '';
    const [assetDetail, setAssetDetail] = useState([]);  //资产详情内容

    useEffect(() => {
        getAssetDetail(); //获取资产详情
    }, [])

    //获取资产详情
    function getAssetDetail() {
        fetch('GetAssetsView?AssetsId=' + AssetsId).then(async (response) => {
            if (response.ok) {
                let res = await response.json();
                setAssetDetail(res.data)
            }
        })
    }

    //保存接口
    function SaveOrUpdateAssets(data) {
        fetch('SaveOrUpdateAssets', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(async (response) => {
            let res = await response.json();
            if (res.data.Code === '200') {
                navigate('/AssetIndex')
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
            'PurchasingDate': values['PurchasingDate'].format('YYYY-MM-DD'),
            'Station': StationInfo
        };
        SaveOrUpdateAssets(res);
    };

    //删除接口
    function DelAssetsById() {
        fetch('DelAssetsById', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ 'AssetsId': AssetsId })
        }).then(async (response) => {
            let res = await response.json();
            if (res.data.Code === '200') {
                navigate('/AssetIndex')
            }
        })
    }

    return { assetDetail, onFinish, DelAssetsById }
}

let AssetContainer = createContainer(useAsset)
export default AssetContainer