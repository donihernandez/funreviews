import type { FC } from 'react';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Intro } from '../common/Intro';
import { ShowsList } from '../common/Shows/ShowsList';
import { Wrapper } from '../common/Wrapper';

import { useShowsContext } from 'contexts/ShowsContext';
import { Flex } from '@chakra-ui/react';
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

    const { setTotalPages, setShows } = useShowsContext();
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const [searchText] = useState(router.query.search);

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

    useEffect(() => {
        if (searchText) {
            setIsLoading(true);
            handleSearchTvByName();
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
                        <ShowsList type="tv" />
                        {/* <Sidebar /> */}
                    </>
                )}
            </Flex>
        </Wrapper>
    );
};

export { Tv };
