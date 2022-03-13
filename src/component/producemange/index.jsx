import React from 'react';
import ProduceMangeContainer from '../../container/producemange';
import { ProduceMangePage } from '../../pages/producemange';

export const ProduceMange = () => {
	return (
		<ProduceMangeContainer.Provider>
			<ProduceMangePage />
		</ProduceMangeContainer.Provider>
	)
}
