import React from 'react';
import WorkMangeContainer from '../../container/workmange';
import { WorkMangePage } from '../../pages/workmange';

export const WorkMange = () => {
	return (
		<WorkMangeContainer.Provider>
			<WorkMangePage />
		</WorkMangeContainer.Provider>
	)
}
