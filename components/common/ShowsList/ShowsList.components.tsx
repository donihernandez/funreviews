import { Flex } from '@chakra-ui/react';

const ShowsListContainer = ({ children }) => {
    return (
        <Flex p="100px 0" w="full">
            {children}
        </Flex>
    );
};

const List = ({ children }) => {
    return (
        <Flex direction="column" w="full">
            {children}
        </Flex>
    );
};

export { ShowsListContainer, List };
