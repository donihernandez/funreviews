import { dehydrate, QueryClient } from 'react-query';
import type { NextPage } from 'next';

import { getMovieGenres, getUpcoming } from '@/api/movies/queries';
import { getPopular, getTvGenres } from '@/api/tv/queries';
import { Home } from '@/components/Home';

const HomePage: NextPage = () => {
    return <Home />;
};

export async function getStaticProps() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(['upcoming'], getUpcoming);
    await queryClient.prefetchQuery(['movieGenres'], getMovieGenres);
    await queryClient.prefetchQuery(['tvGenres'], getTvGenres);
    await queryClient.prefetchQuery(['popular_tv'], getPopular);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 30,
    };
}

export default HomePage;
