import React from 'react';
import ProduceManageContainer from '../../container/producemanage';
import { ProduceManagePage } from '../../components/producemanage';

export const ProduceManage = () => {
	return (
		<ProduceManageContainer.Provider>
			<ProduceManagePage />
		</ProduceManageContainer.Provider>
	)
}
