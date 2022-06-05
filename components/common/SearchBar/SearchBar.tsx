import { Flex } from '@chakra-ui/react';
import { Filters, SearchButton, SearchInput } from './SearchBar.components';

const SearchBar = () => {
  return (
    <Flex direction="column">
      <Flex w={['100%', null, '800px']} direction={['column', null, 'row']}>
        <Filters />
        <SearchInput />
      </Flex>
      <SearchButton />
    </Flex>
  );
};

export { SearchBar };
