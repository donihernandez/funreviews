import { FC } from 'react';

import { AspectRatio, Box } from '@chakra-ui/react';
import { Loading } from '../common/Loading';

interface ITrailerProps {
    video: string;
}

const Trailer: FC<ITrailerProps> = ({ video }) => {
    return video ? (
        <AspectRatio minH={500} ratio={16 / 9}>
            <Box
                // eslint-disable-next-line max-len
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                as="iframe"
                frameBorder="0"
                h="full"
                minW={['300px', null, 'full']}
                src={`https://www.youtube.com/embed/${video}`}
                w="full"
            />
        </AspectRatio>
    ) : (
        <Loading />
    );
};

export default Trailer;
