import type { FC } from 'react';
import { Input, InputGroup, InputRightElement, Select } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';

import { COLORS } from '../../../styles/theme';

const commonStyles = {
  bg: 'transparent',
  color: COLORS.white,
  borderRadius: '0',
  border: '3px solid',
  fontSize: '18px',
  fontFamily: 'Nunito',
  borderColor: COLORS.white,
};

const Filters: FC = () => {
  return (
    <Select
      h="70px"
      maxW="200px"
      borderRight="1px solid"
      borderRightColor={COLORS.white}
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
        h="70px"
        w="full"
        borderLeft="none"
        _placeholder={{
          color: COLORS.white,
        }}
        {...commonStyles}
        placeholder="Search movies, tv shows...."
      />
      <InputRightElement h="70px" color={COLORS.white}>
        <Search2Icon />
      </InputRightElement>
    </InputGroup>
  );
};

export { Filters, SearchInput };
