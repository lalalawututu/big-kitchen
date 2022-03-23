import { useState } from 'react'
import { createContainer } from "unstated-next"
import { useMount } from '../../utils/index.ts'

const apiBuyUrl = process.env.REACT_APP_API_BUYEURL
const apiPurchaseUrl = process.env.REACT_APP_API_PURCHASEURL

const useMange = () => {
  const [data, setData] = useState([])
  const [purchaseData, setPurchaseData] = useState([])
  const [purchase, setPurchase] = useState(true)
  const [buy, setBuy] = useState(false)
  const [people, setPeople] = useState(false)

  useMount(() => {
    fetch(`${apiBuyUrl}`).then(async (response) => {
      if (response.ok) {
        let dataJson = await response.json()
        console.log(dataJson)
        let planList = dataJson.data.List
        let data = []
        planList.forEach((item, index) => {
          let panInfo = {
            key: item.order_id,
            order_id: item.order_id,
            client_name: item.client_name,
            client_address: item.client_address,
            quantity: item.quantity,
            name: item.name,
            date: item.date,
          }
          data.push(panInfo)
        })

        setData(data)
      }
    })
    fetch(`${apiPurchaseUrl}`).then(async (response) => {
      if (response.ok) {
        let dataJson = await response.json()
        console.log(dataJson)
        let planList = dataJson.data.List
        let data = []
        planList.forEach((item, index) => {
          let panInfo = {
            key: item.order_id,
            order_id: item.order_id,
            client_name: item.client_name,
            client_address: item.client_address,
            quantity: item.quantity,
            recieved_quantity: item.recieved_quantity,
            name: item.name,
            date: item.date,
          }
          data.push(panInfo)
        })

        setPurchaseData(data)
      }
    })
  })

  const switchPurchase = () => {
    setPurchase(true)
    setBuy(false)
    setPeople(false)
  }

  const switchBuy = () => {
    setPurchase(false)
    setBuy(true)
    setPeople(false)
  }

  const switchPeople = () => {
    setPurchase(false)
    setBuy(false)
    setPeople(true)
  }

  return { data, purchaseData, purchase, buy, people, setData, switchPurchase, switchBuy, switchPeople }
}

let ThirdPartyManageContainer = createContainer(useMange)
export default ThirdPartyManageContainer
