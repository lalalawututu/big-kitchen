import React from 'react'
import FrmLossIndex from '../../components/frmLoss/index'
import frmLossContainer from '@/container/frmLoss'

export default function FrmLoss() {
  return (
    <frmLossContainer.Provider>
      <FrmLossIndex />
    </frmLossContainer.Provider>
  )
}

