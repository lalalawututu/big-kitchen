// 仓库列表接口（请求传参数据字段）(字段为空默认请求全部数据)
const params = {
    selectWarehouse: "0",           //选择仓库 string  0-全部 1-原料库 2-热加工库 3-调料包库 4-包材库 5-耗材库 6-调料库 7-周转筐
    setTime: ['2022-01-08', '2022-01-09'],       //设置时间  Array 时间区间  当区间内只有一天时,例:['2022-01-08', '2022-01-08']
    warehouseTime: "5",                        //库存时间  string   表示5天以上
    qualityTime: "30",                           //保质期   string   表示30天以上
    supplier: "寿光永达农场",                     //供货商   string
    quick: "0",                     //快捷筛选 string  0-只看库存不足 1-只看过期 2-只看返库 3-只看未入库 4-只看未出库
    current: 1,                      //当前页码 Number
    pageSize: 10,                   //每页条数 Number
}


//仓库列表接口（返回数据字段）
const list = [{
    id: '1',
    name: "西红柿",           //名称  string
    supplier: "寿光永达农场", //供货商  string
    warehouse: "原料库",       //所属仓库  string
    inventoryCompany: "1",   //库存量（吨）  Number/string
    inventory: "365箱(单位)",   //库存量  string
    inventoryRisk: "2",          //库存风险（吨）  Number/string
    surplusTime: "2",          //剩余保质期（天）  Number/string
    ReturnWarehouse: true,      //返库  Boolean
    planWarehousing: "20220412",          //计划入库时间  string
    actualWarehousing: "20220412",          //实际入库时间  string
    planExWarehousing: "20220412",          //计划出库时间  string
    actualExWarehousing: "20220412",          //实际出库时间  string
    warehousingStaff: "张三",               //入库员工  string
}]