import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";
import { message } from 'antd';

const useUser = () => {
    const [userInfoList, setUserInfoList] = useState([]); //用户管理
    const [isModalVisible, setIsModalVisible] = useState(false); //重置密码弹框
    const [searchInfo, setSearchInfo] = useState(''); //查询姓名或者部门
    const [userDetail, setUserDetail] = useState(); //重置密码用户信息
    const [userId, setUserId] = useState(); //重置密码id

    useEffect(() => {
        getUserInfoList(); //获取用户管理数据
    }, [])

    //获取用户管理表格数据
    function getUserInfoList() {
        fetch('GetUserInfoList?Name=' + searchInfo).then(async (response) => {
            if (response.ok) {
                let res = await response.json();
                setUserInfoList(res.data.List);
            }
        })
    }

    //显示重置密码弹框
    function showModal(val) {
        setUserId(val.UserId)
        setUserDetail(JSON.stringify(val))
        setIsModalVisible(true);
    };

    //隐藏重置密码弹框
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    //重置密码保存
    const onFinish = (values: any) => {
        if (!values.password) {
            message.warning('请输入信息');
        } else if (values.password === values.repassword) {
            setIsModalVisible(false);
            var data = { 'UserId': userId, 'Password': values.password }
            fetch('UpdateUserPwd', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            }).then(async (response) => {
                let res = await response.json();
                if (res.data.Code === '200') {
                    message.success('修改密码成功');
                    getUserInfoList(); //获取用户管理数据
                }
            })
        } else {
            message.warning('两次密码输入不一致');
        }
    };

    //查询姓名或部门
    function searchHandle(event) {
        setSearchInfo(event)
    }

    //查询功能
    function searchOpt() {
        getUserInfoList(); //获取用户管理数据
    }

    //修改状态功能
    function onChangeStatus(checked, userId, index) {
        var userInfoListNew = userInfoList;
        var data = { 'UserId': userId, 'Status': checked === true ? '1' : '0' }
        fetch('UpdateUserStatus', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(async (response) => {
            let res = await response.json();
            if (res.data.Code === '200') {
                userInfoListNew[index].Status = checked === true ? '1' : '0'
                setUserInfoList([])
                setUserInfoList(userInfoListNew)
            }
        })
    }

    return { isModalVisible, userInfoList, searchInfo, userDetail, searchHandle, showModal, handleCancel, onFinish, searchOpt, onChangeStatus }
}

let UserContainer = createContainer(useUser)
export default UserContainer