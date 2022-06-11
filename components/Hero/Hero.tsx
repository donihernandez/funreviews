import { Box, Container, Flex } from '@chakra-ui/react';

import { SearchBar } from '../common/SearchBar';

import { Welcome } from './Welcome';

const Hero = () => {
    return (
        <Box
            bg="#000"
            bgRepeat="no-repeat"
            bgSize="cover"
            h="full"
            paddingBottom={['0', null, '100px']}
            w="full"
        >
            <Container
                h="full"
                maxW={{ base: '300vw', lg: '80vw' }}
                minH="100vh"
            >
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    w="full"
                >
                    <Flex direction="column">
                        <Welcome />
                        <SearchBar />
                    </Flex>
                </Flex>
            </Container>
        </Box>
    );
};

export { Hero };
