import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";
import { useLocation, useNavigate } from 'react-router-dom';
import { Sync_Server } from "../../common";

const useSupplier = () => {
    let location = useLocation();
    let navigate = useNavigate();
    let contractCode = location.state ? location.state.contractCode : ''; //合同id
    const [contractDetail, setContractDetail] = useState([]);  //合同管理详情内容
    const [supplierList, setSupplierList] = useState([]); //供应商数据
    const [employeesList, setEmployeesList] = useState([]); //获取负责人数据
    const [filename, setFilename] = useState('');

    useEffect(() => {
        getSuppliersList(); //获取供应商列表
        getEmployees(); //获取负责人列表
        getContractDetail(); //获取供应商合同管理详情内容
    }, [contractCode])

    //获取供应商合同管理详情内容
    function getContractDetail() {
        if(!contractCode) return false;
        let url = Sync_Server + "/meta/contract/contract_code/" + contractCode
        fetch(`${url}`).then(async (response) => {
            if (response.ok) {
                let dataJson = await response.json()
                if (dataJson.code === '200') {
                    let contractDetail = JSON.parse(dataJson.content);
                    if (contractDetail.length) {
                        setContractDetail(contractDetail[0])
                        console.log(contractDetail,'contractDetailcontractDetail')
                    }
                }
            }
        })
    }

    //获取负责人数据
    function getEmployees() {
        const url = Sync_Server + "/data/blockchain?model=employees"
        fetch(`${url}`).then(async (response) => {
            if (response.ok) {
                let dataJson = await response.json();
                if (dataJson.code === '200') {
                    let employees = JSON.parse(dataJson.content);
                    setEmployeesList(employees)
                }
            }
        })
    }

    //获取供应商列表数据
    function getSuppliersList() {
        const url = Sync_Server + "/data/blockchain?model=suppliers"
        fetch(`${url}`).then(async (response) => {
            if (response.ok) {
                let dataJson = await response.json()
                if (dataJson.code === '200') {
                    let supplierList = JSON.parse(dataJson.content);
                    setSupplierList(supplierList.suppliers)
                }
            }
        })
    }

    //保存操作
    const onFinish = (values) => {
        const res = {
            ...values,
            'sign_at':  values['sign_at']?values['sign_at'].format('YYYY-MM-DD'):'', //签订日期
            'expired_at': values['expired_at']?values['expired_at'].format('YYYY-MM-DD'):'', //合同有效期
        };
        SaveOrUpdateContract(res);
    };

    //保存接口
    function SaveOrUpdateContract(data) {
        var url = ''
        if (contractDetail.contract_code) {
            url = Sync_Server + "/meta/contract/contract_code/update"; //编辑
        } else {
            url = Sync_Server + "/meta/contract/contract_code/create"; //新增
        }

        data['filename'] = filename; //文件名
        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(async (response) => {
            let res = await response.json();
            if (res.code === '200') {
                navigate('/supplier/contracts')
            }
        })
    }

    //删除合同接口
    function DelContract() {
        const url = Sync_Server + "/meta/contract/contract_code/delete"
        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(contractDetail)
        }).then(async (response) => {
            let res = await response.json();
            if (res.code === '200') {
                navigate('/supplier/contracts')
            }
        })
    }

    function beforeFileUpload(file) {
        console.log(file, 'beforeFileUpload')
        fileUpload(file)
    }
    //文件上传
    function fileUpload(options) {
        const { onSuccess, onError, file, onProgress } = options;

        const formData = new FormData();
        formData.append('file', file)

        fetch(Sync_Server + '/meta/upload', {
            method: 'POST',
            body: formData,
        }).then(res => {
            res.json().then(val => setFilename(val.content))
        })
    }

    return { supplierList, employeesList, contractDetail, onFinish, DelContract, beforeFileUpload, fileUpload }
}

let SupplierUpdateContainer = createContainer(useSupplier)
export default SupplierUpdateContainer
