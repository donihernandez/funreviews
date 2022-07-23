import type { FC } from 'react';
import { Flex } from '@chakra-ui/react';

import { Featured } from '@/components/Home/Featured';
import { Hero } from '@/components/Home/Hero';
import { getMovieGenres, getTrending } from '_tmdb/movies/queries';

import { Trending } from '@/components/Home/Trending';

import { useQuery } from 'react-query';

import { useShowsContext } from 'contexts/ShowsContext';
import { useEffect } from 'react';

import { Loading } from '@/components/common/Loading';

const Home: FC = () => {
    const { setMovieGenres, setType, type } = useShowsContext();
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
                    <Featured />
                </>
            ) : (
                <Loading />
            )}
        </Flex>
    );
};

export { Home };
