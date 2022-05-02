import React from 'react';
import ProductionListContainer from '../../container/productionlist';
import { ProductionListPage } from '../../components/productionlist';

export const ProductionList = () => {
	return (
		<ProductionListContainer.Provider>
			<ProductionListPage />
		</ProductionListContainer.Provider>
	)
}
