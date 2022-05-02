import React from 'react';
import { GroupHourPage } from '../../components/groupHour';
import perfContainer from "../../container/performance";

export const GroupHour = () => {
	return (
		<perfContainer.Provider>
			<GroupHourPage />
		</perfContainer.Provider>
	)
}
