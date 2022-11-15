import type { FC } from 'react';
import { Container } from '@chakra-ui/react';

import { COLORS } from '../../../styles/theme';

import { ShowsContainer } from '@/components/common/Shows/ShowsContainer';

interface ITopRatedMovies {
    topRated: any;
}

const TopRatedMovies: FC<ITopRatedMovies> = ({ topRated }) => {
    return (
        <Container
            h="full"
            maxW={{ base: '300vw', lg: '80vw' }}
            padding="50px 15px"
        >
            <ShowsContainer
                items={topRated?.results}
                link="/movies"
                title="Top Rated Movies"
                titleStyles={{
                    color: COLORS.white,
                    fontSize: ['30px', null, '40px', '50px'],
                }}
                type="movie"
            />
        </Container>
    );
};

export { TopRatedMovies };
