import React from 'react';
import ThirdPartyMangeContainer from '../../container/thirdpartymange';
import { ThirdPartyMangePage } from '../../pages/thirdpartymange';

export const ThirdPartyMange = () => {
	return (
		<ThirdPartyMangeContainer.Provider>
			<ThirdPartyMangePage />
		</ThirdPartyMangeContainer.Provider>
	)
}
