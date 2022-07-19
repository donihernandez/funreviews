import { Flex, Spinner } from '@chakra-ui/react';

const Loading = () => {
    return (
        <Flex
            alignItems="center"
            h="full"
            justifyContent="center"
            minH="400px"
            w="full"
        >
            <Spinner
                color="blue.500"
                emptyColor="gray.200"
                size="xl"
                speed="0.65s"
                thickness="4px"
            />
        </Flex>
    );
};

export { Loading };
