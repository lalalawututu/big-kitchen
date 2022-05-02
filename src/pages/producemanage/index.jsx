import React from 'react';
import ProduceManageContainer from '../../container/producemanage';
import { ProduceManagePage } from '../../components/producemanage';

const ProduceManage = () => {
	return (
		<ProduceManageContainer.Provider>
			<ProduceManagePage />
		</ProduceManageContainer.Provider>
	)
}

export default ProduceManage
