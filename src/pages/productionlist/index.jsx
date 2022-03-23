import React from 'react';
import ProdutionListContainer from '../../container/productionlist';
import { ProductionListPage } from '../../components/productionlist';

export const ProductionList = () => {
	return (
		<ProdutionListContainer.Provider>
			<ProductionListPage />
		</ProdutionListContainer.Provider>
	)
}
