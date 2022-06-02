import { Flex } from '@chakra-ui/react';
import { SearchBar } from '../common/SearchBar';

const Hero = () => {
  return (
    <Flex w="full" mt="15px" direction="column">
      <SearchBar />
    </Flex>
  );
};

export { Hero };
