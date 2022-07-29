import type { FC } from 'react';
import { Container } from '@chakra-ui/react';

import { useQuery } from 'react-query';

import { COLORS } from '../../../styles/theme';

import { ShowsContainer } from '@/components/common/Shows/ShowsContainer';
import { Loading } from '@/components/common/Loading';
import { getTvPopular } from '_tmdb/tv/queries';

const PopularTv: FC = () => {
    const { data: popularTv, isSuccess } = useQuery(['popularTv'], () =>
        getTvPopular(),
    );

    return (
        <Container
            h="full"
            maxW={{ base: '300vw', lg: '80vw' }}
            padding="50px 15px"
        >
            {isSuccess ? (
                <ShowsContainer
                    items={popularTv?.results}
                    link="/tv"
                    title="Popular TV Shows"
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

export { PopularTv };
