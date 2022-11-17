import type { FC } from 'react';
import { Container } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import { COLORS } from '../../../styles/theme';

import { ShowsContainer } from '@/components/common/Shows/ShowsContainer';
import { LIMIT, PAGE } from '@/utils/constants';
import { getTvTopRated } from '_tmdb/tv/queries';
import { Loading } from '@/components/common/Loading';

const TopRatedTv: FC = () => {
    const { data: topRatedTv, isSuccess } = useQuery(
        ['topRatedTv', PAGE, LIMIT],
        () => getTvTopRated(PAGE, LIMIT),
    );

    return isSuccess ? (
        <Container
            h="full"
            maxW={{ base: '300vw', lg: '80vw' }}
            padding="50px 15px 100px"
        >
            <ShowsContainer
                items={topRatedTv?.results}
                link="/tv-shows"
                title="Top Rated TV Shows"
                titleStyles={{
                    color: COLORS.white,
                    fontSize: ['30px', null, '40px', '50px'],
                }}
                type="tv"
            />
        </Container>
    ) : (
        <Loading />
    );
};

export default TopRatedTv;
