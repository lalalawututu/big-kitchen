import React from 'react';
import ProdutionDetailContainer from '../../container/productiondetail';
import { ProductionDetailPage } from '../../pages/productiondetail';

export const ProductionDetail = () => {
	return (
		<ProdutionDetailContainer.Provider>
			<ProductionDetailPage />
		</ProdutionDetailContainer.Provider>
	)
}
