import React from 'react';
import AssetAddEditContainer from '../../container/assetAddEdit';
import { AssetAddEditPage } from '../../components/assetAddEdit';

export const AssetAddEdits = () => {
	return (
		<AssetAddEditContainer.Provider>
			<AssetAddEditPage />
		</AssetAddEditContainer.Provider>
	)
}
