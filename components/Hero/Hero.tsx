import { Box, Container } from '@chakra-ui/react';
import { SearchBar } from '../common/SearchBar';
import { Welcome } from './Welcome';

const Hero = () => {
  return (
    <Box w="full" bg="#000" bgRepeat="no-repeat" bgSize="cover" h="full">
      <Container maxW={{ base: '100vw', lg: '80vw' }} minH="100vh" h="full">
        <Welcome />
        <SearchBar />
      </Container>
    </Box>
  );
};

export { Hero };
