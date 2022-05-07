import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";
import { Sync_Server,Xfiles_Server } from "../../common";

const useSupplier = () => {
    const [contractData, setContractData] = useState([]);  //表格数据
    const [fullData, setFullData] = useState([]);  //表格数据

    useEffect(async () => {
        await getContractData();
    }, [])

    //获取供应商列表数据
    async function getSuppliersList() {
        const url = Sync_Server + "/data/blockchain?model=suppliers"
        let response = await fetch(`${url}`)
        if (response.ok) {
            let dataJson = await response.json()
            if (dataJson.code === '200') {
                let supplierList = JSON.parse(dataJson.content);
                return supplierList.suppliers
            }
        }
        return []
    }

    function getSupplierNameById(suppliers, id) {
        let name = ''
        suppliers.forEach((supp) =>{
            if (supp.supplier_id === id) {
               name = supp.supplier_name
            }
        })
        return name
    }

    //获取供应商合同管理列表数据
    async function getContractData() {
        setContractData([]); //清空数据
        setFullData([])
        let suppliers = await getSuppliersList();
        let url = Sync_Server + "/meta/contract"
        fetch(`${url}`).then(async (response) => {
            if (response.ok) {
                let dataJson = await response.json()
                if (dataJson.code === '200') {
                    let contractList = JSON.parse(dataJson.content);
                    console.log(contractList)
                    let data = contractList.map((item) =>{
                        item.supplier_name = getSupplierNameById(suppliers, item.supplier_id)
                        item.contract_name = item.contract_name??''
                        return item
                    })
                    setContractData(data)
                    setFullData(data)
                }
            }
        })
    }

    //文件下载
    function downFile(record) {
        let file_url = Xfiles_Server +'/' +record.filename;
        console.log(file_url,'file_url')
        window.location.href = file_url
    }

    return { fullData, contractData, setContractData, downFile }
}

let SupplierContainer = createContainer(useSupplier)
export default SupplierContainer
