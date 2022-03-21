import React from 'react';
import groupYieldContainer from '../../container/groupYield';
import { GroupYieldPage } from '../../pages/groupYield';

export const GroupYield = () => {
	return (
		<groupYieldContainer.Provider>
			<GroupYieldPage />
		</groupYieldContainer.Provider>
	)
}
