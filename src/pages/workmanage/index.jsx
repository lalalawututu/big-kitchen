import React from 'react';
import WorkManageContainer from '../../container/workmanage';
import { WorkManagePage } from '../../components/workmanage';

export const WorkManage = () => {
	return (
		<WorkManageContainer.Provider>
			<WorkManagePage />
		</WorkManageContainer.Provider>
	)
}
