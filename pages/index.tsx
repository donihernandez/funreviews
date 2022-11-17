/* eslint-disable max-len */
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { getPopular, getTopRated, getTrending } from '_tmdb/movies/queries';
import { getTvPopular, getTvTopRated } from '_tmdb/tv/queries';
import { BreadcrumbJsonLd, NextSeo, WebPageJsonLd } from 'next-seo';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

const LIMIT = 7;
const PAGE = 1;
const TRENDING_LIMIT = 2;

const HomePage: NextPage = () => {
    const Home = dynamic(() => import('../components/Home/Home'));

    const { data: trendingMovies } = useQuery(
        ['trendingMovie', TRENDING_LIMIT],
        () => getTrending(TRENDING_LIMIT),
    );

    const { data: popularMovies } = useQuery(
        ['popularMovies', PAGE, LIMIT],
        () => getPopular(PAGE, LIMIT),
    );

    const { data: topRatedMovies } = useQuery(
        ['topRatedMovies', PAGE, LIMIT],
        () => getTopRated(LIMIT),
    );

    const { data: popularTv } = useQuery(['popularTv', PAGE, LIMIT], () =>
        getTvPopular(PAGE, LIMIT),
    );

    const { data: topRatedTv } = useQuery(['topRatedTv', PAGE, LIMIT], () =>
        getTvTopRated(PAGE, LIMIT),
    );

    return (
        <>
            <NextSeo
                additionalMetaTags={[
                    {
                        content:
                            'fun review, making fun reviews, reviews, review, movie reviews, old movie review',
                        name: 'keywords',
                    },
                ]}
                canonical="https://funreviews.org/"
                description="Creating reviews can also be fun. Dare to make your favorite movie or show more than just entertainment."
                title="FunReviews: Create fun reviews about your favorite movies and shows."
            />
            <WebPageJsonLd
                description="Creating reviews can also be fun. Dare to make your favorite movie or show more than just entertainment."
                id={process.env.SITE_URL}
                lastReviewed={new Date().toISOString()}
                reviewedBy={{
                    name: 'Adonai Dominguez',
                    type: 'Person',
                }}
            />
            <BreadcrumbJsonLd
                itemListElements={[
                    {
                        item: 'https://funreviews.org/movies',
                        name: 'Movies',
                        position: 1,
                    },
                    {
                        item: 'https://funreviews.org/tv',
                        name: 'Tv Shows',
                        position: 2,
                    },
                ]}
            />

            <Home
                popularMovies={popularMovies}
                popularTv={popularTv}
                topRatedMovies={topRatedMovies}
                topRatedTv={topRatedTv}
                trendingMovies={trendingMovies}
            />
        </>
    );
};

export async function getStaticProps() {
    const queryClient = new QueryClient();

    try {
        await queryClient.prefetchQuery(['popularMovies', PAGE, LIMIT], () =>
            getPopular(PAGE, LIMIT),
        );
        await queryClient.prefetchQuery(['trendingMovie', TRENDING_LIMIT], () =>
            getTrending(TRENDING_LIMIT),
        );
        await queryClient.prefetchQuery(['popularTv', PAGE, LIMIT], () =>
            getTvPopular(PAGE, LIMIT),
        );
        await queryClient.prefetchQuery(['topRatedMovies', LIMIT], () =>
            getTopRated(LIMIT),
        );
        await queryClient.prefetchQuery(['topRatedTv', PAGE, LIMIT], () =>
            getTvTopRated(PAGE, LIMIT),
        );
    } catch (error) {
        return error;
    }

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 360,
    };
}

export default HomePage;
