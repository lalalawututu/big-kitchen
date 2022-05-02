import React from 'react';
import { GroupYieldPage } from '../../components/groupYield';
import perfContainer from "../../container/performance";

export const GroupYield = () => {
	return (
		<perfContainer.Provider>
			<GroupYieldPage />
		</perfContainer.Provider>
	)
}
