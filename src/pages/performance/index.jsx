import React from 'react';
import { PerformancePage } from '../../components/performance';
import perfContainer from "../../container/performance";

export const Performance = () => {
	return (
		<perfContainer.Provider>
			<PerformancePage />
		</perfContainer.Provider>
	)
}
