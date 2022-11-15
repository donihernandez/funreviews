import { Box, Container, Flex } from '@chakra-ui/react';

import Search from '../Search/Search';

import { Welcome } from './Welcome';

const Hero = () => {
    return (
        <Flex
            bgAttachment="fixed"
            bgImage="/hero-bg.avif"
            bgRepeat="no-repeat"
            bgSize="cover"
            w="full"
        >
            <Box
                backdropFilter={'blur(2px)'}
                background="blackAlpha.800"
                h="full"
                maxH={['130vh', null, '105vh']}
                position="absolute"
                w="full"
                zIndex={0}
            ></Box>
            <Container
                h="full"
                maxW={{ base: '300vw', lg: '80vw' }}
                minH="100vh"
                pb={55}
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

export default Hero;
