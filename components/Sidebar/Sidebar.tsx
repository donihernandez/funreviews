import { FC, useState } from 'react';
import {
    Box,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
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

const Sidebar: FC = () => {
    const { genres } = useShowsContext();

    const [startDate, setStartDate] = useState(new Date());

    return (
        <Box minW="300px" ml="40px" p="100px 0">
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
                            Name
                        </FormLabel>
                        <Input
                            _placeholder={{
                                color: '#ccc',
                                fontSize: '12px',
                            }}
                            bg={COLORS.secondary}
                            border="none"
                            color={COLORS.white}
                            placeholder="Enter keywords"
                            size="sm"
                        />
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
                            placeholder="Pick a genre"
                            size="sm"
                        >
                            {genres.map(genre => (
                                <option key={genre.id} value={genre.id}>
                                    {genre.name}
                                </option>
                            ))}
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
                                bg={COLORS.secondary}
                                color={COLORS.white}
                                defaultValue={0}
                                max={10}
                                min={0}
                                mr="20px"
                                placeholder="Enter keywords"
                                size="sm"
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
                                bg={COLORS.secondary}
                                color={COLORS.white}
                                defaultValue={0}
                                max={10}
                                min={0}
                                placeholder="Enter keywords"
                                size="sm"
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
                                onChange={date => setStartDate(date)}
                                selected={startDate}
                                showYearPicker
                                yearItemNumber={9}
                            />
                        </FormControl>
                    </Flex>
                </Box>
            </VStack>
        </Box>
    );
};

export { Sidebar };
