import type { FC } from 'react';

import { Flex, Text } from '@chakra-ui/react';
import { COLORS } from '@/styles/theme';

const Footer: FC = () => {
    return (
        <Flex
            bg={COLORS.primary}
            color={COLORS.white}
            justifyContent="center"
            py={4}
        >
            <Text>
                Fun Reviews © {new Date().getFullYear()} All rights reserved
            </Text>
        </Flex>
    );
};

export { Footer };
