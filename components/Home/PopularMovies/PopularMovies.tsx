import type { FC } from 'react';
import { Container } from '@chakra-ui/react';

import { useQuery } from 'react-query';

import { COLORS } from '../../../styles/theme';

import { getPopular } from '_tmdb/movies/queries';
import { ShowsContainer } from '@/components/common/Shows/ShowsContainer';
import { Loading } from '@/components/common/Loading';

const PopularMovies: FC = () => {
    const { data: popularMovies, isSuccess } = useQuery(['popularMovies'], () =>
        getPopular(),
    );

    return (
        <Container
            h="full"
            maxW={{ base: '300vw', lg: '80vw' }}
            padding="50px 15px"
        >
            {isSuccess ? (
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
            ) : (
                <Loading />
            )}
        </Container>
    );
};

export { PopularMovies };
