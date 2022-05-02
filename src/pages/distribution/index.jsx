import DistributionIndex from '@/components/distribution';
import DistributionContainer from '@/container/distribution';

export default function index() {
    return (
        <DistributionContainer.Provider>
            <DistributionIndex />
        </DistributionContainer.Provider>
    )
}
