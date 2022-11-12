import { Movies } from '@/components/Movies';
import { NextPage } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import { getMovieGenres, getPopular } from '_tmdb/movies/queries';

const MoviesPage: NextPage = () => {
    return <Movies />;
};

export async function getStaticProps() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(['movieGenres'], getMovieGenres);
    await queryClient.prefetchQuery(['popularMovies'], () => getPopular());

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}

export default MoviesPage;
