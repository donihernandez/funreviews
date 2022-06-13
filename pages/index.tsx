import { Flex } from '@chakra-ui/react';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import type { NextPage } from 'next';

import { ShowsContainer } from '@/components/common/ShowsContainer';
import { COLORS } from '@/styles/theme';
import { Hero } from '../components/Hero';
import { getMovieGenres, getUpcoming } from '@/api/movies/queries';
import { getGenres } from '../utils';
import { getPopular, getTvGenres } from '@/api/tv/queries';
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
    const { data: upcomingMovies, isLoading } = useQuery(
        'upcoming',
        getUpcoming,
    );
    const { data: movieGenres } = useQuery('genres', getMovieGenres);
    const { data: tvGenres } = useQuery('tvGenres', getTvGenres);
    const { data: popular } = useQuery('popular_tv', getPopular);

    const [movieGenresList, setMovieGenresList] = useState([]);
    const [tvGenresList, setTvGenresList] = useState([]);

    useEffect(() => {
        if (movieGenres) {
            setMovieGenresList(getGenres(upcomingMovies?.results, movieGenres));
        }
        if (tvGenres) {
            setTvGenresList(getGenres(popular?.results, tvGenres));
        }
    }, [movieGenres, upcomingMovies]);

    return (
        <Flex bg="#000" direction="column">
            <Hero />
            <ShowsContainer
                filters={movieGenresList}
                isLoading={isLoading}
                items={upcomingMovies.results}
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
                items={popular.results}
                link="/tv"
                title="Popular TV Shows"
                titleStyles={{
                    color: COLORS.white,
                }}
                type="tv"
            />
        </Flex>
    );
};

export async function getStaticProps() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery('upcoming', getUpcoming);
    await queryClient.prefetchQuery('movieGenres', getMovieGenres);
    await queryClient.prefetchQuery('tvGenres', getTvGenres);
    await queryClient.prefetchQuery('popular_tv', getPopular);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 30,
    };
}

export default Home;
