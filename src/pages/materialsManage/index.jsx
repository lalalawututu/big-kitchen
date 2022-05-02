import React from 'react';
import materialsManageContainer from '../../container/materialsManage';
import { MaterialsListPage } from '../../components/materialsManage';

export const MaterialsManage = () => {
	return (
		<materialsManageContainer.Provider>
			<MaterialsListPage />
		</materialsManageContainer.Provider>
	)
}
