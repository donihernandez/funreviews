import { FC } from 'react';

import { COLORS } from '@/styles/theme';
import { HiOutlinePlay } from 'react-icons/hi';
import { MotionBox } from '../MotionBox';
import { Box } from '@chakra-ui/react';

interface IImageBoxProps {
    image: string;
    setIsVideo: (value: boolean) => void;
}

const ImageBox: FC<IImageBoxProps> = ({ image, setIsVideo }) => {
    return (
        <Box h="full" onClick={() => setIsVideo(true)} w="full">
            <MotionBox
                backgroundImage={image}
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                cursor="pointer"
                h="600px"
                maxW={['375px', null, 'full', 'full']}
                mb="15px"
                overflow="hidden"
                position="relative"
                px={['30px', null, null]}
                w="full"
            >
                <MotionBox
                    backgroundColor={'rgba(0,0,0,0.5)'}
                    h="full"
                    left={0}
                    position="absolute"
                    top={0}
                    w="full"
                ></MotionBox>
                <MotionBox
                    cursor="pointer"
                    left="45%"
                    position="absolute"
                    top="45%"
                    transition={'all 0.3s ease-in'}
                    whileHover={{ scale: 1.3 }}
                >
                    <HiOutlinePlay
                        color={COLORS.white}
                        cursor="pointer"
                        size={50}
                    />
                </MotionBox>
            </MotionBox>
        </Box>
    );
};

ImageBox.displayName = 'ImageBox';

export { ImageBox };
