import React from 'react';
import costContainer from '../../container/cost';
import { CostPage } from '../../pages/cost';

export const Cost = () => {
	return (
		<costContainer.Provider>
			<CostPage />
		</costContainer.Provider>
	)
}
