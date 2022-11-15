import {
    Button,
    chakra,
    Flex,
    Input,
    InputGroup,
    InputRightElement,
    Select,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { COLORS } from '@/styles/theme';
import { Search2Icon } from '@chakra-ui/icons';

const Search = () => {
    const [searchText, setSearchText] = useState('');
    const [type, setType] = useState('movie');
    const router = useRouter();

    const commonStyles = {
        bg: 'transparent',
        border: '3px solid',
        borderColor: COLORS.white,
        borderRadius: '0',
        color: COLORS.white,
        fontFamily: 'Nunito',
        fontSize: '18px',
    };

    const handleSearch = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const url = type === 'movie' ? '/movies' : '/tv-shows';

        router.push(
            {
                pathname: url,
                query: { search: searchText },
            },
            undefined,
            {
                shallow: true,
            },
        );
    };

    return (
        <Flex direction="column">
            <chakra.form onSubmit={handleSearch}>
                <Flex
                    direction={['column', null, 'row']}
                    w={['100%', null, '800px']}
                >
                    <Select
                        borderBottom={['1px solid', null, '3px solid']}
                        borderRight={[null, null, '1px solid']}
                        borderRightColor={COLORS.white}
                        h="70px"
                        maxW={['100%', null, '200px']}
                        {...commonStyles}
                        onChange={e => setType(e.target.value)}
                        value={type}
                    >
                        <option value="movie">Movies</option>
                        <option value="tv">TV Shows</option>
                    </Select>
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
                                setSearchText(e.target.value);
                            }}
                            placeholder="Search movies, tv shows...."
                            value={searchText}
                        />
                        <InputRightElement color={COLORS.white} h="70px">
                            <Search2Icon />
                        </InputRightElement>
                    </InputGroup>
                </Flex>
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
                    type="submit"
                    variant="outline"
                    w={['full', null, '200px']}
                >
                    Search
                </Button>
            </chakra.form>
        </Flex>
    );
};

export default Search;
