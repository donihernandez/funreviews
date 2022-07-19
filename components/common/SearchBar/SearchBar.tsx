import {
    EventHandler,
    FC,
    KeyboardEvent,
    MouseEvent,
    MouseEventHandler,
    SetStateAction,
    useEffect,
    useState,
} from 'react';
import { Search2Icon } from '@chakra-ui/icons';
import {
    Button,
    Container,
    Flex,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { COLORS } from '@/styles/theme';
import { useShowsContext } from 'contexts/ShowsContext';
import { getPopular, searchByName } from '@/api/movies/queries';
import { useDebounce } from 'hooks';

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
    const [isSearching, setIsSearching] = useState(false);

    const handleSearchByName = async () => {
        const response = await searchByName(debouncedText);
        if (response) {
            setShows(response.results);
            setTotalPages(response.total_pages);
        }
    };

    const handleGetPopular = async () => {
        const response = await getPopular();
        if (response) {
            setShows(response.results);
            setTotalPages(response.total_pages);
        }
    };

    useEffect(() => {
        if (debouncedText) {
            setIsSearching(true);
            if (type === 'movie') {
                handleSearchByName();
                setIsSearching(false);
            }
        } else {
            handleGetPopular();
            setIsSearching(false);
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
