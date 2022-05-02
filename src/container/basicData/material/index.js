import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";
import request from '../../../net/api.js'

const useMaterial = () => {
    const [tableData, setTableData] = useState([]);  //表格数据
    const [selectedTags, setSelectedTags] = useState(['全部']); //类型选择
    const tagsType = ['全部', '产成品', '原料', '调料', '调料包', '包材', '耗材', '备件/配件', '其他'];

    //搜索内容
    const [searchContent, setSearchContent] = useState({
        'MaterialType': '',
        'MaterialName': ''
    })

    useEffect(() => {
        getTableData(); //获取供应商管理列表数据
    }, [searchContent.MaterialType])

    //获取供应商管理列表数据
    function getTableData() {
        setTableData([]); //清空数据
        fetch('GetMaterialList?MaterialName=' + searchContent.MaterialName + '&MaterialType=' + searchContent.MaterialType).then(async (response) => {
            if (response.ok) {
                let res = await response.json();
                setTableData(res.data.List)
            }
        })
    }

    //查询条件
    function searchInfo(event) {
        setSearchContent({
            ...searchContent,
            MaterialName: event
        })
    }

    //搜索查询
    function searchOpt() {
        getTableData();
    }

    //类型切换
    function handleChange(tag, checked) {
        setSearchContent({
            ...searchContent,
            MaterialType: tag === '全部' ? '' : tag
        })
        setSelectedTags(tag)
    }

    return { tableData, searchContent, tagsType, selectedTags, searchInfo, searchOpt, handleChange }
}

let MaterialContainer = createContainer(useMaterial)
export default MaterialContainer