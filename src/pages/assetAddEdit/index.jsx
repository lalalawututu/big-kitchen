import React from 'react';
import AssetAddEditContainer from '../../container/assetAddEdit';
import { AssetAddEditPage } from '../../components/assetAddEdit';

export const AssetAddEdit = () => {
	return (
		<AssetAddEditContainer.Provider>
			<AssetAddEditPage />
		</AssetAddEditContainer.Provider>
	)
}
