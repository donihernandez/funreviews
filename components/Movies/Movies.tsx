import type { FC } from 'react';

import { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';

import { searchMovieByName } from '_tmdb/movies/queries';

import { Wrapper } from '@/components/common/Wrapper';
import { Intro } from '@/components/common/Intro';
import { ShowsList } from '@/components/common/Shows/ShowsList';

import { useShowsContext } from 'contexts/ShowsContext';

import { Loading } from '../common/Loading';
import { useRouter } from 'next/router';

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

    const { setTotalPages, setShows } = useShowsContext();
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const [searchText] = useState(router.query.search);

    const handleSearchMovieByName = async () => {
        const response = await searchMovieByName(searchText as string);
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
            handleSearchMovieByName();
            setIsLoading(false);
        }
    }, []);

    return (
        <Wrapper>
            <Intro breadcrumbs={breadcrumbs} title="Movies" />
            <Flex direction={['column-reverse', null, 'row']}>
                {isLoading ? (
                    <Loading />
                ) : (
                    <>
                        <ShowsList type="movie" />
                        {/* <Sidebar /> */}
                    </>
                )}
            </Flex>
        </Wrapper>
    );
};

export { Movies };
