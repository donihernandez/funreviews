import { FC, useState } from 'react';
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    chakra,
    CloseButton,
    Flex,
    FormControl,
    FormErrorMessage,
    Heading,
    Input,
    Text,
    useDisclosure,
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';

import { Wrapper } from '../common/Wrapper';
import { COLORS } from '@/styles/theme';
import Link from 'next/link';
import { useAuthContext } from 'contexts/AuthContext';
import { useRouter } from 'next/router';

const SignUp: FC = () => {
    const router = useRouter();
    const [confirmPassword, setConfirmPassword] = useState('');

    const {
        isOpen: isVisible,
        onClose,
        onOpen,
    } = useDisclosure({ defaultIsOpen: false });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { signUp } = useAuthContext();

    const handleSignUp = async (data: { email: string; password: string }) => {
        if (data.password !== confirmPassword) {
            onOpen();
            return;
        }

        try {
            await signUp(data.email, data.password);
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
                    Sign Up
                </Heading>
                <Box
                    maxW={['full', null, null, '600px']}
                    mt="40px"
                    padding="30px"
                    w="full"
                >
                    <chakra.form onSubmit={handleSubmit(handleSignUp)}>
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

                        <FormControl color={COLORS.white} mt="30px">
                            <Input
                                _focusVisible={{
                                    borderColor: COLORS.orange,
                                }}
                                onChange={e =>
                                    setConfirmPassword(e.target.value)
                                }
                                placeholder="
                            Confirm Password"
                                required={true}
                                transition="all 0.5s ease-in-out"
                                type="password"
                                value={confirmPassword}
                                variant="flushed"
                            />
                        </FormControl>

                        {isVisible && (
                            <Alert
                                mt="20px"
                                status="error"
                                variant="top-accent"
                            >
                                <AlertIcon />
                                <Box w="full">
                                    <AlertTitle>Error!</AlertTitle>
                                    <AlertDescription>
                                        Your passwords do not match.
                                    </AlertDescription>
                                </Box>

                                <CloseButton
                                    alignSelf="flex-start"
                                    onClick={onClose}
                                    position="relative"
                                    right={0}
                                    top={-1}
                                />
                            </Alert>
                        )}

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
                            Create new account
                        </Button>
                        <Text
                            color={COLORS.white}
                            fontSize="18px"
                            mt="20px"
                            textAlign="center"
                        >
                            Already have an account?{' '}
                            <chakra.span
                                _hover={{
                                    color: COLORS.orange,
                                }}
                                fontWeight="bold"
                            >
                                <Link href="/signin">Sign In</Link>
                            </chakra.span>
                        </Text>
                    </chakra.form>
                </Box>
            </Flex>
        </Wrapper>
    );
};

export { SignUp };
