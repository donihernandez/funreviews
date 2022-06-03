import { Box, Container } from '@chakra-ui/react';
import { SearchBar } from '../common/SearchBar';
import { Featured } from './Featured';
import { Welcome } from './Welcome';

const Hero = () => {
  return (
    <Box
      w="full"
      bgImage="/bg.jpg"
      bgRepeat="no-repeat"
      bgSize="cover"
      h="full"
    >
      <Container maxW={{ base: '100vw', lg: '80vw' }} minH="100vh" h="full">
        <Welcome />
        <SearchBar />
        <Featured />
      </Container>
    </Box>
  );
};

export { Hero };
