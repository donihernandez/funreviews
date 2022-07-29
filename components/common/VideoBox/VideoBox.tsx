import type { FC } from 'react';

import { Box } from '@chakra-ui/react';

interface IVideoBoxProps {
    video: string;
}

const VideoBox: FC<IVideoBoxProps> = ({ video }) => {
    return (
        <Box
            // eslint-disable-next-line max-len
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            as="iframe"
            frameBorder="0"
            h="600px"
            maxW={['375px', null, '600px', 'full']}
            src={`https://www.youtube.com/embed/${video}`}
            w="full"
        ></Box>
    );
};

export { VideoBox };
