import React from 'react';
import ProdutionTrialListContainer from '../../container/productioncheck';
import { ProductionTrialListPage } from '../../pages/productioncheck';

export const ProductionCheck = () => {
	return (
		<ProdutionTrialListContainer.Provider>
			<ProductionTrialListPage />
		</ProdutionTrialListContainer.Provider>
	)
}
