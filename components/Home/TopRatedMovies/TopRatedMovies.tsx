import type { FC } from 'react';
import { Container } from '@chakra-ui/react';

import { useQuery } from '@tanstack/react-query';

import { COLORS } from '../../../styles/theme';

import { getTopRated } from '_tmdb/movies/queries';
import { ShowsContainer } from '@/components/common/Shows/ShowsContainer';
import { Loading } from '@/components/common/Loading';

const TopRatedMovies: FC = () => {
    const { data: topRated, isSuccess } = useQuery(['topRatedMovies'], () =>
        getTopRated(),
    );

    return (
        <Container
            h="full"
            maxW={{ base: '300vw', lg: '80vw' }}
            padding="50px 15px"
        >
            {isSuccess ? (
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
            ) : (
                <Loading />
            )}
        </Container>
    );
};

export { TopRatedMovies };
