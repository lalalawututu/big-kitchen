import React from 'react'
import VoucherIndex from '../../components/voucher/index'
import voucherContainer from '@/container/voucher'

export default function voucher() {
  return (
    <voucherContainer.Provider>
      <VoucherIndex />
    </voucherContainer.Provider>
  )
}

