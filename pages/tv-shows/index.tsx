/* eslint-disable max-len */
import { NextPage } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { getTvGenres, getTvPopular } from '_tmdb/tv/queries';

import { NextSeo } from 'next-seo';

import { Tv } from '@/components/Tv';

const TVShowsPage: NextPage = () => {
    return (
        <>
            <NextSeo
                additionalMetaTags={[
                    {
                        content:
                            'review tv show, tv show reviews, from tv show review ',
                        name: 'keywords',
                    },
                ]}
                canonical="https://funreviews.org/tv"
                description="Watch popular TV Shows and create a fun review of it."
                title="TV Shows | FunReviews"
            />
            <Tv />
        </>
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
    };
}

export default TVShowsPage;
