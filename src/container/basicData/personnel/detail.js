import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";
import request from '@/net/api.js'

const usePersonnel = () => {
    const [personnelDetail, setPersonnelDetail] = useState([]);  //人员管理详情内容

    useEffect(() => {
        getPeopleDetail(); //获取人员管理详情内容
    }, [])

    //获取人员管理详情内容
    function getPeopleDetail() {
        request.basicPersonnel.getEmployee('YG_01010001').then((res) => {
            if (res.Employee) {
                setPersonnelDetail(res.Employee)
            }
        })
    }

    return { personnelDetail }
}

let PersonnelContainer = createContainer(usePersonnel)
export default PersonnelContainer