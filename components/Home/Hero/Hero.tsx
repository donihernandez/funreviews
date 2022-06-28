import { Container, Flex } from '@chakra-ui/react';

import { Search } from '../Search';

import { Welcome } from './Welcome';

const Hero = () => {
    return (
        <Container h="full" maxW={{ base: '300vw', lg: '80vw' }} minH="100vh">
            <Flex alignItems="center" justifyContent="space-between" w="full">
                <Flex direction="column">
                    <Welcome />
                    <Search />
                </Flex>
            </Flex>
        </Container>
    );
};

export { Hero };
