import type { FC } from 'react';
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Select,
} from '@chakra-ui/react';
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
      maxW={['100%', null, '200px']}
      borderRight={[null, null, '1px solid']}
      borderBottom={['1px solid', null, '3px solid']}
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
        borderLeft={[null, null, 'none']}
        borderBottom={['1px solid', null, '3px solid']}
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

const SearchButton: FC = () => {
  return (
    <Button
      _hover={{
        bg: 'transparent',
        color: COLORS.orange,
      }}
      h="70px"
      variant="outline"
      borderRadius="0"
      border="3px solid"
      borderLeft={['3px solid', null, 'none']}
      borderColor={COLORS.white}
      color={COLORS.white}
    >
      Search
    </Button>
  );
};
export { Filters, SearchInput, SearchButton };