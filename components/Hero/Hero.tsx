import { Box, Container, Flex, Image } from '@chakra-ui/react';

import { useBreakpoints } from '../../hooks';
import { SearchBar } from '../common/SearchBar';

import { Welcome } from './Welcome';

const Hero = () => {
    const { isSmallerThanDesktop } = useBreakpoints();

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
                    {!isSmallerThanDesktop && (
                        <Image
                            alt="Like"
                            height="500px"
                            src="/likes.webp"
                            w="500px"
                        />
                    )}
                </Flex>
            </Container>
        </Box>
    );
};

export { Hero };
