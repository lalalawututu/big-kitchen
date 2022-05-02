import { useState } from 'react';
import { createContainer } from "unstated-next";
import { useMount, getParameterByName } from '../../utils';
import {Sync_Server} from "../../common";

const apiGetCraftList = Sync_Server + "/data/blockchain?model=craft"

const useWorkCreate = () => {
	const [craft, setCraft] = useState({});
	let workId = getParameterByName('id')

	useMount(() => {
		fetch(`${apiGetCraftList}`).then(async (response) => {
			if (response.ok) {
				let dataJson = await response.json()
				// console.log(dataJson.content)
				let planList = JSON.parse(dataJson.content)
				// console.log(planList)
				planList.craft.forEach((item: any, index: any) => {
					// console.log(item)
					if (item.workmanship_id === workId) {
						let WorkingHours = 0;
						if (item.working_procedure) {
							let WorkingProcedure = item.working_procedure;
							WorkingProcedure.forEach((item:any, index:any) => {
								WorkingHours += item.duration
							})
						}
						let workInfor = {
							key: index,
							WorkmanshipId: item.workmanship_id,
							WorkmanshipName: item.workmanship_name,
							FinishedProduct: item.finished_product,
							WorkmanshipContent: item.workmanship_content,
							ProcedureQuantity: item.working_procedure.length,
							FinishedProductSpecification: 'kg',
							WorkingHours: WorkingHours/60 + '分钟',
							Qualified_rate: item.qualified_rate,
							working_procedure: item.working_procedure,
						}
						setCraft(workInfor)
					}
				});
			}
		});
	})
	return {craft, setCraft}
}

let WorkCreateContainer = createContainer(useWorkCreate)
export default WorkCreateContainer
