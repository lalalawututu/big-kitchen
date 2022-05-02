import React from 'react';
import SwipeCardContainer from '../../container/swipeCard';
import { SwipeCardPage } from '../../components/swipeCard';

export const SwipeCardBoard = () => {
	return (
		<SwipeCardContainer.Provider>
			<SwipeCardPage />
		</SwipeCardContainer.Provider>
	)
}
