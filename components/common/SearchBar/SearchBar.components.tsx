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
    border: '3px solid',
    borderColor: COLORS.white,
    borderRadius: '0',
    color: COLORS.white,
    fontFamily: 'Nunito',
    fontSize: '18px',
};

const Filters: FC = () => {
    return (
        <Select
            borderBottom={['1px solid', null, '3px solid']}
            borderRight={[null, null, '1px solid']}
            borderRightColor={COLORS.white}
            h="70px"
            maxW={['100%', null, '200px']}
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
                _placeholder={{
                    color: COLORS.white,
                }}
                borderBottom={['1px solid', null, '3px solid']}
                borderLeft={[null, null, 'none']}
                h="70px"
                w="full"
                {...commonStyles}
                placeholder="Search movies, tv shows...."
            />
            <InputRightElement color={COLORS.white} h="70px">
                <Search2Icon />
            </InputRightElement>
        </InputGroup>
    );
};

const SearchButton: FC = () => {
    return (
        <Button
            _active={{
                bg: 'transparent',
                borderColor: COLORS.primary,
            }}
            _hover={{
                bg: 'transparent',
                borderColor: COLORS.orange,
                color: COLORS.orange,
            }}
            border="3px solid"
            borderColor={COLORS.white}
            borderRadius="0"
            color={COLORS.white}
            fontSize={['14px', '18px']}
            h="70px"
            mt={[null, '50px']}
            transition="all 0.3s ease-in-out"
            variant="outline"
            w={['full', null, '200px']}
        >
            Search
        </Button>
    );
};
export { Filters, SearchInput, SearchButton };
