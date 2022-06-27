import type { FC } from 'react';
import { Flex } from '@chakra-ui/react';

import { Hero } from './Hero';
import { Featured } from './Featured';
import { NowPlaying } from './NowPlaying';

const Home: FC = () => {
    return (
        <Flex bg="#000" direction="column" w="full">
            <Hero />
            <Featured />
            <NowPlaying />
        </Flex>
    );
};

export { Home };
