import MineContainer from '../../container/mine';
import { MinePage } from '../../pages/mine';

export const Mine = () => {
	return (
		<MineContainer.Provider>
			<MinePage />
		</MineContainer.Provider>
	)
}
