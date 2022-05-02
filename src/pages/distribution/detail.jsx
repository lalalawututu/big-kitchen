import DistributionDetail from '@/components/distribution/detail';
import DistributionContainer from '@/container/distribution/detail';

export default function index() {
    return (
        <DistributionContainer.Provider>
            <DistributionDetail />
        </DistributionContainer.Provider>
    )
}
