import MineContainer from '../../container/mine';
import { MinePage } from '../../components/mine';

export const Mine = () => {
	return (
		<MineContainer.Provider>
			<MinePage />
		</MineContainer.Provider>
	)
}
