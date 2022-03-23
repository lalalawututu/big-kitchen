import React from 'react';
import ThirdPartyManageContainer from '../../container/thirdpartymanage';
import { ThirdPartyManagePage } from '../../components/thirdpartymanage';

export const ThirdPartyManage = () => {
	return (
		<ThirdPartyManageContainer.Provider>
			<ThirdPartyManagePage />
		</ThirdPartyManageContainer.Provider>
	)
}
