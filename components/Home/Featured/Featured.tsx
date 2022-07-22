import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { getGenres } from '@/utils/getGenres';
import { ShowsContainer } from '@/components/common/ShowsContainer';
import { COLORS } from '@/styles/theme';
import { Container } from '@chakra-ui/react';
import { IGenre, Movie, Tv } from 'typings';

interface IFeaturedProps {
    movieGenres: IGenre[];
    tvGenres: IGenre[];
    tvPopular: Tv[];
    upcomingMovies: Movie[];
}

const Featured: FC<IFeaturedProps> = ({
    upcomingMovies,
    movieGenres,
    tvGenres,
    tvPopular,
}) => {
    const [movieGenresList, setMovieGenresList] = useState<string[]>([]);
    const [tvGenresList, setTvGenresList] = useState<string[]>([]);

    useEffect(() => {
        if (movieGenres) {
            setMovieGenresList(getGenres(upcomingMovies, movieGenres));
        }
        if (tvGenres) {
            setTvGenresList(getGenres(tvPopular, tvGenres));
        }
    }, [movieGenres, upcomingMovies]);

    return (
        <Container
            h="full"
            maxW={{ base: '300vw', lg: '80vw' }}
            padding="100px 0"
        >
            <ShowsContainer
                filters={movieGenresList}
                items={upcomingMovies}
                link="/movies"
                title="Upcoming Movies"
                titleStyles={{
                    color: COLORS.white,
                }}
                type="movie"
            />
            <ShowsContainer
                filters={tvGenresList}
                items={tvPopular}
                link="/tv"
                title="Popular TV Shows"
                titleStyles={{
                    color: COLORS.white,
                }}
                type="tv"
            />
        </Container>
    );
};

export { Featured };
