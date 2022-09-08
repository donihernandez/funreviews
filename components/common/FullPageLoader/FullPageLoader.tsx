import type { FC } from 'react';

import { Flex } from '@chakra-ui/react';
import { Watch } from 'react-loader-spinner';
import { COLORS } from '@/styles/theme';

const FullPageLoader: FC = () => {
    return (
        <Flex
            alignItems="center"
            bg="#000"
            h="100vh"
            justifyContent="center"
            w="full"
        >
            <Watch
                ariaLabel="watch-loading"
                color={COLORS.orange}
                height="80"
                radius="48"
                visible={true}
                width="80"
            />
        </Flex>
    );
};

export { FullPageLoader };
