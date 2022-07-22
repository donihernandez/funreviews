import { FC, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Intro } from '../common/Intro';
import { ShowsList } from '../common/ShowsList';
import { Wrapper } from '../common/Wrapper';

import { getMovieGenres, getPopular } from '_tmdb/movies/queries';
import { useShowsContext } from 'contexts/ShowsContext';
import { Flex } from '@chakra-ui/react';
import { Sidebar } from '../common/Sidebar';
import { Loading } from '../common/Loading';
import { useRecoilState } from 'recoil';
import { showsState } from 'recoil/atoms';

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
    const [shows, setShows] = useRecoilState(showsState);

    const { setGenres, setTotalPages, setType } = useShowsContext();
    const [isLoading, setIsLoading] = useState(false);

    const handleGetPopularMovies = async () => {
        const movies = await getPopular();
        if (movies) {
            setShows(() => movies.results);
            setTotalPages(movies.total_pages);
        }
    };

    const handleGetMovieGenres = async () => {
        const genres = await getMovieGenres();
        if (genres) {
            setGenres(genres.genres);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        handleGetPopularMovies();
        handleGetMovieGenres();
        setType('movie');
        setIsLoading(false);
    }, []);

    return (
        <Wrapper>
            <Intro breadcrumbs={breadcrumbs} title="Movies" />
            <Flex>
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
