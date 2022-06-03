import { Flex } from '@chakra-ui/react';
import { InfoCard } from '../common/InfoCard';
import { SearchBar } from '../common/SearchBar';

const Hero = () => {
  return (
    <Flex w="full" mt="15px" direction="column">
      <SearchBar />

      <Flex h="full" w="full">
        <InfoCard />
      </Flex>
    </Flex>
  );
};

export { Hero };
