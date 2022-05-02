import React from 'react';
import costContainer from '../../container/cost';
import CostPage from '../../components/cost';

const Cost = () => {
	return (
		<costContainer.Provider>
			<CostPage />
		</costContainer.Provider>
	)
}

export default Cost
