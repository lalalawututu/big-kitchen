import React from 'react';
import MaterialsCreateContainer from '../../container/materialsCreate';
import { MaterialsCreatePage } from '../../components/materialsCreate';

export const MaterialsCreate = () => {
	return (
		<MaterialsCreateContainer.Provider>
			<MaterialsCreatePage />
		</MaterialsCreateContainer.Provider>
	)
}
