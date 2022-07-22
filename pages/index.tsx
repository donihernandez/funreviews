import type { NextPage } from 'next';
import { Flex } from '@chakra-ui/react';

import { Featured } from '@/components/Home/Featured';
import { Hero } from '@/components/Home/Hero';
import { getMovieGenres, getTrending, getUpcoming } from '_tmdb/movies/queries';
import { getTvGenres, getTvPopular } from '_tmdb/tv/queries';
import { IGenre, Movie, Tv } from 'typings';
import { useRecoilState } from 'recoil';
import { movieGenresState, tvGenresState } from 'recoil/atoms';
import { useEffect } from 'react';
import { Trending } from '@/components/Home/Trending';

interface IHomeProps {
    movieGenres: IGenre[];
    tvGenres: IGenre[];
    tvPopular: Tv[];
    upcomingMovies: Movie[];
    trendingMovie: Movie;
}

const HomePage: NextPage<IHomeProps> = ({
    movieGenres,
    tvGenres,
    tvPopular,
    upcomingMovies,
    trendingMovie,
}) => {
    const [allMovieGenres, setAllMovieGenres] =
        useRecoilState(movieGenresState);

    const [allTvGenres, setAllTvGenres] = useRecoilState(tvGenresState);

    useEffect(() => {
        setAllMovieGenres(() => movieGenres);
        setAllTvGenres(() => tvGenres);
    }, []);

    return (
        <Flex bg="#000" direction="column" w="full">
            <Hero />
            <Trending movie={trendingMovie} />
            <Featured
                movieGenres={allMovieGenres}
                tvGenres={allTvGenres}
                tvPopular={tvPopular}
                upcomingMovies={upcomingMovies}
            />
        </Flex>
    );
};

export async function getServerSideProps() {
    const movieGenres = await getMovieGenres();
    const tvGenres = await getTvGenres();
    const tvPopular = await getTvPopular();
    const upcomingMovies = await getUpcoming();
    const getTrendingMovie = await getTrending();

    return {
        props: {
            movieGenres: movieGenres.genres,
            trendingMovie: getTrendingMovie.results[0],
            tvGenres: tvGenres.genres,
            tvPopular: tvPopular.results,
            upcomingMovies: upcomingMovies.results,
        },
    };
}

export default HomePage;
