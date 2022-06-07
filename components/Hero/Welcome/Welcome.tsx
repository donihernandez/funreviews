import type { FC } from 'react';
import { chakra, Flex, Heading, Text } from '@chakra-ui/react';

import { COLORS } from '../../../styles/theme';

const Welcome: FC = () => {
    return (
        <Flex direction="column" m="200px 0 80px 0" w={['100%', null, '800px']}>
            <Heading
                as="h1"
                color={COLORS.white}
                data-testid="welcome-heading"
                fontFamily="Lato"
                fontSize={['6xl', null, '8xl']}
            >
                Welcome to Fun{' '}
                <chakra.span color={COLORS.orange}>Reviews</chakra.span>!
            </Heading>
            <Text
                color="white"
                fontFamily="Nunito"
                fontSize={['2xl', null, '4xl']}
            >
                The most completed and fun reviews platform for movies and tv
                shows.
            </Text>
        </Flex>
    );
};

export { Welcome };
