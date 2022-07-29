import type { FC } from 'react';
import { Flex } from '@chakra-ui/react';

import { Hero } from '@/components/Home/Hero';
import { getMovieGenres, getTrending } from '_tmdb/movies/queries';

import { Trending } from '@/components/Home/Trending';

import { useQuery } from 'react-query';

import { useShowsContext } from 'contexts/ShowsContext';
import { useEffect } from 'react';

import { Loading } from '@/components/common/Loading';
import { PopularMovies } from './PopularMovies';
import { TopRatedMovies } from './TopRatedMovies';

import { TopRatedTv } from './TopRatedTv';
import { PopularTv } from './PopularTv';

const Home: FC = () => {
    const { setMovieGenres } = useShowsContext();
    const { data: movieResults, isSuccess: moviesSucess } = useQuery(
        'trendingMovie',
        () => getTrending(),
    );

    const { data: genres, isSuccess: genresSucess } = useQuery(
        'movieGenres',
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
