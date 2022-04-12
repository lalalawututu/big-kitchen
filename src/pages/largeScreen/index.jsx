import React from 'react';
import LargeScreenContainer from '../../container/largeScreen';
import { LargeScreenPage } from '../../components/largeScreen';

export const LargeScreen = () => {
	return (
		<LargeScreenContainer.Provider>
			<LargeScreenPage />
		</LargeScreenContainer.Provider>
	)
}
