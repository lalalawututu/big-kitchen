import {useState} from 'react'
import {createContainer} from "unstated-next"
import {getAnchorModel, useMount} from '../../utils'
import {APS_Server, Sync_Server} from "../../common";

const syncWithErp = Sync_Server + "/data/erp"
const syncWithOa = Sync_Server + "/data/oa"
const syncWithTMS = Sync_Server + "/data/tms"
const getDataFromBlockchain = Sync_Server + "/data/blockchain?model="
const getPurchaseDemand = APS_Server + "/data/blockchain/pdemand"
const sendPriceUrl = APS_Server + "/data/blockchain/sendprice"
const getPriceUrl = APS_Server + "/data/blockchain/price"

const useManage = () => {
  const [skuData, setSkuData] = useState([])
  const [ordersData, setOrdersData] = useState([])
  const [purchaseData, setPurchaseData] = useState([])
  const [priceData, setPriceData] = useState([])
  const [customerData, setCustomerData] = useState([])
  const [employeeData, setEmployeeData] = useState([])
  const [supplierData, setSupplierData] = useState([])
  const [demandData, setDemandData] = useState([])
  const [purchase, setPurchase] = useState(false)
  const [orders, setOrders] = useState(true)
  const [sku, setSku] = useState(false)
  const [people, setPeople] = useState(false)
  const [demand, setDemand] = useState(false)
  const [customer, setCustomer] = useState(false)
  const [supplier, setSupplier] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState('2')

  useMount(() => {
    const model = getAnchorModel()
    if (model === 'orders'){
      switchOrders()
    }else if (model === 'customer'){
      switchCustomer()
    }else if (model === 'demand'){
      switchDemand()
    }else if (model === 'employee'){
      switchPeople()
    }else if (model === 'supplier'){
      switchSupplier()
    }else if (model === 'sku'){
      switchSku()
    }else if (model === 'purchase'){
      switchPurchase()
    }
  })

  const get_orders = () => {
    let url = getDataFromBlockchain + "orders"
    fetch(`${url}`).then(async (response) => {
      if (response.ok) {
        let dataJson = await response.json()
        // console.log(dataJson.content)
        let planList = JSON.parse(dataJson.content)
        // console.log(planList)
        let data = []
        planList.orders.forEach((item, index) => {
          item.detail.forEach((detail) => {
            let panInfo = {
              key: item.order_id + detail.order_detail_id,
              order_id: item.order_id,
              client_name: item.project_id,
              SKU: detail.sku_code,
              client_address: item.dk_id,
              quantity: detail.quantity,
              name: detail.note,
              date: item.date,
            }
            data.push(panInfo)
          })
        })

        setOrdersData(data)
      }
    })
  }

  const get_customers = () => {
    let url = getDataFromBlockchain + "customers"
    fetch(`${url}`).then(async (response) => {
      if (response.ok) {
        let dataJson = await response.json()
        // console.log(dataJson.content)
        let planList = JSON.parse(dataJson.content)
        // console.log(planList)
        let data = []
        planList.customers.forEach((item, index) => {
            let panInfo = {
              key: item.company_id,
              company_name: item.company_name,
              project_name: item.project_name,
              dk_name: item.dk_name,
              project_address: item.project_address,
              project_contact: item.project_contact,
              project_phone: item.project_phone,
              dk_contact: item.dk_contact,
              dk_phone: item.dk_phone,
            }
            data.push(panInfo)
        })

        setCustomerData(data)
      }
    })
  }

  const get_suppliers = () => {
    let url = getDataFromBlockchain + "suppliers"
    fetch(`${url}`).then(async (response) => {
      if (response.ok) {
        let dataJson = await response.json()
        // console.log(dataJson.content)
        let planList = JSON.parse(dataJson.content)
        // console.log(planList)
        let data = []
        const min = 1;
        const max = 100;
        const rand = min + Math.random() * (max - min);
        planList.suppliers.forEach((item, index) => {
          let panInfo = {
            key: item.supplier_id,
            supplier_name: item.supplier_name,
            brand_name: item.brand_name,
            address: item.address,
            linkman: item.linkman,
            phone: item.phone,
            landline: item.landline,
            email: item.email,
            dk_phone: item.dk_phone,
            score: rand,
          }
          data.push(panInfo)
        })

        setSupplierData(data)
      }
    })
  }

  const get_sku = () => {
    let url = getDataFromBlockchain + "sku"
    fetch(`${url}`).then(async (response) => {
      if (response.ok) {
        let dataJson = await response.json()
        // console.log(dataJson.content)
        let planList = JSON.parse(dataJson.content)
        // console.log(planList)
        let data = []
        planList.material.forEach((item, index) => {
          let panInfo = {
            key: item.sku_code,
            sku_code: item.sku_code,
            sku_name: item.sku_name,
            sku_spec: item.sku_spec,
            sku_uom: item.sku_uom,
            sku_brand: item.sku_brand,
            sku_type: item.sku_type,
          }
          data.push(panInfo)
        })

        setSkuData(data)
      }
    })
  }

  const get_employees = () => {
    let url = getDataFromBlockchain + "employees"
    fetch(`${url}`).then(async (response) => {
      if (response.ok) {
        let dataJson = await response.json()
        console.log(dataJson.content)
        let planList = JSON.parse(dataJson.content)
        // console.log(planList)
        let data = []
        planList.forEach((item) => {
          let panInfo = {
            key: item.employee_id,
            name: item.name,
            mobile_phone: item.mobile_phone,
            gender: item.gender,
            identity: item.identity,
            department: item.department,
          }
          data.push(panInfo)
        })

        setEmployeeData(data)
      }
    })
  }

  const get_demand = () => {
    let url = getDataFromBlockchain + "demands"
    fetch(`${url}`).then(async (response) => {
      if (response.ok) {
        let dataJson = await response.json()
        console.log(dataJson.content)
        let planList = JSON.parse(dataJson.content)
        // console.log(planList)
        let data = []
        planList.forEach((item) => {
          let panInfo = {
            key: item.sku_code,
            sku_code: item.sku_code,
            amount: item.amount,
            process_order: item.process_order,
            is_raw: item.is_raw ? '是' : '否',
          }
          data.push(panInfo)
        })

        setDemandData(data)
      }
    })
  }

  const get_purchase = () => {
    fetch(`${getPurchaseDemand}`).then(async (response) => {
      if (response.ok) {
        let dataJson = await response.json()
        // console.log(dataJson.content)
        let purchase = JSON.parse(dataJson.content)
        // console.log(planList)
        let data = []
        purchase.oroderDetail.forEach((item2) => {
          let panInfo = {
            key: item2.skuCode,
            date: purchase.date,
            sku_code: item2.skuCode,
            amount: item2.quantity,
            price: item2.price,
            supplier: purchase.supplierId,
            delivery_period: purchase.deliveryPeriod[0],
            driver: purchase.driver.name,
          }
          data.push(panInfo)
        })

        setPurchaseData(data)
      }
    })
  }

  const get_prices = () => {
    fetch(`${getPriceUrl}`).then(async (response) => {
      if (response.ok) {
        let dataJson = await response.json()
        // console.log(dataJson.content)
        let prices = JSON.parse(dataJson.content)
        console.log(prices)
        let data = []
        prices.forEach((item) => {
          item.oroderDetail.forEach((item2) => {
            let panInfo = {
              key: item2.skuCode,
              date: item.date,
              sku_code: item2.skuCode,
              amount: item2.quantity,
              price: item2.price,
              supplier: item.supplierId,
              delivery_period: item.deliveryPeriod[0],
              driver: item.driver.name,
              car: item.driver.carNo,
              phone: item.driver.phone,
            }
            data.push(panInfo)
          })
        })

        setPriceData(data)
      }
    })
  }

  const sendPrice = async () => {
    const response = await fetch(`${sendPriceUrl}`);
    if (response.ok) {
      let dataJson = await response.json()
      console.log(dataJson)
    }
  }
  const importOAData = async () => {
    const response = await fetch(`${syncWithOa}`);
    if (response.ok) {
      let dataJson = await response.json()
      console.log(dataJson)
    }
  }
  const switchPurchase = () => {
    setPurchase(true)
    setOrders(false)
    setPeople(false)
    setDemand(false)
    setCustomer(false)
    setSupplier(false)
    setSku(false)
    get_purchase()
    get_prices()
    setSelectedMenu('1')
  }

  const switchOrders = () => {
    setPurchase(false)
    setOrders(true)
    setPeople(false)
    setDemand(false)
    setCustomer(false)
    setSupplier(false)
    setSku(false)
    get_orders()
    setSelectedMenu('2')
  }

  const switchPeople = () => {
    setPurchase(false)
    setOrders(false)
    setPeople(true)
    setDemand(false)
    setCustomer(false)
    setSupplier(false)
    setSku(false)
    get_employees()
    setSelectedMenu('3')
  }

  const switchDemand = () => {
    setPurchase(false)
    setOrders(false)
    setPeople(false)
    setDemand(true)
    setCustomer(false)
    setSupplier(false)
    setSku(false)
    get_demand()
    setSelectedMenu('8')
  }

  const switchCustomer = () => {
    setPurchase(false)
    setOrders(false)
    setPeople(false)
    setDemand(false)
    setCustomer(true)
    setSupplier(false)
    setSku(false)
    get_customers()
    setSelectedMenu('6')
  }

  const switchSupplier = () => {
    setPurchase(false)
    setOrders(false)
    setPeople(false)
    setDemand(false)
    setCustomer(false)
    setSupplier(true)
    setSku(false)
    get_suppliers()
    setSelectedMenu('7')
  }

  const switchSku = () => {
    setPurchase(false)
    setOrders(false)
    setPeople(false)
    setDemand(false)
    setCustomer(false)
    setSupplier(false)
    setSku(true)
    get_sku()
    setSelectedMenu('9')
  }

  return {
    ordersData, purchaseData, customerData, supplierData, skuData, demandData, employeeData, priceData,
    supplier, purchase, orders, people, demand, sku, customer,
    switchPurchase, switchOrders, switchPeople, switchDemand, switchCustomer, switchSupplier,
    switchSku, sendPrice, importOAData, selectedMenu
  }
}

let ThirdPartyMangeContainer = createContainer(useManage)
export default ThirdPartyMangeContainer
