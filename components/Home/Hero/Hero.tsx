import { Box, Container, Flex } from '@chakra-ui/react';

import { Search } from '../Search';

import { Welcome } from './Welcome';

const Hero = () => {
    return (
        <Flex bgImage="/hero-bg.avif" w="full">
            <Box
                backdropFilter={'blur(2px)'}
                background="blackAlpha.800"
                h="full"
                maxH="100vh"
                position="absolute"
                w="full"
                zIndex={0}
            ></Box>
            <Container
                h="full"
                maxW={{ base: '300vw', lg: '80vw' }}
                minH="100vh"
                zIndex={555}
            >
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    w="full"
                >
                    <Flex direction="column">
                        <Welcome />
                        <Search />
                    </Flex>
                </Flex>
            </Container>
        </Flex>
    );
};

export { Hero };
