import React from 'react';
import { PerfPage } from '../../components/perf';
import perfContainer from "../../container/perf";

export const Perf = () => {
	return (
		<perfContainer.Provider>
			<PerfPage />
		</perfContainer.Provider>
	)
}
