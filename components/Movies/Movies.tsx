import type { FC } from 'react';

import { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';

import { getMovieGenres, getPopular } from '_tmdb/movies/queries';

import { Wrapper } from '@/components/common/Wrapper';
import { Intro } from '@/components/common/Intro';
import { ShowsList } from '@/components/common/ShowsList';

import { Loading } from '@/components/common/Loading';
import { useShowsContext } from 'contexts/ShowsContext';
import { Sidebar } from '@/components/common/Sidebar';
import { useQuery } from 'react-query';

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

    const [isLoading, setIsLoading] = useState(false);
    const { setShows, setType, setGenres, setTotalPages } = useShowsContext();

    const { data: movies, isSuccess: moviesSuccess } = useQuery(
        ['getPopular'],
        () => getPopular(),
    );

    const { data: genres, isSuccess: genresSuccess } = useQuery(
        'getGenres',
        getMovieGenres,
    );

    useEffect(() => {
        setIsLoading(true);
        if (moviesSuccess && genresSuccess) {
            setShows(movies.results);
            setTotalPages(movies.total_pages);
            setGenres(genres.genres);
            setType('movie');
            setIsLoading(false);
        }
    }, [moviesSuccess, genresSuccess]);

    return (
        <Wrapper>
            <Intro breadcrumbs={breadcrumbs} title="Movies" />
            <Flex direction={['column-reverse', null, 'row']}>
                {!isLoading ? (
                    <>
                        <ShowsList />
                        <Sidebar />
                    </>
                ) : (
                    <Loading />
                )}
            </Flex>
        </Wrapper>
    );
};

export { Movies };
