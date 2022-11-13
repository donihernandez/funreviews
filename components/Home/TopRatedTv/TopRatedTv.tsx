import type { FC } from 'react';
import { Container } from '@chakra-ui/react';

import { useQuery } from '@tanstack/react-query';

import { COLORS } from '../../../styles/theme';

import { ShowsContainer } from '@/components/common/Shows/ShowsContainer';
import { Loading } from '@/components/common/Loading';
import { getTvTopRated } from '_tmdb/tv/queries';

const TopRatedTv: FC = () => {
    const { data: topRated, isSuccess } = useQuery(['topRatedTv'], () =>
        getTvTopRated(),
    );

    return (
        <Container
            h="full"
            maxW={{ base: '300vw', lg: '80vw' }}
            padding="50px 15px 100px"
        >
            {isSuccess ? (
                <ShowsContainer
                    items={topRated?.results}
                    link="/tv-shows"
                    title="Top Rated TV Shows"
                    titleStyles={{
                        color: COLORS.white,
                        fontSize: ['30px', null, '40px', '50px'],
                    }}
                    type="tv"
                />
            ) : (
                <Loading />
            )}
        </Container>
    );
};

export { TopRatedTv };
