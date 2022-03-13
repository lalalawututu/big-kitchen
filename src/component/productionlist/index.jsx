import React from 'react';
import ProdutionListContainer from '../../container/productionlist';
import { ProductionListPage } from '../../pages/productionlist';

export const ProductionList = () => {
	return (
		<ProdutionListContainer.Provider>
			<ProductionListPage />
		</ProdutionListContainer.Provider>
	)
}
