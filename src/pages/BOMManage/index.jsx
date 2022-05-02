import React from 'react';
import materialsManageContainer from '../../container/materialsManage';
import {BOMListPage} from "../../components/BOMManage";

export const BOMManage = () => {
	return (
		<materialsManageContainer.Provider>
			<BOMListPage />
		</materialsManageContainer.Provider>
	)
}
