import React from 'react';
import groupYieldContainer from '../../container/groupYield';
import { GroupYieldPage } from '../../components/groupYield';

export const GroupYield = () => {
	return (
		<groupYieldContainer.Provider>
			<GroupYieldPage />
		</groupYieldContainer.Provider>
	)
}
