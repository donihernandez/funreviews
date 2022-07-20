import { NextPage } from 'next';
import { dehydrate, QueryClient } from 'react-query';

import { ShowsProvider } from 'contexts/ShowsContext';
import { Tv } from '@/components/Tv';
import { getTvGenres, getTvPopular } from '_tmdb/tv/queries';

const TVShowsPage: NextPage = () => {
    return (
        <ShowsProvider>
            <Tv />
        </ShowsProvider>
    );
};

export async function getStaticProps() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(['tvGenres'], getTvGenres);
    await queryClient.prefetchQuery(['popularTv'], () => getTvPopular());

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 30,
    };
}

export default TVShowsPage;
