import type { FC } from 'react';
import { SetStateAction, useEffect, useState } from 'react';
import { Search2Icon } from '@chakra-ui/icons';
import {
    Container,
    Flex,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { COLORS } from '@/styles/theme';
import { useShowsContext } from 'contexts/ShowsContext';
import { getPopular, searchMovieByName } from '_tmdb/movies/queries';
import { useDebounce } from 'hooks';
import { searchTvByName } from '_tmdb/tv/queries/searchTvByName';
import { getTvPopular } from '_tmdb/tv/queries';

const SearchBar: FC = () => {
    const commonStyles = {
        bg: 'transparent',
        borderColor: COLORS.white,
        borderRadius: '0',
        color: COLORS.white,
        fontFamily: 'Nunito',
        fontSize: '18px',
    };

    const { type, setShows, setTotalPages } = useShowsContext();

    const [searchText, setSearchText] = useState('');
    const debouncedText = useDebounce(searchText, 500);

    const handleSearchMovieByName = async () => {
        const response = await searchMovieByName(debouncedText);
        updateShows(response);
    };

    const handleSearchTvByName = async () => {
        const response = await searchTvByName(debouncedText);
        updateShows(response);
    };

    const handleGetMoviePopular = async () => {
        const response = await getPopular();
        updateShows(response);
    };

    const handleGetTvPopular = async () => {
        const response = await getTvPopular();
        updateShows(response);
    };

    const updateShows = showsData => {
        if (showsData) {
            setShows(showsData.results);
            setTotalPages(showsData.total_pages);
        }
    };

    useEffect(() => {
        if (debouncedText) {
            if (type === 'movie') {
                handleSearchMovieByName();
            } else {
                handleSearchTvByName();
            }
        } else if (!debouncedText) {
            if (type === 'movie') {
                handleGetMoviePopular();
            } else {
                handleGetTvPopular();
            }
        }
    }, [debouncedText]);

    return (
        <Container maxW="50vw" w="full">
            <Flex
                alignItems="center"
                direction={['column', null, 'row']}
                mt={5}
                w="full"
            >
                <InputGroup>
                    <Input
                        _placeholder={{
                            color: COLORS.white,
                        }}
                        h="50px"
                        w="full"
                        {...commonStyles}
                        onChange={(e: {
                            target: { value: SetStateAction<string> };
                        }) => setSearchText(e.target.value)}
                        // onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                        //     handleSearch(e)
                        // }
                        placeholder="Search by name...."
                        value={searchText}
                    />
                    <InputRightElement color={COLORS.white} h="50px">
                        <Search2Icon />
                    </InputRightElement>
                </InputGroup>
            </Flex>
        </Container>
    );
};

export { SearchBar };
