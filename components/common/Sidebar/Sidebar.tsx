import { FC, useState } from 'react';
import {
    Box,
    Button,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select,
    Text,
    VStack,
} from '@chakra-ui/react';

import { COLORS } from '@/styles/theme';
import { useShowsContext } from 'contexts/ShowsContext';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { IQuery } from 'typings';
import { search } from '_tmdb/common/queries';

const Sidebar: FC = () => {
    const { genres, setShows, setTotalPages, type } = useShowsContext();

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [minAverageRating, setMinAverageRating] = useState(0);
    const [maxAverageRating, setMaxAverageRating] = useState(10);
    const [genre, setGenre] = useState('');
    const [sortBy, setSortBy] = useState('');

    const sortOptions = [
        {
            label: 'Popularity Descending',
            value: 'popularity.desc',
        },
        {
            label: 'Popularity Ascending',
            value: 'popularity.asc',
        },
        {
            label: 'Release Date Descending',
            value: 'release_date.desc',
        },
        {
            label: 'Release Date Ascending',
            value: 'release_date.asc',
        },
        {
            label: 'Average Rating Descending',
            value: 'vote_average.desc',
        },
        {
            label: 'Average Rating Ascending',
            value: 'vote_average.asc',
        },
        {
            label: 'Title Descending',
            value: 'original_title.desc',
        },
        {
            label: 'Title Ascending',
            value: 'original_title.asc',
        },
    ];

    const handleSearch = async () => {
        let res = null;

        let query = null;

        if (type === 'movie') {
            query = {
                'primary_release_date.gte': startDate
                    .toISOString()
                    .split('T')[0],
                'primary_release_date.lte': endDate.toISOString().split('T')[0],
                sort_by: sortBy,
                'vote_average.gte': minAverageRating,
                'vote_average.lte': maxAverageRating,
                with_genres: genre,
            };
        } else {
            query = {
                'first_air_date.gte': startDate.toISOString().split('T')[0],
                'first_air_date.lte': endDate.toISOString().split('T')[0],
                sort_by: sortBy,
                'vote_average.gte': minAverageRating,
                'vote_average.lte': maxAverageRating,
                with_genres: genre,
            };
        }

        const queryParams: IQuery = query;

        Object.keys(queryParams).forEach(key => {
            if (!queryParams[key]) {
                delete queryParams[key];
            }
        });

        res = await search(queryParams, type);
        updateShows(res);
    };

    const updateShows = showsData => {
        if (showsData) {
            setShows(showsData.results);
            setTotalPages(showsData.total_pages);
        }
    };

    return (
        <Box minW="300px" ml={[null, null, '40px']} p={[null, null, '100px 0']}>
            <Heading as="h2" color={COLORS.white} size="md">
                Search for Movie
            </Heading>
            <Divider color={COLORS.white} my="15px" />

            <VStack
                bg={COLORS.primary}
                p="20px 15px"
                position="sticky"
                spacing="20px"
                top="7rem"
            >
                <Box w="full">
                    <FormControl>
                        <FormLabel
                            color={COLORS.white}
                            fontSize="14px"
                            fontWeight="bold"
                            mb="5px"
                        >
                            Sort by
                        </FormLabel>
                        <Select
                            _placeholder={{
                                color: '#ccc',
                                fontSize: '12px',
                            }}
                            bg={COLORS.secondary}
                            border="none"
                            color={COLORS.white}
                            onChange={e => setSortBy(e.target.value)}
                            placeholder="Sort by..."
                            size="sm"
                            value={sortBy}
                        >
                            {sortOptions.map(
                                (option: { label: string; value: string }) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ),
                            )}
                        </Select>
                    </FormControl>
                </Box>

                <Box w="full">
                    <FormControl>
                        <FormLabel
                            color={COLORS.white}
                            fontSize="14px"
                            fontWeight="bold"
                            mb="5px"
                        >
                            Genre
                        </FormLabel>
                        <Select
                            _placeholder={{
                                color: '#ccc',
                                fontSize: '12px',
                            }}
                            bg={COLORS.secondary}
                            border="none"
                            color={COLORS.white}
                            onChange={e => setGenre(e.target.value)}
                            placeholder="Pick a genre"
                            size="sm"
                            value={genre}
                        >
                            {genres.map(
                                (genre: { id: string; name: string }) => (
                                    <option key={genre.id} value={genre.name}>
                                        {genre.name}
                                    </option>
                                ),
                            )}
                        </Select>
                    </FormControl>
                </Box>

                <Box w="full">
                    <Text
                        color={COLORS.white}
                        fontSize="14px"
                        fontWeight="bold"
                        mb="5px"
                    >
                        Average Rate
                    </Text>
                    <Flex>
                        <FormControl width="50%">
                            <NumberInput
                                _placeholder={{
                                    color: '#ccc',
                                    fontSize: '12px',
                                }}
                                allowMouseWheel
                                bg={COLORS.secondary}
                                clampValueOnBlur
                                color={COLORS.white}
                                defaultValue={0}
                                keepWithinRange
                                max={10}
                                min={0}
                                mr="20px"
                                onChange={value =>
                                    setMinAverageRating(parseFloat(value))
                                }
                                size="sm"
                                value={minAverageRating}
                            >
                                <NumberInputField border="none" />
                                <NumberInputStepper border="none">
                                    <NumberIncrementStepper border="none" />
                                    <NumberDecrementStepper border="none" />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>

                        <FormControl width="50%">
                            <NumberInput
                                _placeholder={{
                                    color: '#ccc',
                                    fontSize: '12px',
                                }}
                                allowMouseWheel
                                bg={COLORS.secondary}
                                clampValueOnBlur
                                color={COLORS.white}
                                defaultValue={0}
                                keepWithinRange
                                max={10}
                                min={0}
                                onChange={value =>
                                    setMaxAverageRating(parseFloat(value))
                                }
                                placeholder="Enter keywords"
                                size="sm"
                                value={maxAverageRating}
                            >
                                <NumberInputField border="none" />
                                <NumberInputStepper border="none">
                                    <NumberIncrementStepper border="none" />
                                    <NumberDecrementStepper border="none" />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                    </Flex>
                </Box>

                <Box w="full">
                    <Text
                        color={COLORS.white}
                        fontSize="14px"
                        fontWeight="bold"
                        mb="5px"
                    >
                        Release Dates
                    </Text>
                    <Flex>
                        <FormControl fontSize="14px" mr="20px" width="50%">
                            <DatePicker
                                dateFormat="yyyy"
                                onChange={date => setStartDate(date)}
                                selected={startDate}
                                showYearPicker
                                yearItemNumber={9}
                            />
                        </FormControl>
                        <FormControl fontSize="14px" width="50%">
                            <DatePicker
                                dateFormat="yyyy"
                                onChange={date => setEndDate(date)}
                                selected={endDate}
                                showYearPicker
                                yearItemNumber={9}
                            />
                        </FormControl>
                    </Flex>
                </Box>
                <Button
                    borderRadius="none"
                    onClick={() => handleSearch()}
                    w="full"
                >
                    Search
                </Button>
            </VStack>
        </Box>
    );
};

export { Sidebar };
