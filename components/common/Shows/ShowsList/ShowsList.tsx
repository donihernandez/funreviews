import { FC } from 'react';
import {
    Pagination,
    PaginationContainer,
    PaginationNext,
    PaginationPrevious,
    usePagination,
} from '@ajna/pagination';

import { Movie, Tv } from 'typings';
import { Show } from '../Show';

import { List, ShowsListContainer } from './ShowsList.components';
import { getPopular } from '_tmdb/movies/queries';
import { getTvPopular } from '_tmdb/tv/queries';

import { COLORS } from '@/styles/theme';
import { useState } from 'react';
import { Loading } from '../../Loading';

import { useShowsContext } from 'contexts/ShowsContext';

interface IShowsListProps {
    type: string;
}

const ShowsList: FC<IShowsListProps> = ({ type }) => {
    const { totalPages, shows, setShows } = useShowsContext();

    const [isLoading, setIsLoading] = useState(false);

    const { currentPage, setCurrentPage, pagesCount } = usePagination({
        initialState: { currentPage: 1 },
        pagesCount: totalPages,
    });

    const pageButtonStyles = {
        _hover: {
            bg: COLORS.primary,
        },
        bg: COLORS.orange,
        borderRadius: '0',
        color: COLORS.white,
        cursor: 'pointer',
        transition: 'all 0.5s ease-in-out',
    };

    const fetchMoreShows = async (page: number) => {
        let res = null;
        setIsLoading(true);
        if (type === 'movie') {
            res = await getPopular(page);
            if (res) {
                setShows(() => res.results);
                setCurrentPage(page);
            }
        } else if (type === 'tv') {
            res = await getTvPopular(page);
            if (res) {
                setShows(() => res.results);
                setCurrentPage(page);
            }
        }
        setIsLoading(false);
    };

    return (
        <ShowsListContainer>
            {totalPages > 0 && (
                <Pagination
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    pagesCount={pagesCount}
                >
                    <PaginationContainer
                        justifyContent="space-between"
                        w="full"
                    >
                        <PaginationPrevious
                            onClick={() => fetchMoreShows(currentPage - 1)}
                            {...pageButtonStyles}
                        >
                            Previous
                        </PaginationPrevious>
                        <PaginationNext
                            onClick={() => fetchMoreShows(currentPage + 1)}
                            {...pageButtonStyles}
                        >
                            Next
                        </PaginationNext>
                    </PaginationContainer>
                </Pagination>
            )}

            {shows.length > 0 ? (
                <List>
                    {shows.map((show: Movie | Tv) => {
                        return !isLoading ? (
                            <Show key={show.id} show={show} />
                        ) : (
                            <Loading />
                        );
                    })}
                </List>
            ) : (
                <Loading />
            )}

            {totalPages > 0 && (
                <Pagination
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    pagesCount={pagesCount}
                >
                    <PaginationContainer
                        justifyContent="space-between"
                        w="full"
                    >
                        <PaginationPrevious
                            onClick={() => fetchMoreShows(currentPage - 1)}
                            {...pageButtonStyles}
                        >
                            Previous
                        </PaginationPrevious>
                        <PaginationNext
                            onClick={() => fetchMoreShows(currentPage + 1)}
                            {...pageButtonStyles}
                        >
                            Next
                        </PaginationNext>
                    </PaginationContainer>
                </Pagination>
            )}
        </ShowsListContainer>
    );
};

export { ShowsList };
