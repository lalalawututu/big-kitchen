import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";
import { useLocation, useNavigate } from 'react-router-dom';

const useSupplier = () => {
    let location = useLocation();
    let navigate = useNavigate();
    let TeamId = location.state ? location.state.TeamId : '';
    const [teamDetail, setTeamDetail] = useState([]);  //班组详情内容

    useEffect(() => {
        getTeamDetail(); //获取班组管理列表数据
    }, [])

    //保存接口
    function SaveOrUpdateTeam(data) {
        fetch('SaveOrUpdateTeam', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(async (response) => {
            let res = await response.json();
            if (res.data.Code === '200') {
                navigate('/TeamIndex')
            }
        })
    }

    //保存操作
    const onFinish = (values) => {
        SaveOrUpdateTeam(values);
    };

    //获取班组管理详情数据
    function getTeamDetail() {
        fetch('GetTeamView?TeamId=' + TeamId).then(async (response) => {
            if (response.ok) {
                let res = await response.json();
                setTeamDetail(res.data)
            }
        })
    }

    //删除接口
    function DelTeamById() {
        fetch('DelTeamById', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ 'TeamId': TeamId })
        }).then(async (response) => {
            let res = await response.json();
            if (res.data.Code === '200') {
                navigate('/TeamIndex')
            }
        })
    }

    return { teamDetail, onFinish, DelTeamById }
}

let SupplierContainer = createContainer(useSupplier)
export default SupplierContainer