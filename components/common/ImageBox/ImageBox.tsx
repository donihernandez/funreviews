import { FC } from 'react';

import { AspectRatio, Box } from '@chakra-ui/react';
import Image from 'next/image';

interface IImageBoxProps {
    alt: string;
    image: string;
    lazyImage?: string;
    setIsVideo: (value: boolean) => void;
}

const ImageBox: FC<IImageBoxProps> = ({
    alt,
    image,
    lazyImage,
    setIsVideo,
}) => {
    return (
        <Box
            cursor="pointer"
            h="full"
            onClick={() => setIsVideo(true)}
            w="full"
        >
            <AspectRatio maxH={700} ratio={16 / 9}>
                <Image
                    alt={alt}
                    blurDataURL={lazyImage}
                    layout="fill"
                    placeholder="blur"
                    src={image}
                />
            </AspectRatio>
        </Box>
    );
};

ImageBox.displayName = 'ImageBox';

export { ImageBox };
