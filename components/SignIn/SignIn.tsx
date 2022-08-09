import { FC } from 'react';
import {
    Box,
    Button,
    chakra,
    Flex,
    FormControl,
    FormErrorMessage,
    Heading,
    Input,
    Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { Wrapper } from '../common/Wrapper';
import { COLORS } from '@/styles/theme';
import { useAuthContext } from 'contexts/AuthContext';

const SignIn: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const router = useRouter();
    const { signIn } = useAuthContext();

    const handleSignIn = async (data: { email: string; password: string }) => {
        try {
            await signIn(data.email, data.password);
            router.push('/');
        } catch (err) {
            console.log(err);
        }
    };

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
                    <chakra.form onSubmit={handleSubmit(handleSignIn)}>
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
                                {...register('email', { required: true })}
                            />
                            {errors.email && (
                                <FormErrorMessage>
                                    Email is required.
                                </FormErrorMessage>
                            )}
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
                                {...register('password', { required: true })}
                            />
                            {errors.password && (
                                <FormErrorMessage>
                                    Password is required.
                                </FormErrorMessage>
                            )}
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
                            type="submit"
                            variant="unstyled"
                            w="full"
                        >
                            Sign In
                        </Button>
                        <Text
                            color={COLORS.white}
                            fontSize="18px"
                            mt="20px"
                            textAlign="center"
                        >
                            {"Don't you have an account?"}{' '}
                            <chakra.span
                                _hover={{
                                    color: COLORS.orange,
                                }}
                                fontWeight="bold"
                            >
                                <Link href="/signup">Sign Up</Link>
                            </chakra.span>
                        </Text>
                    </chakra.form>
                </Box>
            </Flex>
        </Wrapper>
    );
};

export { SignIn };
