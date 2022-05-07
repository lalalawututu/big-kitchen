import WorkMangeContainer from '../../container/workproceduremanage/addEdit';
import WorkProcedureManage from "../../components/workproceduremanage/addEdit";

const WorkProcedureManagePage = () => {
	return (
		<WorkMangeContainer.Provider>
			<WorkProcedureManage />
		</WorkMangeContainer.Provider>
	)
}

export default WorkProcedureManagePage;