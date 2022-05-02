import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";
import { message, Modal } from 'antd';
import request from '@/net/api.js'

const useAsset = () => {
    const [deptTreeList, setDeptTreeList] = useState([]); //组织树结构
    const [expandedKeys, setExpandedKeys] = useState([]); //获取树要展开id数组
    const [userInfoList, setUserInfoList] = useState([]); //用户管理
    const [treeId, setTreeId] = useState(''); //树id
    const [userDetail, setUserDetail] = useState({}); //用户详情内容
    const [isModalVisible, setIsModalVisible] = useState(false); //新增/编辑
    const [selectedRowKeys, setSelectedRowKeys] = useState([]); //表格选中数据
    const [searchInfo, setSearchInfo] = useState({
        'Status': '',
        'Name': '',
    }); //查询项

    useEffect(() => {
        getDeptTreeList(); //获取组织树结构数据
    }, [])

    useEffect(() => {
        getUserInfoList(); //获取用户管理数据
    }, [treeId]);

    /** 树模块开始 **/
    //获取组织树结构数据
    function getDeptTreeList() {
        // request.systemOrganization.getDeptTreeList().then((res) => {
        //     if (res.data.Code === '200') {
        //         setDeptTreeList(res.data.List)
        //         // getUserInfoList(); //获取组织表格数据

        //         //获取树要展开的id
        //         let arr = [];
        //         var data = res.data.List;
        //         let loop = (data) => {
        //             data.map((item, index) => {
        //                 arr.push(item.Id);
        //                 if (item.Child && item.Child.length > 0) {
        //                     loop(item.Child)
        //                 }
        //             })
        //         }
        //         loop(data)
        //         setExpandedKeys(arr)
        //     }
        // })
    }
    //选择树节点
    const onTreeSelect = (selectedKeys: React.Key[], info: any) => {
        setTreeId(selectedKeys.toString())
    };
    /** 树模块结束 **/




    /** 用户表格数据开始 **/
    //获取用户管理表格数据
    function getUserInfoList() {
        var obj = {
            'DeptId': treeId,
            'Status': searchInfo.Status,
            'Name': searchInfo.Name
        }
        console.log(obj)
        request.systemUser.getUserInfoList(obj).then((res) => {
            if (res.data.Code === '200') {
                setUserInfoList(res.data.List);
                setSelectedRowKeys([])
            }
        })
    }

    //表格选中函数
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys)
        }
    }

    //删除组织功能
    function deleteDelUserInfo(res) {
        //单个删除
        if (res) {
            const modal = Modal.confirm();
            modal.update({
                title: '删除确认',
                content: '是否确定删除选择的数据',
                onOk: () => {
                    request.systemUser.getDelUserInfo({ 'UserId': res.UserId }).then((res) => {
                        if (res.data.Code === '200') {
                            getUserInfoList(); //获取用户管理列表数据
                        }
                    })
                }
            })
        } else {  //批量删除
            if (selectedRowKeys.length === 0) {
                message.warning('请选择要操作的数据');
                return false;
            }
            request.systemUser.getDelUserInfo({ 'UserId': selectedRowKeys.toString() }).then((res) => {
                if (res.data.Code === '200') {
                    getUserInfoList(); //获取用户管理列表数据
                }
            })
        }
    }
    //重置密码
    function resetPsd(res) {
        console.log('重置密码', res)
        const modal = Modal.confirm();
        modal.update({
            title: '重置密码确认',
            content: '是否确定重置该用户的密码',
            onOk: () => {
                // request.systemOrganization.getDelDept({ 'DeptId': res.DeptId }).then((res) => {
                //     if (res.data.Code === '200') {
                //         getDeptList(); //获取组织表格数据
                //     }
                // })
            }
        })
    }

    //编辑功能
    function editHandle(res) {
        console.log('编辑', res)
        request.systemUser.getUserInfoView({ 'UserId': res.UserId }).then((res) => {
            console.log(res, '编辑信息')
            if (res.data.Code === '200') {
                setUserDetail(res.data.List)
                setIsModalVisible(true);
                // getUserInfoList(); //获取用户管理列表数据
            }
        })
    }

    /** 用户表格数据结束 **/





    /** 新增或编辑用户信息开始 **/
    function SaveOrUpdateUserInfo(data) {
        request.systemUser.getSaveOrUpdateUserInfo(data).then((res) => {
            if (res.data.Code === '200') {
                getUserInfoList(); //获取用户管理数据
                setIsModalVisible(false);
            }
        })
    }
    //新增/编辑-显示
    function showModal() {
        setIsModalVisible(true);
    };
    //新增/编辑-取消
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    //用户新增
    const onFinish = (values: any) => {
        values.Status ? values.Status = '1' : values.Status = '0';
        SaveOrUpdateUserInfo(values)
    };
    /** 新增或编辑用户信息结束 **/




    /** 查询部分开始 **/
    //表格全选功能
    function SelectAll() {
        var arr = [];
        userInfoList.map(item => {
            arr.push(item.UserId)
        })
        setSelectedRowKeys(arr)
    }
    //表格反选功能
    function ReverseSelect() {
        let arr = []
        userInfoList.map((item) => {
            if (selectedRowKeys.indexOf(item.UserId) == -1) {
                arr.push(item.UserId)
            }
        })
        setSelectedRowKeys(arr)
    }
    //查询状态
    function searchHandleStatus(value) {
        setSearchInfo({
            ...searchInfo,
            'Status': value
        })
    }
    //查询用戶名称
    function searchHandle(event) {
        setSearchInfo({
            ...searchInfo,
            'Name': event
        })
    }
    //查询功能
    function searchOpt() {
        getUserInfoList(); //获取用户管理数据
    }
    //重置功能
    function ResetHandle() {
        setSearchInfo({
            'Status': '',
            'Name': '',
        });

    }
    /** 查询部分结束 **/







    return { isModalVisible, deptTreeList, expandedKeys, userInfoList, rowSelection, searchInfo, userDetail, resetPsd, onTreeSelect, deleteDelUserInfo, searchHandle, showModal, handleCancel, SelectAll, ReverseSelect, onFinish, searchOpt, searchHandleStatus, ResetHandle, editHandle }
}

let AssetContainer = createContainer(useAsset)
export default AssetContainer