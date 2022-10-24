import type { NextPage } from 'next';

import { getMovieGenres, getPopular, getTopRated } from '_tmdb/movies/queries';
import { getTvGenres, getTvTopRated } from '_tmdb/tv/queries';

import { dehydrate, QueryClient } from 'react-query';

import { Home } from '@/components/Home';

const HomePage: NextPage = () => {
    return <Home />;
};

export async function getStaticProps() {
    const queryClient = new QueryClient();

    try {
        await queryClient.prefetchQuery(['movieGenres'], getMovieGenres);
        await queryClient.prefetchQuery(['tvGenres'], getTvGenres);
        await queryClient.prefetchQuery(['popular_tv'], () => getPopular());
        await queryClient.prefetchQuery('topRatedMovies', () => getTopRated());
        await queryClient.prefetchQuery('topRatedTv', () => getTvTopRated());
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
