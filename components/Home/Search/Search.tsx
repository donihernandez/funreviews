import { Flex } from '@chakra-ui/react';
import { Filters, SearchButton, SearchInput } from './Search.components';

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
