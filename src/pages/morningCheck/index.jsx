//晨检
import MorningCheckIndex from '../../components/morningCheck'
import MorningCheckContainer from '../../container/morningCheck'

export default function MorningCheck() {
  return (
    <MorningCheckContainer.Provider>
      <MorningCheckIndex />
    </MorningCheckContainer.Provider>
  )
}
