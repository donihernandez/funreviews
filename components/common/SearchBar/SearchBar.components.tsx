import type { FC } from 'react';
import { Input, InputGroup, InputRightElement, Select } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';

import { COLORS } from '../../../styles/theme';

const commonStyles = {
  bg: COLORS.secondary,
  color: COLORS.white,
  borderRadius: '0',
  border: '3px solid',
  borderColor: COLORS.primary,
};

const Filters: FC = () => {
  return (
    <Select
      h="50px"
      maxW="200px"
      borderRight="1px solid"
      borderRightColor={COLORS.primary}
      {...commonStyles}
    >
      <option value="movies">Movies</option>
      <option value="tv">TV Shows</option>
    </Select>
  );
};

const SearchInput = () => {
  return (
    <InputGroup>
      <Input
        h="50px"
        w="full"
        borderLeft="none"
        _placeholder={{
          color: COLORS.white,
        }}
        {...commonStyles}
        placeholder="Search movies, tv shows...."
      />
      <InputRightElement h="50px" color={COLORS.white}>
        <Search2Icon />
      </InputRightElement>
    </InputGroup>
  );
};

export { Filters, SearchInput };
