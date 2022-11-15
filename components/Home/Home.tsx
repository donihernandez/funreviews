import { Suspense } from 'react';
import { Flex } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { FullPageLoader } from '../common/FullPageLoader';

export default function Home({
    popularMovies,
    popularTv,
    topRatedMovies,
    topRatedTv,
    trendingMovies,
}) {
    // Dynamic Imports
    const Hero = dynamic(() => import('./Hero/Hero'), {
        suspense: true,
    });
    const Trending = dynamic(() => import('./Trending/Trending'), {
        suspense: true,
    });
    const PopularMovies = dynamic(
        () => import('./PopularMovies/PopularMovies'),
        {
            suspense: true,
        },
    );
    const TopRatedMovies = dynamic(
        () => import('./TopRatedMovies/TopRatedMovies'),
        {
            suspense: true,
        },
    );
    const PopularTv = dynamic(() => import('./PopularTv/PopularTv'), {
        suspense: true,
    });
    const TopRatedTv = dynamic(() => import('./TopRatedTv/TopRatedTv'), {
        suspense: true,
    });

    return (
        <Flex bg="#000" direction="column" w="full">
            <Suspense fallback={<FullPageLoader />}>
                <Hero />
                <Trending movie={trendingMovies?.results[0]} />
                <PopularMovies popularMovies={popularMovies} />
                <TopRatedMovies topRated={topRatedMovies} />
                <PopularTv popularTv={popularTv} />
                <TopRatedTv topRated={topRatedTv} />
            </Suspense>
        </Flex>
    );
}
