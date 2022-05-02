import { useState, useEffect } from 'react';
import { createContainer } from "unstated-next";

const useAsset = () => {
    const [deptList, setDeptList] = useState([]); //组织表格数据
    const [deptListModal, setDeptListModal] = useState([]); //组织表格数据-弹框内
    const [isModalVisible, setIsModalVisible] = useState(false); //新增/编辑
    const [searchPeopleData, setSearchPeopleData] = useState(''); //搜索人员条件
    const [selectedPeopleRowKeys, setSelectedPeopleRowKeys] = useState(''); //人员表格选中key数据
    const [selectedPeopleRow, setSelectedPeopleRow] = useState(''); //人员表格选中key数据
    const [isModalVisiblePeople, setIsModalVisiblePeople] = useState(false); //修改执行人弹窗
    const [peopleData, setPeopleData] = useState();  //选择人员表格列
    const [deptId, setDeptId] = useState(); //编辑部门ID
    const [isModalOrganize, setIsModalOrganize] = useState(false); //选择组织弹窗
    const [selectedRowKeysOrganize, setSelectedRowKeysOrganize] = useState([]); //选择组织选中key数据
    const [selectedRowOrganize, setSelectedRowOrganize] = useState([]); //选择组织选中key数据
    const [modalTitle, setModalTitle] = useState(''); //弹窗标题
    const [searchInfo, setSearchInfo] = useState({
        'DeptName': '',
        'DeptNameModal': ''
    }); //查询项
    const [deptDetail, setDeptDetail] = useState({
        'ParentDeptName': '',
        'HeaderName': '',
        'HeaderId': '',
        'ParentDeptId': '',
        'ParentDeptName': '',
    })

    useEffect(() => {
        getDeptList(); //获取组织表格数据 
    }, [])

    //获取组织表格数据
    function getDeptList(resetFlag, sonFlag) {
        var DeptName = sonFlag === 1 ? searchInfo.DeptNameModal : searchInfo.DeptName;
        var searchName = resetFlag ? '' : DeptName;
        //resetFlag 是否重置
        fetch('GetDeptList?DeptName=' + searchName).then(async (response) => {
            if (response.ok) {
                let res = await response.json();
                // setTableData(res.data.List)
                if (sonFlag) {
                    setDeptListModal(res.data.List)
                } else {
                    setDeptList(res.data.List)
                    setDeptListModal(res.data.List)
                }
            }
        })
    }

    //新增组织
    function SaveOrUpdateDept(data) {
        fetch('SaveOrUpdateDept', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(async (response) => {
            let res = await response.json();
            if (res.data.Code === '200') {
                setIsModalVisible(false);
                getDeptList(); //获取组织表格数据
            }
        })
    }

    //新增或编辑部门弹窗-显示
    function showModal() {
        setModalTitle('新增部门'); //弹框名称
        setIsModalVisible(true);
        setDeptDetail({})
    };

    //新增部门保存
    const onFinish = (values: any) => {
        SaveOrUpdateDept(values); //新增部门接口
    };

    //组织表格列表数据
    function searchHandle(event, flag) {
        //flag 1:搜索弹框中的组织信息
        if (flag) {
            setSearchInfo({
                ...searchInfo,
                'DeptNameModal': event
            })
        } else {  //列表页面组织机构搜索功能
            setSearchInfo({
                ...searchInfo,
                'DeptName': event
            })
        }

    }

    //查询功能
    function searchOpt(flag) {
        getDeptList('', flag); //查询组织数据
    }

    //重置功能
    function ResetHandle() {
        setSearchInfo('');
        getDeptList(true); //查询组织数据
    }

    //编辑部门信息
    function editDeptHandle(val) {
        setDeptId(val.DeptId); //编辑的部门id
        setModalTitle('编辑部门'); //弹框名称
        setIsModalVisible(true);

        fetch('GetDeptView?DeptId=' + val.DeptId).then(async (response) => {
            if (response.ok) {
                let res = await response.json();
                setDeptDetail(res.data.List)
            }
        })
    }

    //添加子部门
    function addSonDept(val) {
        setModalTitle('新增子部门'); //弹框名称
        setIsModalVisible(true);
        setDeptDetail([])
        setDeptDetail({
            'ParentDeptName': val.DeptName,
            'ParentDeptId': val.DeptId,
            'sonFlag': true
        })
    }

    //获取负责人接口
    function getEmployeeList() {
        setPeopleData([])
        fetch('GetUserInfoList?Name=' + searchPeopleData).then(async (response) => {
            if (response.ok) {
                let res = await response.json();
                setPeopleData(res.data.List)
                setSelectedPeopleRowKeys([])
            }
        })
    }

    //选择人员函数
    function showModalPeople() {
        setIsModalVisiblePeople(true);
        getEmployeeList(); //选择人员
    };

    //选择负责人确认事件
    function handleOkPeople() {
        var HeaderId = [];
        var HeaderName = [];
        selectedPeopleRow && selectedPeopleRow.map((item, index) => {
            HeaderId.push(item.UserId)
            HeaderName.push(item.Name)
        })
        HeaderId = HeaderId.join(',')
        HeaderName = HeaderName.join(',')
        setIsModalVisiblePeople(false);
        setDeptDetail({
            ...deptDetail,
            'HeaderName': HeaderName,
            'HeaderId': HeaderId
        })
    };

    //选择人员弹框取消功能
    const handleCancelPeople = () => {
        setIsModalVisiblePeople(false);
    };

    //负责人弹框表格选中函数
    const rowPeopleSelection = {
        selectedPeopleRowKeys,
        // selectedPeopleRow,
        onChange: (selectedPeopleRowKeys, selectedPeopleRow) => {
            setSelectedPeopleRowKeys(selectedPeopleRowKeys)
            setSelectedPeopleRow(selectedPeopleRow)
        }
    }

    //负责人弹框-反选功能
    function Reverse() {
        var arr = [];
        // peopleData && peopleData.map(item => {
        //     console.log()
        //     if (selectedPeopleRowKeys.indexOf(item.UserId) == -1) {
        //         arr.push(item.UserId)
        //     }
        // })

        // setSelectedPeopleRowKeys(arr)
        setSelectedPeopleRowKeys([])
        setSelectedPeopleRow([])
        console.log(arr)
    }

    //负责人弹框查询功能
    function searchPeopleInfo(event) {
        setSearchPeopleData(event)
    }

    //搜索人员查询功能
    function searchPeopleClick() {
        getEmployeeList();
    }

    //选择组织函数
    function showModalOrganize() {
        setIsModalOrganize(true);
    };

    //选择组织弹框确认函数
    function handleOkOrganize() {
        var DeptId = [];
        var DeptName = [];
        selectedRowOrganize && selectedRowOrganize.map((item, index) => {
            DeptId.push(item.DeptId)
            DeptName.push(item.DeptName)
        })
        DeptId = DeptId.join(',')
        DeptName = DeptName.join(',')
        setIsModalOrganize(false);
        setDeptDetail({
            ...deptDetail,
            'ParentDeptName': DeptName,
            'ParentDeptId': DeptId
        })
    };

    //隐藏选择组织机构弹框
    const handleCancelOrganize = () => {
        setIsModalOrganize(false);
    };

    //选择组织数据
    const rowSelectionOrganize = {
        // selectedPeopleRow,
        selectedRowKeysOrganize,
        onChange: (selectedRowKeysOrganize, selectedRowOrganize) => {
            setSelectedRowKeysOrganize(selectedRowKeysOrganize)
            setSelectedRowOrganize(selectedRowOrganize)
        }
    }

    return { modalTitle, deptId, isModalVisible, deptListModal, deptList, selectedPeopleRowKeys, deptDetail, searchInfo, peopleData, isModalVisiblePeople, rowPeopleSelection, isModalOrganize, rowSelectionOrganize, setIsModalVisible, searchHandle, getDeptList, showModal, editDeptHandle, SaveOrUpdateDept, onFinish, searchOpt, ResetHandle, showModalPeople, handleOkPeople, handleCancelPeople, Reverse, searchPeopleInfo, searchPeopleClick, showModalOrganize, handleOkOrganize, handleCancelOrganize, addSonDept }
}

let AssetContainer = createContainer(useAsset)
export default AssetContainer