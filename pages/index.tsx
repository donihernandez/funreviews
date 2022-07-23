import type { NextPage } from 'next';

import { getMovieGenres, getPopular, getUpcoming } from '_tmdb/movies/queries';
import { getTvGenres } from '_tmdb/tv/queries';

import { dehydrate, QueryClient } from 'react-query';

import { Home } from '@/components/Home';

const HomePage: NextPage = () => {
    return <Home />;
};

export async function getStaticProps() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(['upcoming'], getUpcoming);
    await queryClient.prefetchQuery(['movieGenres'], getMovieGenres);
    await queryClient.prefetchQuery(['tvGenres'], getTvGenres);
    await queryClient.prefetchQuery(['popular_tv'], () => getPopular());

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 30,
    };
}

export default HomePage;
