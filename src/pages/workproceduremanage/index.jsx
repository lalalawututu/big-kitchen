import React from 'react';
import WorkMangeContainer from '../../container/workmange';
import {WorkProcedureManage} from "../../components/workproceduremanage";

export const WorkProcedureManagePage = () => {
	return (
		<WorkMangeContainer.Provider>
			<WorkProcedureManage />
		</WorkMangeContainer.Provider>
	)
}
