import type { NextPage } from 'next';

import {
    getMovieGenres,
    getPopular,
    getTopRated,
    getTrending,
} from '_tmdb/movies/queries';
import { getTvGenres, getTvPopular, getTvTopRated } from '_tmdb/tv/queries';

import { dehydrate, QueryClient } from '@tanstack/react-query';

import { Home } from '@/components/Home';

const HomePage: NextPage = () => {
    return <Home />;
};

export async function getStaticProps() {
    const queryClient = new QueryClient();

    try {
        await queryClient.prefetchQuery(['movieGenres'], getMovieGenres);
        await queryClient.prefetchQuery(['popularMovies'], () => getPopular());
        await queryClient.prefetchQuery(['trendingMovie'], () => getTrending());
        await queryClient.prefetchQuery(['tvGenres'], getTvGenres);
        await queryClient.prefetchQuery(['popularTv'], () => getTvPopular());
        await queryClient.prefetchQuery(['topRatedMovies'], () =>
            getTopRated(),
        );
        await queryClient.prefetchQuery(['topRatedTv'], () => getTvTopRated());
    } catch (error) {
        return error;
    }

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 30,
    };
}

export default HomePage;
