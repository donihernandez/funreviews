import type { FC } from 'react';
import { Container } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import { COLORS } from '../../../styles/theme';

import { ShowsContainer } from '@/components/common/Shows/ShowsContainer';
import { LIMIT, PAGE } from '@/utils/constants';
import { getTvPopular } from '_tmdb/tv/queries';
import { Loading } from '@/components/common/Loading';

const PopularTv: FC = () => {
    const { data: popularTv, isSuccess } = useQuery(
        ['popularTv', PAGE, LIMIT],
        () => getTvPopular(PAGE, LIMIT),
    );

    return isSuccess ? (
        <Container
            h="full"
            maxW={{ base: '300vw', lg: '80vw' }}
            padding="50px 15px"
        >
            <ShowsContainer
                items={popularTv?.results}
                link="/tv-shows"
                title="Popular TV Shows"
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

export default PopularTv;
