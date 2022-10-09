import type { FC, ReactNode } from 'react';

import { Flex } from '@chakra-ui/react';
import { COLORS } from '@/styles/theme';

interface IFormContainer {
    children: ReactNode;
}

const FormContainer: FC<IFormContainer> = ({ children }) => {
    return (
        <Flex
            border="1px solid"
            borderColor={COLORS.white}
            flexDirection="column"
            justifyContent="space-between"
            ml={{ lg: '50px' }}
            mt={[6, 6, 0, 0]}
            padding="30px"
            w="full"
        >
            {children}
        </Flex>
    );
};

export { FormContainer };
