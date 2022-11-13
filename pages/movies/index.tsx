/* eslint-disable max-len */
import { Movies } from '@/components/Movies';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import { dehydrate, QueryClient } from '@tanstack/react-query';

import { getMovieGenres, getPopular } from '_tmdb/movies/queries';

const MoviesPage: NextPage = () => {
    return (
        <>
            <NextSeo
                additionalMetaTags={[
                    {
                        content: 'movie reviews',
                        name: 'keywords',
                    },
                ]}
                canonical="https://funreviews.org/movies"
                description="Watch popular Movies and create a fun review of it."
                title="Movies | FunReviews"
            />
            <Movies />
        </>
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
    };
}

export default MoviesPage;
