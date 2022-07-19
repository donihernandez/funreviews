import { NextPage } from 'next';
import { dehydrate, QueryClient } from 'react-query';

import { Movies } from '@/components/Movies';
import { getMovieGenres, getPopular } from '@/api/movies/queries';
import { ShowsProvider } from 'contexts/ShowsContext';

const MoviesPage: NextPage = () => {
    return (
        <ShowsProvider>
            <Movies />
        </ShowsProvider>
    );
};

export async function getStaticProps() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(['movieGenres'], getMovieGenres);
    await queryClient.prefetchQuery(['popularMovies'], () => getPopular());

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 30,
    };
}

export default MoviesPage;
