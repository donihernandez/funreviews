import { Flex } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

export default function Home({
    popularMovies,
    popularTv,
    topRatedMovies,
    topRatedTv,
    trendingMovies,
}) {
    // Dynamic Imports
    const Hero = dynamic(() => import('./Hero/Hero'));
    const Trending = dynamic(() => import('./Trending/Trending'));
    const PopularMovies = dynamic(
        () => import('./PopularMovies/PopularMovies'),
    );
    const TopRatedMovies = dynamic(
        () => import('./TopRatedMovies/TopRatedMovies'),
    );
    const PopularTv = dynamic(() => import('./PopularTv/PopularTv'));
    const TopRatedTv = dynamic(() => import('./TopRatedTv/TopRatedTv'));

    return (
        <Flex bg="#000" direction="column" w="full">
            <Hero />
            <Trending movie={trendingMovies?.results[0]} />
            <PopularMovies popularMovies={popularMovies} />
            <TopRatedMovies topRated={topRatedMovies} />
            <PopularTv popularTv={popularTv} />
            <TopRatedTv topRated={topRatedTv} />
        </Flex>
    );
}
