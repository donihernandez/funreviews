import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { useQuery } from 'react-query';

import { getMovieGenres, getUpcoming } from '@/api/movies/queries';

import { getPopular, getTvGenres } from '@/api/tv/queries';

import { getGenres } from '@/utils/getGenres';
import { ShowsContainer } from '@/components/common/ShowsContainer';
import { COLORS } from '@/styles/theme';
import { Container } from '@chakra-ui/react';

const Featured: FC = () => {
    const { data: upcomingMovies, isLoading } = useQuery(
        'upcoming',
        getUpcoming,
    );
    const { data: movieGenres } = useQuery('genres', getMovieGenres);
    const { data: tvGenres } = useQuery('tvGenres', getTvGenres);
    const { data: popular } = useQuery('popular_tv', getPopular);

    const [movieGenresList, setMovieGenresList] = useState<string[]>([]);
    const [tvGenresList, setTvGenresList] = useState<string[]>([]);

    useEffect(() => {
        if (movieGenres) {
            setMovieGenresList(getGenres(upcomingMovies?.results, movieGenres));
        }
        if (tvGenres) {
            setTvGenresList(getGenres(popular?.results, tvGenres));
        }
    }, [movieGenres, upcomingMovies]);

    return (
        <Container
            h="full"
            maxW={{ base: '300vw', lg: '80vw' }}
            padding="100px 0"
        >
            <ShowsContainer
                filters={movieGenresList}
                isLoading={isLoading}
                items={upcomingMovies?.results}
                link="/movies"
                title="Upcoming Movies"
                titleStyles={{
                    color: COLORS.white,
                }}
                type="movie"
            />
            <ShowsContainer
                filters={tvGenresList}
                isLoading={isLoading}
                items={popular?.results}
                link="/tv"
                title="Popular TV Shows"
                titleStyles={{
                    color: COLORS.white,
                }}
                type="tv"
            />
        </Container>
    );
};

export { Featured };
