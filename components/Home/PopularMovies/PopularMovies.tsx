import type { FC } from 'react';
import { Container } from '@chakra-ui/react';

import { COLORS } from '../../../styles/theme';

import { ShowsContainer } from '@/components/common/Shows/ShowsContainer';

interface IPopularMovies {
    popularMovies: any;
}

const PopularMovies: FC<IPopularMovies> = ({ popularMovies }) => {
    return (
        <Container
            h="full"
            maxW={{ base: '300vw', lg: '80vw' }}
            padding="50px 15px"
        >
            <ShowsContainer
                items={popularMovies?.results}
                link="/movies"
                title="The Most Popular Movies"
                titleStyles={{
                    color: COLORS.white,
                    fontSize: '50px',
                }}
                type="movie"
            />
        </Container>
    );
};

export { PopularMovies };
