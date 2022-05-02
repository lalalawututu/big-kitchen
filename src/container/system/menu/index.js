import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";
import { Modal } from 'antd';

const useMenu = () => {
    const [tableData, setTableData] = useState([]);  //表格数据
    const [isModalVisible, setIsModalVisible] = useState(false); //新增或者编辑菜单弹框
    const [modalTitle, setModalTitle] = useState(''); //弹窗标题
    const [menuDetail, setDenuDetail] = useState({}); //菜单详情

    useEffect(() => {
        getTableData(); //获取菜单管理列表数据
    }, [])

    //获取菜单管理列表数据
    function getTableData() {
        setTableData([]); //清空数据
        fetch('GetMenuInfoList').then(async (response) => {
            if (response.ok) {
                let res = await response.json();
                if (res.data.Code === '200') {
                    setTableData(res.data.List)
                }
            }
        })
    }

    //菜单新增或编辑功能
    function SaveOrUpdateMenuInfo(data) {
        fetch('SaveOrUpdateMenuInfo', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(async (response) => {
            let res = await response.json();
            if (res.data.Code === '200') {
                getTableData(); //获取菜单管理列表数据
                setIsModalVisible(false);
            }
        })
    }

    //菜单编辑功能
    function editMenu(res) {
        setModalTitle('菜单编辑'); //弹框名称
        setIsModalVisible(true);
        fetch('GetMenuInfoView?MenuId=' + res.MenuId).then(async (response) => {
            if (response.ok) {
                let res = await response.json();
                if (res.data.Code === '200') {
                    setDenuDetail(res.data.List)
                }
            }
        })
    }

    //菜单删除功能
    function deleteMenu(res) {
        const modal = Modal.confirm();
        modal.update({
            title: '删除确认',
            content: '是否确定删除选择的数据',
            onOk: () => {
                fetch('DelMenuInfo', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({ 'MenuId': res.MenuId })
                }).then(async (response) => {
                    let res = await response.json();
                    if (res.data.Code === '200') {
                        getTableData(); //获取菜单管理列表数据
                    }
                })
            }
        })
    }

    //添加或者编辑菜单-显示
    function showModal() {
        setModalTitle('菜单录入'); //弹框名称
        setIsModalVisible(true);
    };

    //添加或者编辑菜单-取消
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    //添加或者编辑菜单-保存
    const onFinish = (values: any) => {
        SaveOrUpdateMenuInfo(values); //新增部门接口
    };

    return { tableData, modalTitle, isModalVisible, menuDetail, showModal, handleCancel, onFinish, editMenu, deleteMenu }
}

let MenuContainer = createContainer(useMenu)
export default MenuContainer