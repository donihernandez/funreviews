import type { FC } from 'react';

import { getGenres } from '@/utils/getGenres';
import { ShowsContainer } from '@/components/common/ShowsContainer';
import { COLORS } from '@/styles/theme';
import { Container } from '@chakra-ui/react';

import { useQuery } from 'react-query';
import { getMovieGenres, getUpcoming } from '_tmdb/movies/queries';
import { getTvGenres, getTvPopular } from '_tmdb/tv/queries';
import { Loading } from '@/components/common/Loading';

const Featured: FC = () => {
    const { data: upcomingMovies, isSuccess: upcomingMoviesSucess } = useQuery(
        'upcoming',
        getUpcoming,
    );
    const { data: movieGenres, isSuccess: movieGenresSucess } = useQuery(
        'genres',
        getMovieGenres,
    );
    const { data: tvGenres, isSuccess: tvGenresSuccess } = useQuery(
        'tvGenres',
        getTvGenres,
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
            {movieGenresSucess && upcomingMoviesSucess ? (
                <ShowsContainer
                    filters={getGenres(
                        upcomingMovies?.results,
                        movieGenres.genres,
                    )}
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

            {tvGenresSuccess && tvPopularSuccess ? (
                <ShowsContainer
                    filters={getGenres(tvPopular?.results, tvGenres.genres)}
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
