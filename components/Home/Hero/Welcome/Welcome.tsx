import type { FC } from 'react';
import { chakra, Flex, Heading, Text } from '@chakra-ui/react';

import { COLORS } from '../../../../styles/theme';

const Welcome: FC = () => {
    return (
        <Flex alignItems="flex-end" justifyContent="space-between">
            <Flex
                direction="column"
                m="200px 0 40px 0"
                w={{ base: '100%', lg: '90%' }}
            >
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
                    The most completed and fun reviews platform for movies and
                    tv shows.
                </Text>
            </Flex>
        </Flex>
    );
};

export { Welcome };
