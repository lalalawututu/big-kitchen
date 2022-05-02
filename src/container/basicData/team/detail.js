import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";
import { useLocation } from 'react-router-dom';

const useTeam = () => {
    let location = useLocation();
    let TeamId = location.state ? location.state.TeamId : '';
    const [teamDetail, setTeamDetail] = useState([]);  //班组详情内容

    useEffect(() => {
        getTeamDetail(); //获取班组管理列表数据
    }, [])

    //获取班组管理详情数据
    function getTeamDetail() {
        fetch('GetTeamView?TeamId='+TeamId).then(async (response) => {
            if(response.ok){
                let res = await response.json();
                setTeamDetail(res.data)
            }
        })
    }

    return { teamDetail }
}

let TeamContainer = createContainer(useTeam)
export default TeamContainer