import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";
import { useLocation } from 'react-router-dom';

const useAsset = () => {
    let location = useLocation();
    let AssetsId = location.state ? location.state.AssetsId : '';
    const [assetDetail, setAssetDetail] = useState([]);  //资产详情内容

    useEffect(() => {
        getAssetDetail(); //获取资产详情
    }, [])

    //获取资产详情
    function getAssetDetail() {
        fetch('GetAssetsView?AssetsId='+AssetsId).then(async (response) => {
            if(response.ok){
                let res = await response.json();
                setAssetDetail(res.data)
            }
        })
    }

    return { assetDetail }
}

let AssetContainer = createContainer(useAsset)
export default AssetContainer