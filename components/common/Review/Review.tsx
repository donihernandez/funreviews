import type { FC } from 'react';
import { Avatar, Flex, Heading, Text } from '@chakra-ui/react';

import { Review } from 'typings';
import { COLORS } from '@/styles/theme';

const Review: FC<Review> = ({ review }) => {
    return (
        <Flex>
            <Avatar src={review.author_details.avatar_path} />
            <Flex direction="column">
                <Heading as="h5" color={COLORS.white} fontSize="sm">
                    {review.author_details.name}
                </Heading>
                <Text color={COLORS.white}>{review.content}</Text>
            </Flex>
        </Flex>
    );
};

export { Review };
