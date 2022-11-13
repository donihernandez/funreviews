import type { FC } from 'react';
import { Avatar, Flex, Heading, Text } from '@chakra-ui/react';

import { IReview } from 'typings';
import { COLORS } from '@/styles/theme';
import { IMAGE_CONFIG, IMAGE_URL } from '@/utils/images';

interface IReviewProps {
    review: IReview;
}

const Review: FC<IReviewProps> = ({ review }) => {
    const getAvatar = () => {
        if (
            review?.author_details?.avatar_path?.includes(
                'https://www.gravatar.com/',
            )
        ) {
            return review.author_details.avatar_path.startsWith('/')
                ? review.author_details.avatar_path.slice(1)
                : review.author_details.avatar_path;
        }

        if (review.avatar) {
            return review.avatar;
        }

        const size = IMAGE_CONFIG.profile_sizes.find(s => s === 'w185');
        return `${IMAGE_URL}${size}${review.author_details?.avatar_path}`;
    };

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
            <Avatar mr="15px" src={getAvatar()} />
            <Flex direction="column">
                <Heading
                    as="h5"
                    fontFamily="Lato"
                    fontSize="20px"
                    fontWeight="bold"
                    mb="10px"
                >
                    {review.author_details?.name ||
                        review.author ||
                        review.username}{' '}
                    | {new Date(review.created_at).toDateString()}
                </Heading>
                <Text fontFamily="Lato" fontSize="18px" fontWeight="bold">
                    {review.content || review.review}
                </Text>
            </Flex>
        </Flex>
    );
};

export { Review };
