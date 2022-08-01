import { FC, useState } from 'react';

import { useEffect } from 'react';
import { Flex } from '@chakra-ui/react';

import { getMovieGenres, getPopular } from '_tmdb/movies/queries';

import { Wrapper } from '@/components/common/Wrapper';
import { Intro } from '@/components/common/Intro';
import { ShowsList } from '@/components/common/Shows/ShowsList';

import { useShowsContext } from 'contexts/ShowsContext';
import { Sidebar } from '@/components/common/Sidebar';

import { Loading } from '../common/Loading';

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

    const { setType, setGenres, setTotalPages, setShows } = useShowsContext();
    const [isLoading, setIsLoading] = useState(false);

    const getMovies = async () => {
        setShows([]);
        const movies = await getPopular();
        setShows(movies.results);
        setTotalPages(movies.total_pages);
        setType('movie');
    };

    const getGenres = async () => {
        const genres = await getMovieGenres();
        setGenres(genres.genres);
    };

    useEffect(() => {
        setIsLoading(true);
        getMovies();
        getGenres();
        setIsLoading(false);
    }, []);

    return (
        <Wrapper>
            <Intro breadcrumbs={breadcrumbs} title="Movies" />
            <Flex direction={['column-reverse', null, 'row']}>
                {isLoading ? (
                    <Loading />
                ) : (
                    <>
                        <ShowsList />
                        <Sidebar />
                    </>
                )}
            </Flex>
        </Wrapper>
    );
};

export { Movies };
