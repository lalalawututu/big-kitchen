import React from 'react';
import materialsMangeContainer from '../../container/materialsMange';
import { MaterialsListPage } from '../../pages/materialsMange';

export const MaterialsMange = () => {
	return (
		<materialsMangeContainer.Provider>
			<MaterialsListPage />
		</materialsMangeContainer.Provider>
	)
}
