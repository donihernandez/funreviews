/* eslint-disable max-len */
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { getPopular, getTopRated, getTrending } from '_tmdb/movies/queries';
import { getTvPopular, getTvTopRated } from '_tmdb/tv/queries';
import { BreadcrumbJsonLd, NextSeo, WebPageJsonLd } from 'next-seo';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

const HomePage: NextPage = () => {
    const Home = dynamic(() => import('../components/Home/Home'));

    const { data: trendingMovies } = useQuery(['trendingMovie'], () =>
        getTrending(),
    );

    const { data: popularMovies } = useQuery(['popularMovies'], () =>
        getPopular(),
    );

    const { data: topRatedMovies } = useQuery(['topRatedMovies'], () =>
        getTopRated(),
    );

    const { data: popularTv } = useQuery(['popularTv'], () => getTvPopular());

    const { data: topRatedTv } = useQuery(['topRatedTv'], () =>
        getTvTopRated(),
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
        await queryClient.prefetchQuery(['popularMovies'], () => getPopular());
        await queryClient.prefetchQuery(['trendingMovie'], () => getTrending());
        await queryClient.prefetchQuery(['popularTv'], () => getTvPopular());
        await queryClient.prefetchQuery(['topRatedMovies'], () =>
            getTopRated(),
        );
        await queryClient.prefetchQuery(['topRatedTv'], () => getTvTopRated());
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
