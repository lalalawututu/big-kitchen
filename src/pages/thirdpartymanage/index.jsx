import React from 'react';
import ThirdPartyMangeContainer from '../../container/thirdpartymange';
import { ThirdPartyManagePage } from '../../components/thirdpartymanage';

export const ThirdPartyManage = () => {
	return (
		<ThirdPartyMangeContainer.Provider>
			<ThirdPartyManagePage />
		</ThirdPartyMangeContainer.Provider>
	)
}
