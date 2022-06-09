import { Flex } from '@chakra-ui/react';
import type { NextPage } from 'next';

import { ShowsContainer } from '@/components/common/ShowsContainer';
import { COLORS } from '@/styles/theme';
import { Hero } from '../components/Hero';

const Home: NextPage = () => {
    return (
        <Flex bg="#000" direction="column">
            <Hero />
            <ShowsContainer
                filters={['sci-fi', 'terror', 'comedy']}
                items={[]}
                link=""
                title="Upcoming Movies"
                titleStyles={{
                    color: COLORS.white,
                }}
            />
        </Flex>
    );
};

export default Home;
