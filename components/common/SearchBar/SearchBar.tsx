import type { FC } from 'react';
import { SetStateAction, useEffect } from 'react';
import { Search2Icon } from '@chakra-ui/icons';
import {
    Container,
    Flex,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { COLORS } from '@/styles/theme';
import { getPopular, searchMovieByName } from '_tmdb/movies/queries';
import { useDebounce } from 'hooks';
import { searchTvByName } from '_tmdb/tv/queries/searchTvByName';
import { getTvPopular } from '_tmdb/tv/queries';
import { useShowsContext } from 'contexts/ShowsContext';

const SearchBar: FC = () => {
    const commonStyles = {
        bg: 'transparent',
        borderColor: COLORS.white,
        borderRadius: '0',
        color: COLORS.white,
        fontFamily: 'Nunito',
        fontSize: '18px',
    };

    const { type, setTotalPages, searchTerm, setSearchTerm, setShows } =
        useShowsContext();

    const debouncedText = useDebounce(searchTerm, 500);

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
            setShows(() => showsData.results);
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
            } else if (type === 'tv') {
                handleGetTvPopular();
            }
        }
    }, [debouncedText]);

    return (
        <Container maxW={['100vw', null, '50vw']} w="full">
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
                        }) => setSearchTerm(e.target.value)}
                        placeholder="Search by name...."
                        value={searchTerm}
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
