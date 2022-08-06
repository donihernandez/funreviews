import { FC } from 'react';
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
} from '@chakra-ui/react';

import { Wrapper } from '../common/Wrapper';
import { COLORS } from '@/styles/theme';
import { PrimaryButton } from '../common/Buttons';

const SignIn: FC = () => {
    return (
        <Wrapper>
            <Flex
                alignItems="center"
                direction="column"
                h="100vh"
                justifyContent="center"
                w="full"
            >
                <Heading
                    as="h1"
                    color={COLORS.white}
                    fontFamily="Nunito"
                    fontSize="50px"
                >
                    Sign In
                </Heading>
                <Box
                    maxW={['full', null, null, '600px']}
                    mt="40px"
                    padding="30px"
                    w="full"
                >
                    <FormControl color={COLORS.white}>
                        <Input
                            _focusVisible={{
                                borderColor: COLORS.orange,
                            }}
                            placeholder="
                            Email address"
                            transition="all 0.5s ease-in-out"
                            type="email"
                            variant="flushed"
                        />
                    </FormControl>
                    <FormControl color={COLORS.white} mt="30px">
                        <Input
                            _focusVisible={{
                                borderColor: COLORS.orange,
                            }}
                            placeholder="
                            Password"
                            transition="all 0.5s ease-in-out"
                            type="password"
                            variant="flushed"
                        />
                    </FormControl>

                    <Button
                        _hover={{
                            bg: COLORS.primary,
                        }}
                        bg={COLORS.orange}
                        borderRadius="0"
                        color={COLORS.white}
                        cursor="pointer"
                        mt="30px"
                        transition="all 0.5s ease-in-out"
                        variant="unstyled"
                        w="full"
                    >
                        Sign In
                    </Button>
                </Box>
            </Flex>
        </Wrapper>
    );
};

export { SignIn };
