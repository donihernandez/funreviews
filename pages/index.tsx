/* eslint-disable max-len */
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { getPopular, getTopRated, getTrending } from '_tmdb/movies/queries';
import { getTvPopular, getTvTopRated } from '_tmdb/tv/queries';
import { NextSeo } from 'next-seo';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { FullPageLoader } from '@/components/common/FullPageLoader';

const HomePage: NextPage = () => {
    const Home = dynamic(() =>
        import('../components/Home').then(module => module.Home),
    );

    const { data: trendingMovies, isSuccess: moviesSuccess } = useQuery(
        ['trendingMovie'],
        () => getTrending(),
    );

    const { data: popularMovies, isSuccess: popularMoviesSuccess } = useQuery(
        ['popularMovies'],
        () => getPopular(),
    );

    const { data: topRatedMovies, isSuccess: topRatedMoviesSuccess } = useQuery(
        ['topRatedMovies'],
        () => getTopRated(),
    );

    const { data: popularTv, isSuccess: popularTvSuccess } = useQuery(
        ['popularTv'],
        () => getTvPopular(),
    );

    const { data: topRatedTv, isSuccess: topRatedTvSuccess } = useQuery(
        ['topRatedTv'],
        () => getTvTopRated(),
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
            {topRatedMoviesSuccess &&
            topRatedTvSuccess &&
            moviesSuccess &&
            popularTvSuccess &&
            popularMoviesSuccess ? (
                <Home
                    popularMovies={popularMovies}
                    popularTv={popularTv}
                    topRatedMovies={topRatedMovies}
                    topRatedTv={topRatedTv}
                    trendingMovies={trendingMovies}
                />
            ) : (
                <FullPageLoader />
            )}
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
