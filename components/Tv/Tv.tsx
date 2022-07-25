import { FC, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Intro } from '../common/Intro';
import { ShowsList } from '../common/Shows/ShowsList';
import { Wrapper } from '../common/Wrapper';

import { useShowsContext } from 'contexts/ShowsContext';
import { Flex } from '@chakra-ui/react';
import { Sidebar } from '../common/Sidebar';
import { getTvGenres, getTvPopular } from '_tmdb/tv/queries';

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

    const { setShows, setGenres, setTotalPages, setType } = useShowsContext();

    const { data: tv, isSuccess: tvSucess } = useQuery(['getPopular'], () =>
        getTvPopular(),
    );

    const { data: genres, isSuccess: genresSuccess } = useQuery(
        'getGenres',
        getTvGenres,
    );

    useEffect(() => {
        if (tvSucess) {
            setShows(tv.results);
            setTotalPages(tv.total_pages);
        }

        if (genresSuccess) {
            setGenres(genres.genres);
        }

        setType('tv');
    }, [tvSucess, genresSuccess]);

    return (
        <Wrapper>
            <Intro breadcrumbs={breadcrumbs} title="TV Shows" />
            <Flex direction={['column-reverse', null, 'row']}>
                <ShowsList />
                <Sidebar />
            </Flex>
        </Wrapper>
    );
};

export { Tv };
