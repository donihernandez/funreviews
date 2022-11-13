import type { FC } from 'react';

import { useShowsContext } from 'contexts/ShowsContext';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { COLORS } from '../../../styles/theme';
import { Search2Icon } from '@chakra-ui/icons';

const SearchInput: FC = () => {
    const { searchTerm, setSearchTerm } = useShowsContext();

    const commonStyles = {
        bg: 'transparent',
        border: '3px solid',
        borderColor: COLORS.white,
        borderRadius: '0',
        color: COLORS.white,
        fontFamily: 'Nunito',
        fontSize: '18px',
    };

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
                onChange={e => {
                    setSearchTerm(e.target.value);
                }}
                placeholder="Search movies, tv shows...."
                value={searchTerm}
            />
            <InputRightElement color={COLORS.white} h="70px">
                <Search2Icon />
            </InputRightElement>
        </InputGroup>
    );
};

export { SearchInput };
