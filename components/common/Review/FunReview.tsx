import { Avatar, Flex, Heading, Text } from '@chakra-ui/react';

import { COLORS } from '@/styles/theme';

const FunReview = ({ review }) => {
    return (
        <Flex
            _hover={{
                color: COLORS.orange,
                transform: 'scale(1.1)',
            }}
            as="a"
            border="1px solid"
            borderColor={COLORS.white}
            color={COLORS.white}
            cursor="pointer"
            direction={['column', 'column', 'row']}
            href={review.url}
            mb="15px"
            padding="20px"
            target="_blank"
            transition="all 0.2s ease-in-out"
        >
            <Avatar mr="15px" src={review?.avatar} />
            <Flex direction="column">
                <Heading
                    as="h5"
                    fontFamily="Lato"
                    fontSize="20px"
                    fontWeight="bold"
                    mb="10px"
                >
                    {review.username} | {review.date}
                </Heading>
                <Text fontFamily="Lato" fontSize="18px" fontWeight="bold">
                    {review.review}
                </Text>
            </Flex>
        </Flex>
    );
};

export default FunReview;
