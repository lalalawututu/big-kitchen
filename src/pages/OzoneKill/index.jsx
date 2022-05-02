import React from 'react'
import OzoneKillIndex from '../../components/OzoneKill/index'
import ozoneKillContainer from "../../container/OzoneKill";

export default function OzoneKill() {
  return (
      <ozoneKillContainer.Provider>
        <div>
            <OzoneKillIndex />
        </div>
      </ozoneKillContainer.Provider>
  )
}

