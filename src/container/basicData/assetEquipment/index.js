import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";

const useAsset = () => {
    const [tableData, setTableData] = useState([]);  //表格数据
    const [assetName, setAssetName] = useState(''); //搜索资产名称

    useEffect(() => {
        getTableData(); //获取资产管理列表数据
    }, [])

    //获取资产管理列表数据
    function getTableData() {
        setTableData([]); //清空数据
        fetch('GetAssetsEquipmentList?AssetsEquipmentName='+assetName).then(async (response) => {
            if(response.ok){
                let res = await response.json();
                setTableData(res.data.List)
            }
        })
    }

    //查询条件
    function searchInfo(event) {
        setAssetName(event)
    }

    //搜索查询
    function searchOpt() {
        getTableData();
    }

    return { tableData, assetName, searchInfo, searchOpt }
}

let AssetContainer = createContainer(useAsset)
export default AssetContainer