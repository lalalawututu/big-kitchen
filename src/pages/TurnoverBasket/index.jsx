import TurnoverBasketIndex from '../../components/TurnoverBasket/index'
import TurnoverBasketContainer from '@/container/TurnoverBasket'

export default function TurnoverBasket() {
  return (
    <TurnoverBasketContainer.Provider>
        <TurnoverBasketIndex />
    </TurnoverBasketContainer.Provider>
  )
}

