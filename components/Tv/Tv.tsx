import type { FC } from 'react';

import { useEffect, useState } from 'react';

import { Intro } from '../common/Intro';
import { ShowsList } from '../common/Shows/ShowsList';
import { Wrapper } from '../common/Wrapper';

import { useShowsContext } from 'contexts/ShowsContext';
import { Flex } from '@chakra-ui/react';
import { Sidebar } from '../common/Sidebar';
import { getTvGenres, getTvPopular } from '_tmdb/tv/queries';
import { Loading } from '../common/Loading';

const Tv: FC = () => {
    const breadcrumbs = [
        {
            link: '/',
            name: 'Home',
        },
        {
            isCurrentPage: true,
            link: '#',
            name: 'Tv Shows',
        },
    ];

    const { setGenres, setTotalPages, setType, setShows } = useShowsContext();
    const [isLoading, setIsLoading] = useState(false);

    const getTv = async () => {
        setShows([]);
        const tv = await getTvPopular();
        setShows(tv.results);
        setTotalPages(tv.total_pages);
        setType('tv');
    };

    const getGenres = async () => {
        const genres = await getTvGenres();
        setGenres(genres.genres);
    };

    useEffect(() => {
        setIsLoading(true);
        getTv();
        getGenres();
        setIsLoading(false);
    }, []);

    return (
        <Wrapper>
            <Intro breadcrumbs={breadcrumbs} title="TV Shows" />
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

export { Tv };
