import React from 'react'
import WorkCreate from "../../components/workcreate";
import WorkCreateContainer from "../../container/workcreate";

export default function WorkCreatePage() {
	return (
		<WorkCreateContainer.Provider>
			<div>
				<WorkCreate />
			</div>
		</WorkCreateContainer.Provider>
	)
}
