import React from 'react';
import { GroupAttendancePage } from '../../components/groupAttendance';
import perfContainer from "../../container/performance";

export const GroupAttendance = () => {
	return (
		<perfContainer.Provider>
			<GroupAttendancePage />
		</perfContainer.Provider>
	)
}
