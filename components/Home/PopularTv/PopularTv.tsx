import type { FC } from 'react';
import { Container } from '@chakra-ui/react';

import { COLORS } from '../../../styles/theme';

import { ShowsContainer } from '@/components/common/Shows/ShowsContainer';

interface IPopularTv {
    popularTv: any;
}

const PopularTv: FC<IPopularTv> = ({ popularTv }) => {
    return (
        <Container
            h="full"
            maxW={{ base: '300vw', lg: '80vw' }}
            padding="50px 15px"
        >
            <ShowsContainer
                items={popularTv?.results}
                link="/tv-shows"
                title="Popular TV Shows"
                titleStyles={{
                    color: COLORS.white,
                    fontSize: ['30px', null, '40px', '50px'],
                }}
                type="tv"
            />
        </Container>
    );
};

export default PopularTv;
