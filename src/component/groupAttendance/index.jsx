import React from 'react';
import groupAttendanceContainer from '../../container/groupAttendance';
import { GroupAttendancePage } from '../../pages/groupAttendance';

export const GroupAttendance = () => {
	return (
		<groupAttendanceContainer.Provider>
			<GroupAttendancePage />
		</groupAttendanceContainer.Provider>
	)
}
