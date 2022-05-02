import React from 'react';
import ThirdPartyMangeContainer from '../../container/thirdpartymange';
import { SimErp } from "../../components/simerp";

export const SimErpPage = () => {
	return (
		<ThirdPartyMangeContainer.Provider>
			<SimErp />
		</ThirdPartyMangeContainer.Provider>
	)
}
