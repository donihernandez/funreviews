import { Flex } from '@chakra-ui/react';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import type { NextPage } from 'next';

import { ShowsContainer } from '@/components/common/ShowsContainer';
import { COLORS } from '@/styles/theme';
import { Hero } from '../components/Hero';
import { getMovieGenres, getUpcoming } from '@/api/movies/queries';
import { getGenres } from '../utils';
import { getPopular, getTvGenres } from '@/api/tv/queries';

const Home: NextPage = () => {
    const { data, isLoading } = useQuery('upcoming', getUpcoming);
    const { data: movieGenres } = useQuery('genres', getMovieGenres);
    const { data: tvGenres } = useQuery('tvGenres', getTvGenres);
    const { data: popular } = useQuery('popular_tv', getPopular);

    const moviesGenresToShow = getGenres(data?.results, movieGenres);
    const tvGenresToShow = getGenres(popular?.results, tvGenres);

    return (
        <Flex bg="#000" direction="column">
            <Hero />
            <ShowsContainer
                filters={moviesGenresToShow}
                isLoading={isLoading}
                items={data.results}
                link="/movies"
                title="Upcoming Movies"
                titleStyles={{
                    color: COLORS.white,
                }}
            />
            <ShowsContainer
                filters={tvGenresToShow}
                isLoading={isLoading}
                items={popular.results}
                link="/tv"
                title="Popular TV Shows"
                titleStyles={{
                    color: COLORS.white,
                }}
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
