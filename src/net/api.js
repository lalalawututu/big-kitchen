import http from "./http.js"
const { GET, POST, PUT, DELETE } = http
export default {
	// 首页
	index: {
		// 获取列表
		getList: () => GET("/getList"),
	},
	//仓库
	stock: {
		getStockIndex: data => GET("/getStockIndex", data),
	},
	//质检模块
	quality: {
		getPlanList: data => GET("/GetQualityPlanList", data), //质检计划列表
		qualityApprovalAll: data => POST("/QualityApprovalAll", data), //质检计划列表-批量审核
		qualityWithdrawAll: data => POST("/QualityWithdrawAll", data), //质检计划列表-批量撤回
		qualityWithdraw: data => GET('/QualityWithdraw', data), //质检计划列表-单个撤回
		getDetailList: data => GET("/GetDetailList", data),  //质检计划审批列表
		getQualityApprovePass: data => POST("/GetQualityApprovePass", data), //质检计划审批列表-审核通过
		getInspectorInfo: data => GET("/GetInspectorInfo", data), //质检计划审批列表-修改检验人信息
		getQualityListExcel: data => GET("/GetQualityListExcel", data), //质检计划查看列表-导出Excel
	},
	//生产模块
	production: {
		getPlanList: data => GET(`/GetPlanList${data}`), //生产计划列表 GetPlanList/:PLanType/:pageSize/:pageNum
		getExaminePlan: data => POST('/ExaminePlan', data), //生产计划审批接口
		getWithdrawPlan: data => POST('/WithdrawPlan', data), //生产计划撤回接口
		getPlanTaskList: data => GET('/GetPlanTaskList', data), //生产计划审批列表接口
		getProductTaskView: data => GET(`/GetProductTaskView/${data}`), //生产计划详情页面
		getEmployeeList: data => GET('/getEmployeeList', data), //选择人员
		getChangeTaskEmployee: data => POST('/ChangeTaskEmployee', data), //修改执行人确认函数
		getProductIndexTitle: data => GET('/ProductIndexTitle'), //生产计划首页计划总信息
	},
	//基础数据模块-供货商管理
	basicSupplier: {
		getSupplierList: data => GET('/GetSupplierList', data), //供货商管理列表
		getSupplierView: data => GET('/GetSupplierView', data), //供应商管理详情
		getSaveOrUpdateSupplier: data => POST('/SaveOrUpdateSupplier', data), //供应商管理新增或编辑接口
		getDelSupplierById: data => POST('/DelSupplierById', data),//供应商管理删除接口
	},
	//基础数据模块-人员管理
	basicPersonnel: {
		getEmployeeList: data => GET('/getEmployeeList', data), //人员管理列表接口
		getUpdateEmployeePosition: data => PUT(`/UpdateEmployeePosition/${data}`), //修改员工的岗位信息
		getEmployee: data => GET(`/GetEmployee/${data}`), //人员管理查看详情
		getSaveOrUpdateEmployee: data => POST('/SaveOrUpdateEmployee', data), //新增人员
		getDelEmployeeById: data => POST('/DelEmployeeById', data),//人员管理删除接口
	},
	//基础数据模块-物料管理
	basicMaterial: {
		getMaterialList: data => GET('/GetMaterialList', data), //物料管理列表接口
		getSaveOrUpdateMaterial: data => POST('/SaveOrUpdateMaterial', data), //物料管理新增或编辑接口
		getDelMaterialById: data => POST('/DelMaterialById', data), //物料管理删除接口
		getMaterialView: data => GET('/GetMaterialView', data), //物流管理详情接口
	},
	//基础数据模块-质检标准管理
	basicQuality: {
		getQualityStandardList: data => GET('/GetQualityStandardList', data), //质检标准管理列表
		getSaveOrUpdateQualityStandard: data => POST('/SaveOrUpdateQualityStandard', data), //质检管理新增或编辑接口
		getDelQualityStandardById: data => POST('/DelQualityStandardById', data), //质检管理删除接口
		getQualityStandardView: data => GET('/GetQualityStandardView', data), //质检管理详情
	},
	//基础数据模块-车间模块
	basicWorkshop: {
		getWorkShopList: data => GET('/GetWorkShopList', data), //车间模块列表
		getSaveOrUpdateWorkShop: data => POST('/SaveOrUpdateWorkShop', data), //车间管理新增或编辑接口
		getDelWorkShopById: data => POST('/DelWorkShopById', data), //车间管理删除接口
		getWorkShopView: data => GET('/GetWorkShopView', data), //车间管理详情
	},
	//基础数据模块-班组模块
	basicTeam: {
		getTeamList: data => GET('/GetTeamList', data), //班组模块列表
		getSaveOrUpdateTeam: data => POST('/SaveOrUpdateTeam', data), //班组管理新增或编辑接口
		getDelTeamById: data => POST('/DelTeamById', data), //班组管理删除接口
		getTeamView: data => GET('/GetTeamView', data), //班组管理详情
	},
	//基础数据模块-品牌模块
	basicBrand: {
		getBrandList: data => GET('/GetBrandList', data), //品牌模块列表
		getSaveOrUpdateBrand: data => POST('/SaveOrUpdateBrand', data), //品牌管理新增或编辑接口
		getDelBrandById: data => POST('/DelBrandById', data), //品牌管理删除接口
		getBrandView: data => GET('/GetBrandView', data), //品牌管理详情
	},
	//基础数据模块-资产模块
	basicAsset: {
		getAssetsList: data => GET('/GetAssetsList', data), //资产模块列表
		getSaveOrUpdateAssets: data => POST('/SaveOrUpdateAssets', data), //资产管理新增或编辑接口
		getDelAssetsById: data => POST('/DelAssetsById', data), //资产管理删除接口
		getAssetsView: data => GET('/GetAssetsView', data), //资产管理详情
	},
	//基础数据模块-资产设备模块
	basicAssetEquipment: {
		getAssetsEquipmentList: data => GET('/GetAssetsEquipmentList', data), //资产设备模块列表
		getSaveOrUpdateAssetsEquipment: data => POST('/SaveOrUpdateAssetsEquipment', data), //资产设备管理新增或编辑接口
		getDelAssetsEquipmentById: data => POST('/DelAssetsEquipmentById', data), //资产设备管理删除接口
		getAssetsEquipmentView: data => GET('/GetAssetsEquipmentView', data), //资产设备管理详情
	},
	//基础数据模块-角色管理
	basicRole: {
		getRoleList: data => GET('/GetRoleList', data), //角色模块列表
		getSaveOrUpdateRole: data => POST('/SaveOrUpdateRole', data), //角色管理新增或编辑接口
		getDelRoleById: data => POST('/DelRoleById', data), //角色管理删除接口
		getRoleView: data => GET('/GetRoleView', data), //角色管理详情
	},
	//能源能耗
	energy: {
		getConsumeRecordList: data => GET('/GetConsumeRecordList', data), //能源能耗大屏C-折线图
		getConsumeList: data => GET('/GetConsumeList', data), //能源能耗大屏C-消耗
		getEnergyConsumeMonitor: data => GET('/GetEnergyConsumeMonitor', data), //能源能耗列表
	},
	//系统管理-组织机构管理
	systemOrganization: {
		getDeptList: data => GET('/GetDeptList', data), //组织表格数据
		getSaveOrUpdateDept: data => POST('/SaveOrUpdateDept', data), //新增部门
		getDeptView: data => GET('/GetDeptView', data), //编辑部门
	},
	//系统管理-用户管理
	systemUser: {
		getUserInfoList: data => GET('/GetUserInfoList', data), //用户表格数据
		getUpdateUserPwd: data => POST('/UpdateUserPwd', data), //重置密码
		getUpdateUserStatus: data => POST('/UpdateUserStatus', data), //修改状态
	},
	//系统管理-菜单管理
	systemMenu:{
		getMenuInfoList: data => GET('/GetMenuInfoList', data), //菜单管理列表
		getSaveOrUpdateMenuInfo: data => POST('/SaveOrUpdateMenuInfo', data), //菜单管理新增或编辑接口
		getDelMenuInfo: data => POST('/DelMenuInfo', data), //菜单管理删除接口
		getMenuInfoView: data => GET('/GetMenuInfoView', data), //菜单管理详情
	}

}