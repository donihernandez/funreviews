import { FC } from 'react';
import { Container } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import { COLORS } from '../../../styles/theme';

import { ShowsContainer } from '@/components/common/Shows/ShowsContainer';
import { LIMIT, PAGE } from '@/utils/constants';
import { getPopular } from '_tmdb/movies/queries';
import { Loading } from '@/components/common/Loading';

const PopularMovies: FC = () => {
    const { data: popularMovies, isSuccess } = useQuery(
        ['popularMovies', PAGE, LIMIT],
        () => getPopular(PAGE, LIMIT),
    );

    return isSuccess ? (
        <Container
            h="full"
            maxW={{ base: '300vw', lg: '80vw' }}
            padding="50px 15px"
        >
            <ShowsContainer
                items={popularMovies?.results}
                link="/movies"
                title="The Most Popular Movies"
                titleStyles={{
                    color: COLORS.white,
                    fontSize: '50px',
                }}
                type="movie"
            />
        </Container>
    ) : (
        <Loading />
    );
};

export default PopularMovies;
