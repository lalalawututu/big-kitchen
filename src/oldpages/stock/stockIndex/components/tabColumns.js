export default {
    // 入库率
    WarehouseList: [
        {
            title: '名称',
            dataIndex: 'Name',
        },
        {
            title: '供货商',
            dataIndex: 'Supplier',
        },
        {
            title: '操作人',
            dataIndex: 'Operator',
        },
        {
            title: '计划用量（吨）',
            dataIndex: 'Consumption',
        },
        {
            title: '实际领料（吨）',
            dataIndex: 'ActualPicking',
        },
        {
            title: '计划入库（吨）',
            dataIndex: 'PlanReturnWarehouse',
        },
        {
            title: '实际入库（吨）',
            dataIndex: 'ActualReturnWarehouse',
        },
        {
            title: '入库率',
            render: obj => <span>{parseInt((obj.ActualReturnWarehouse*10)/(obj.PlanReturnWarehouse*10)/0.01)}%</span>,
        },
    ],

    // 空容率
    Capacity: [
        {
            title: '名称',
            dataIndex: 'Name',
        },
        {
            title: '供货商',
            dataIndex: 'Supplier',
        },
        {
            title: '剩余库存',
            dataIndex: 'RemainingInventory',
        },
        {
            title: '现有库存',
            dataIndex: 'OnHandInventory',
        },
        {
            title: '库存容量',
            dataIndex: 'InventoryCapacity',
        },
        {
            title: '空容率',
            render: obj => <span>{parseInt((obj.OnHandInventory*10)/(obj.InventoryCapacity*10)/0.01)}%</span>,
        },
    ],

    // 库存风险
    InventoryRisk: [
        {
            title: '名称',
            dataIndex: 'Name',
        },
        {
            title: '供货商',
            dataIndex: 'Supplier',
        },
        {
            title: '入库员',
            dataIndex: 'Operator',
        },
        {
            title: '库存量',
            dataIndex: 'Inventory',
        },
        {
            title: '安全库存量',
            dataIndex: 'SafetyInventory',
        },
        {
            title: '缺少量',
            dataIndex: 'MissingQuantity',
        },
    ],

    // 即将过期
    AboutExpire: [
        {
            title: '名称',
            dataIndex: 'Name',
        },
        {
            title: '供货商',
            dataIndex: 'Supplier',
        },
        {
            title: '入库员',
            dataIndex: 'Operator',
        },
        {
            title: '保质期到',
            dataIndex: 'WarrantyDate',
        },
        {
            title: '保质期限',
            dataIndex: 'WarrantyTime',
        },
        {
            title: '过期天数',
            render: obj => <span>{Math.abs(Number(obj.ExpirationDays)).toString()}</span>,
        },
    ],

    // 尚未返库
    ReturnWarehouse: [
        {
            title: '名称',
            dataIndex: 'Name',
        },
        {
            title: '供货商',
            dataIndex: 'Supplier', 
        },
        {
            title: '领料人',
            dataIndex: 'Operator',
        },
        {
            title: '领料量（吨）',
            dataIndex: 'QuantityReceived',
        },
        {
            title: '实际用量（吨）',
            dataIndex: 'ActualDosage',
        },
        {
            title: '返库量（吨）',
            dataIndex: 'StockReturnQuantity',
        },
    ],
}