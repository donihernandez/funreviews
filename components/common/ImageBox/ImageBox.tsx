import { FC } from 'react';

import { COLORS } from '@/styles/theme';
import { HiOutlinePlay } from 'react-icons/hi';
import { MotionBox } from '../MotionBox';
import { Box } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { isVideoState } from 'recoil/atoms';

interface IImageBoxProps {
    image: string;
}

const ImageBox: FC<IImageBoxProps> = ({ image }) => {
    const [isVideo, setIsVideo] = useRecoilState(isVideoState);

    return (
        <Box h="full" onClick={() => setIsVideo(true)} w="full">
            <MotionBox
                backgroundImage={image}
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                cursor="pointer"
                h="400px"
                maxW={['375px', null, '500px']}
                mb="15px"
                overflow="hidden"
                position="relative"
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
