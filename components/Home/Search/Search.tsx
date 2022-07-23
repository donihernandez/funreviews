import { Flex } from '@chakra-ui/react';
import { Filters } from './Filters';
import { SearchButton } from './SearchButton';
import { SearchInput } from './SearchInput';

const Search = () => {
    return (
        <Flex direction="column">
            <Flex
                direction={['column', null, 'row']}
                w={['100%', null, '800px']}
            >
                <Filters />
                <SearchInput />
            </Flex>
            <SearchButton />
        </Flex>
    );
};

export { Search };
