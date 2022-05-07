import React from 'react';
import screenLogisticsContainer from '../../container/screenLogistics';
import { ScreenLogisticsPage } from '../../components/screenLogistics';

export const ScreenLogistics = () => {
	return (
		<screenLogisticsContainer.Provider>
			<ScreenLogisticsPage />
		</screenLogisticsContainer.Provider>
	)
}
