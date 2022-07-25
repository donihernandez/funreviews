import type { FC } from 'react';

import { ShowsContainer } from '@/components/common/Shows/ShowsContainer';
import { COLORS } from '@/styles/theme';
import { Container } from '@chakra-ui/react';

import { useQuery } from 'react-query';

import { Loading } from '@/components/common/Loading';
import { getUpcoming } from '_tmdb/movies/queries';
import { getTvPopular } from '_tmdb/tv/queries';

const Featured: FC = () => {
    const { data: upcomingMovies, isSuccess: upcomingMoviesSucess } = useQuery(
        'upcoming',
        () => getUpcoming(),
    );

    const { data: tvPopular, isSuccess: tvPopularSuccess } = useQuery(
        'tv_popular',
        () => getTvPopular(),
    );

    return (
        <Container
            h="full"
            maxW={{ base: '300vw', lg: '80vw' }}
            padding="100px 15px"
        >
            {upcomingMoviesSucess ? (
                <ShowsContainer
                    items={upcomingMovies?.results}
                    link="/movies"
                    title="Upcoming Movies"
                    titleStyles={{
                        color: COLORS.white,
                    }}
                    type="movie"
                />
            ) : (
                <Loading />
            )}

            {tvPopularSuccess ? (
                <ShowsContainer
                    items={tvPopular?.results}
                    link="/tv"
                    title="Popular TV Shows"
                    titleStyles={{
                        color: COLORS.white,
                    }}
                    type="tv"
                />
            ) : (
                <Loading />
            )}
        </Container>
    );
};

export { Featured };
