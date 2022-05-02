import React from 'react';
import ProdutionTrialListContainer from '../../container/productioncheck';
import { ProductionTrialListPage } from '../../components/productioncheck';

export const ProductionCheck = () => {
	return (
		<ProdutionTrialListContainer.Provider>
			<ProductionTrialListPage />
		</ProdutionTrialListContainer.Provider>
	)
}
