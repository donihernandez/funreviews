import type { FC } from 'react';
import { Flex } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

interface IHomeProps {
    popularMovies: any;
    popularTv: any;
    topRatedMovies: any;
    topRatedTv: any;
    trendingMovies: any;
}

const Home: FC<IHomeProps> = ({
    popularMovies,
    popularTv,
    topRatedMovies,
    topRatedTv,
    trendingMovies,
}) => {
    // Dynamic Imports
    const Hero = dynamic(() => import('./Hero').then(module => module.Hero));
    const Trending = dynamic(() =>
        import('./Trending').then(module => module.Trending),
    );
    const PopularMovies = dynamic(() =>
        import('./PopularMovies').then(module => module.PopularMovies),
    );
    const TopRatedMovies = dynamic(() =>
        import('./TopRatedMovies').then(module => module.TopRatedMovies),
    );
    const PopularTv = dynamic(() =>
        import('./PopularTv').then(module => module.PopularTv),
    );
    const TopRatedTv = dynamic(() =>
        import('./TopRatedTv').then(module => module.TopRatedTv),
    );

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
};

export { Home };
