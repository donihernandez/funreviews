import type { FC } from 'react';
import { Search2Icon } from '@chakra-ui/icons';
import {
    Button,
    Container,
    Flex,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { COLORS } from '@/styles/theme';

const SearchBar: FC = () => {
    const commonStyles = {
        bg: 'transparent',
        borderColor: COLORS.white,
        borderRadius: '0',
        color: COLORS.white,
        fontFamily: 'Nunito',
        fontSize: '18px',
    };

    return (
        <Container maxW="50vw" w="full">
            <Flex
                alignItems="center"
                direction={['column', null, 'row']}
                mt={5}
                w="full"
            >
                <InputGroup>
                    <Input
                        _placeholder={{
                            color: COLORS.white,
                        }}
                        h="50px"
                        w="full"
                        {...commonStyles}
                        placeholder="Search by name...."
                    />
                    <InputRightElement color={COLORS.white} h="50px">
                        <Search2Icon />
                    </InputRightElement>
                </InputGroup>
                <Button
                    _active={{
                        bg: 'transparent',
                        borderColor: COLORS.primary,
                    }}
                    _hover={{
                        bg: 'transparent',
                        borderColor: COLORS.orange,
                        color: COLORS.orange,
                    }}
                    borderLeft={[null, null, '1px solid']}
                    borderRadius="0"
                    color={COLORS.white}
                    fontSize={['14px', '18px']}
                    h="50px"
                    transition="all 0.3s ease-in-out"
                    variant="outline"
                    w={['full', null, '200px']}
                >
                    Search
                </Button>
            </Flex>
        </Container>
    );
};

export { SearchBar };
