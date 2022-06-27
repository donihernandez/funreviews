import type { FC } from 'react';
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { IMAGE_CONFIG, IMAGE_URL } from '@/utils/images';
import { COLORS } from '@/styles/theme';

import { useBreakpoints } from 'hooks';
import { Movie } from 'typings';
import { MotionBox } from '../MotionBox';

const SlideShowContainer = ({ children }) => {
    const { isSmallerThanDesktop } = useBreakpoints();

    return (
        <Flex
            bg={COLORS.white}
            direction={isSmallerThanDesktop ? 'column' : 'row'}
            h={['500px', null, 'full']}
            maxH={[null, null, '600px']}
            w="full"
        >
            {children}
        </Flex>
    );
};

interface ISlideShowVideoProps {
    video: string;
}

const SlideShowVideo: FC<ISlideShowVideoProps> = ({ video }) => {
    return (
        <Box
            // eslint-disable-next-line max-len
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            as="iframe"
            frameBorder="0"
            h="600px"
            src={`https://www.youtube.com/embed/${video}`}
            w="full"
        ></Box>
    );
};

interface ISlideShowPreviewProps {
    movie: Movie;
    updateActiveSlide: (id: number) => void;
}

const SlideShowPreview: FC<ISlideShowPreviewProps> = ({
    movie,
    updateActiveSlide,
}) => {
    const { isSmallerThanDesktop } = useBreakpoints();

    const size = IMAGE_CONFIG.backdrop_sizes.find(s => s === 'w300');
    const image = `${IMAGE_URL}${size}${movie.backdrop_path}`;

    return (
        <MotionBox w="full">
            <Flex
                _hover={{
                    background: COLORS.primary,
                }}
                alignItems="center"
                cursor="pointer"
                onClick={() => updateActiveSlide(movie.id)}
                padding="10px"
                transition="all 0.3s ease-in-out"
                w="full"
            >
                <Flex maxW="100px">
                    <Image alt="movie" objectFit="cover" src={image} w="full" />
                </Flex>
                <Flex
                    color={COLORS.white}
                    direction="column"
                    fontFamily="Lato"
                    ml="10px"
                >
                    <Heading
                        fontSize={['12px', null, '14px']}
                        fontWeight="bold"
                    >
                        {movie.title}
                    </Heading>
                    {!isSmallerThanDesktop && (
                        <Text fontSize="12px">
                            Release Date: {movie.release_date}
                        </Text>
                    )}
                </Flex>
            </Flex>
        </MotionBox>
    );
};

export { SlideShowContainer, SlideShowVideo, SlideShowPreview };
