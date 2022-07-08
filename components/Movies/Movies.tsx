import { FC, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { Intro } from '../common/Intro';
import { ShowsList } from '../common/ShowsList';
import { Wrapper } from '../common/Wrapper';

import { getMovieGenres, getPopular } from '@/api/movies/queries';
import { useShowsContext } from 'contexts/ShowsContext';

const Movies: FC = () => {
    const breadcrumbs = [
        {
            link: '/',
            name: 'Home',
        },
        {
            isCurrentPage: true,
            link: '#',
            name: 'Movies',
        },
    ];

    const { setShows, setGenres } = useShowsContext();

    const { data: movies, isSuccess: moviesSuccess } = useQuery(
        'getPopular',
        getPopular,
    );
    const { data: genres, isSuccess: genresSuccess } = useQuery(
        'getGenres',
        getMovieGenres,
    );

    useEffect(() => {
        if (moviesSuccess) {
            setShows(movies.results);
        }

        if (genresSuccess) {
            setGenres(genres.genres);
        }
    }, [moviesSuccess, genresSuccess]);

    return (
        <Wrapper>
            <Intro breadcrumbs={breadcrumbs} title="Movies" />
            <ShowsList />
        </Wrapper>
    );
};

export { Movies };
