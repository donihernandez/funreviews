import { Flex } from '@chakra-ui/react';
import { Filters, SearchButton, SearchInput } from './SearchBar.components';

const SearchBar = () => {
  return (
    <Flex w="full" direction={['column', null, 'row']}>
      <Filters />
      <SearchInput />
      <SearchButton />
    </Flex>
  );
};

export { SearchBar };
