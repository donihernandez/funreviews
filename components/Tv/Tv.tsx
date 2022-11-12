import type { FC } from 'react';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Intro } from '../common/Intro';
import { ShowsList } from '../common/Shows/ShowsList';
import { Wrapper } from '../common/Wrapper';

import { useShowsContext } from 'contexts/ShowsContext';
import { Flex } from '@chakra-ui/react';
import { Sidebar } from '../common/Sidebar';
import { getTvGenres, getTvPopular } from '_tmdb/tv/queries';
import { Loading } from '../common/Loading';
import { searchTvByName } from '_tmdb/tv/queries/searchTvByName';

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

    const { setGenres, type, setTotalPages, setType, setShows } =
        useShowsContext();
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const [searchText] = useState(router.query.search);

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

    const handleSearchTvByName = async () => {
        const response = await searchTvByName(searchText as string);
        updateShows(response);
    };

    const updateShows = showsData => {
        if (showsData) {
            setShows(() => showsData.results);
            setTotalPages(showsData.total_pages);
        }
    };

    console.log(type);

    useEffect(() => {
        if (searchText) {
            setIsLoading(true);
            handleSearchTvByName();
            setIsLoading(false);
        } else {
            setIsLoading(true);
            getTv();
            getGenres();
            setIsLoading(false);
        }
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
                        {/* <Sidebar /> */}
                    </>
                )}
            </Flex>
        </Wrapper>
    );
};

export { Tv };
