import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";
import {APS_Server, Sync_Server} from "../../../common";

const getPriceUrl = APS_Server + "/data/blockchain/price"
const getPOrdersUrl = APS_Server + "/data/blockchain/porder"
const getDataFromBlockchain = Sync_Server + "/data/blockchain?model="

const useSupplier = () => {
    const [iniTableData, setIniTableData] = useState([]);  //表格数据
    const [tableData, setTableData] = useState([]);  //表格数据
    const [priceData, setPriceData] = useState([]);  //表格数据
    const [iniOrdersData, setIniOrdersData] = useState([]);  //表格数据
    const [ordersData, setOrdersData] = useState([]);  //表格数据
    const [searchKey, setSearchKey] = useState(''); //搜索供货商姓名
    const fmt_time = ((t) => { return t.getMonth() + ':' + t.getDay()})

    useEffect(() => {
        getTableData(); //获取供应商管理列表数据
        getPriceData(); //获取供应商管理列表数据
        getOrdersData(); //获取供应商管理列表数据
    }, [])

    //获取供应商管理列表数据
    function getTableData() {
        setTableData([]); //清空数据
        let url = getDataFromBlockchain + "suppliers"
        fetch(`${url}`).then(async (response) => {
            if (response.ok) {
                let dataJson = await response.json()
                // console.log(dataJson.content)
                let planList = JSON.parse(dataJson.content)
                // console.log(planList)
                let data = []
                const min = 1;
                const max = 100;
                planList.suppliers.forEach((item, index) => {
                    const rand = (min + Math.random(new Date().getTime()) * (max - min)).toFixed(0);
                    let panInfo = {
                        key: item.supplier_id,
                        supplier_name: item.supplier_name,
                        brand_name: item.brand_name,
                        address: item.address,
                        linkman: item.linkman,
                        phone: item.phone,
                        landline: item.landline,
                        email: item.email,
                        dk_phone: item.dk_phone,
                        score: rand,
                    }
                    data.push(panInfo)
                })

                setIniTableData(data)
                setTableData(data)
            }
        })
    }

    //获取供应商管理列表数据
    function getPriceData() {
        setPriceData([]); //清空数据
        fetch(`${getPriceUrl}`).then(async (response) => {
            if (response.ok) {
                let dataJson = await response.json()
                // console.log(dataJson.content)
                let prices = JSON.parse(dataJson.content)
                console.log(prices)
                let data = []
                prices.forEach((item) => {
                    item.oroderDetail.forEach((item2) => {
                        let s = new Date(item.date*1000)
                        let panInfo = {
                            key: item2.skuCode,
                            date: fmt_time(s),
                            sku_code: item2.skuCode,
                            amount: item2.quantity,
                            price: item2.price,
                            supplier: item.supplierId,
                            delivery_period: item.deliveryPeriod[0],
                            driver: item.driver.name,
                            car: item.driver.carNo,
                            phone: item.driver.phone,
                        }
                        if (searchKey.length > 0
                            && !item2.skuCode.includes(searchKey)
                            && !item.supplierId.includes(searchKey))
                        {
                            console.log("not match search key")
                        }else{
                            data.push(panInfo)
                        }
                    })
                })

                setPriceData(data)
            }
        })
    }

    //获取供应商管理列表数据
    function getOrdersData() {
        setOrdersData([]); //清空数据
        fetch(`${getPOrdersUrl}`).then(async (response) => {
            if (response.ok) {
                let dataJson = await response.json()
                // console.log(dataJson.content)
                let prices = JSON.parse(dataJson.content)
                console.log(prices)
                let data = []
                prices.forEach((item) => {
                    item.oroderDetail.forEach((item2) => {
                        let panInfo = {
                            key: item2.skuCode,
                            date: item.date,
                            sku_code: item2.skuCode,
                            amount: item2.quantity,
                            price: item2.price,
                            supplier: item.supplierId,
                            delivery_period: item.deliveryPeriod[0],
                            driver: item.driver.name,
                            car: item.driver.carNo,
                            phone: item.driver.phone,
                        }
                        if (searchKey.length > 0
                            && !item.supplierId.includes(searchKey))
                        {
                            console.log("not match search key")
                        }else{
                            data.push(panInfo)
                        }
                    })
                })

                setIniOrdersData(data)
                setOrdersData(data)
            }
        })
    }

    //查询条件
    function searchInfo(event) {
        setSearchKey(event)
    }

    //搜索查询
    function searchSupplier() {
        getTableData();
    }

    function searchDemandPrice() {
        getPriceData();
    }

    function searchSupplierOrder() {
        getOrdersData();
    }

    return { tableData, searchKey, priceData, ordersData, iniTableData, iniOrdersData, searchInfo, searchSupplier, searchDemandPrice, searchSupplierOrder, setOrdersData, setTableData }
}

let SupplierContainer = createContainer(useSupplier)
export default SupplierContainer
