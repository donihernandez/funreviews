/* eslint-disable max-len */
import { NextPage } from 'next';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';

import { Tv } from '@/components/Tv';
import { FullPageLoader } from '@/components/common/FullPageLoader';
import { getTvGenres, getTvPopular } from '_tmdb/tv/queries';

import { useShowsContext } from 'contexts/ShowsContext';

const TVShowsPage: NextPage = () => {
    const [loading, setLoading] = useState(false);
    const { setShows, setGenres, setTotalPages } = useShowsContext();

    const { data: tvGenres, isSuccess: tvGenresSuccess } = useQuery(
        ['fetchtvGenres'],
        () => getTvPopular(),
    );

    const { data: popularTv, isSuccess: popularTVSuccess } = useQuery(
        ['fetchPopularTv'],
        () => getTvPopular(),
    );

    useEffect(() => {
        setShows([]);
        setLoading(true);
        if (popularTVSuccess) {
            setShows(popularTv.results);
            setTotalPages(popularTv.total_pages);
        }
        if (tvGenresSuccess) {
            setGenres(tvGenres.genres);
        }
        setLoading(false);
    }, [tvGenresSuccess, popularTVSuccess]);

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
            {!loading ? <Tv /> : <FullPageLoader />}
        </>
    );
};

export async function getStaticProps() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(['fetchtvGenres'], () => getTvGenres);
    await queryClient.prefetchQuery(['fetchPopularTv'], () => getTvPopular());

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            revalidate: 30 * 60,
        },
    };
}

export default TVShowsPage;
