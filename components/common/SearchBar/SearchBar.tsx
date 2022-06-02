import { Flex } from '@chakra-ui/react';
import { Filters, SearchInput } from './SearchBar.components';

const SearchBar = () => {
  return (
    <Flex w="full">
      <Filters />
      <SearchInput />
    </Flex>
  );
};

export { SearchBar };
