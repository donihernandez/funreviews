import type { FC } from 'react';
import { useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';

import { getMovieGenres, getTrending } from '_tmdb/movies/queries';

import { useShowsContext } from 'contexts/ShowsContext';
import { Loading } from '@/components/common/Loading';

const Home: FC = () => {
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

    const { setMovieGenres } = useShowsContext();
    const { data: movieResults, isSuccess: moviesSucess } = useQuery(
        ['trendingMovie'],
        () => getTrending(),
    );

    const { data: genres, isSuccess: genresSucess } = useQuery(
        ['movieGenres'],
        getMovieGenres,
    );

    useEffect(() => {
        if (genresSucess) {
            setMovieGenres(genres.genres);
        }
    }, [genresSucess]);

    return (
        <Flex bg="#000" direction="column" w="full">
            <Hero />
            {moviesSucess ? (
                <>
                    <Trending movie={movieResults?.results[0]} />
                    <PopularMovies />
                    <TopRatedMovies />
                    <PopularTv />
                    <TopRatedTv />
                </>
            ) : (
                <Loading />
            )}
        </Flex>
    );
};

export { Home };
