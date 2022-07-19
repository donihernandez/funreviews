import { Flex } from '@chakra-ui/react';

const ShowsListContainer = ({ children }) => {
    return (
        <Flex direction="column" p="100px 0" w="full">
            {children}
        </Flex>
    );
};

const List = ({ children }) => {
    return (
        <Flex direction="column" my="30px" w="full">
            {children}
        </Flex>
    );
};

export { ShowsListContainer, List };
