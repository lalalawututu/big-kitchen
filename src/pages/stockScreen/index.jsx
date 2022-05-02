import React from 'react';
import StockScreenContainer from '../../container/stockScreen';
import { StockScreenPage } from '../../components/stockScreen';

export const StockScreen = () => {
	return (
		<StockScreenContainer.Provider>
			<StockScreenPage />
		</StockScreenContainer.Provider>
	)
}
