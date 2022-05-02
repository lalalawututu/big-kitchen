import React from 'react';
import WorkMangeContainer from '../../container/workmange';
import { WorkMangePage } from '../../components/workmange';

export const WorkManage = () => {
	return (
		<WorkMangeContainer.Provider>
			<WorkMangePage />
		</WorkMangeContainer.Provider>
	)
}
