import type { FC } from 'react';
import { Container } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import { COLORS } from '../../../styles/theme';

import { ShowsContainer } from '@/components/common/Shows/ShowsContainer';
import { getTopRated } from '_tmdb/movies/queries';
import { LIMIT, PAGE } from '@/utils/constants';
import { Loading } from '@/components/common/Loading';

const TopRatedMovies: FC = () => {
    const { data: topRatedMovies, isSuccess } = useQuery(
        ['topRatedMovies', PAGE, LIMIT],
        () => getTopRated(LIMIT),
    );

    return isSuccess ? (
        <Container
            h="full"
            maxW={{ base: '300vw', lg: '80vw' }}
            padding="50px 15px"
        >
            <ShowsContainer
                items={topRatedMovies?.results}
                link="/movies"
                title="Top Rated Movies"
                titleStyles={{
                    color: COLORS.white,
                    fontSize: ['30px', null, '40px', '50px'],
                }}
                type="movie"
            />
        </Container>
    ) : (
        <Loading />
    );
};

export default TopRatedMovies;
