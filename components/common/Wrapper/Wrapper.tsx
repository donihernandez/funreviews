import type { FC, ReactNode } from 'react';
import { Container, Flex } from '@chakra-ui/react';

interface IWrapperProps {
    children: ReactNode;
}

const Wrapper: FC<IWrapperProps> = ({ children }) => {
    return (
        <Flex bg="#000" direction="column" w="full">
            <Container
                h="full"
                maxW={{ base: '300vw', lg: '80vw' }}
                minH="100vh"
            >
                {children}
            </Container>
        </Flex>
    );
};

export { Wrapper };
