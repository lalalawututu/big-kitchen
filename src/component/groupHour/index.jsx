import React from 'react';
import groupHourContainer from '../../container/groupHour';
import { GroupHourPage } from '../../pages/groupHour';

export const GroupHour = () => {
	return (
		<groupHourContainer.Provider>
			<GroupHourPage />
		</groupHourContainer.Provider>
	)
}
