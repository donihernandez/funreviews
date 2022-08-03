import type { FC } from 'react';
import { chakra, Divider, Flex, Text } from '@chakra-ui/react';

import { COLORS } from '@/styles/theme';

interface IMovieBudgetAndReleaseDateProps {
    budget: number;
    date: string;
}

const MovieBudgetAndReleaseDate: FC<IMovieBudgetAndReleaseDateProps> = ({
    budget,
    date,
}) => {
    return (
        <Flex>
            <Text color={COLORS.white} fontWeight="extrabold">
                Budget: <chakra.span fontWeight="light">${budget}</chakra.span>
            </Text>
            <Divider color={COLORS.white} mx="10px" orientation="vertical" />
            <Text color={COLORS.white} fontWeight="extrabold">
                Release Date:{' '}
                <chakra.span fontWeight="light">{date}</chakra.span>
            </Text>
        </Flex>
    );
};

export { MovieBudgetAndReleaseDate };
