import type { FC } from 'react';
import {
    Box,
    Button,
    chakra,
    Link as ChakraLink,
    Container,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Image,
    Input,
    Skeleton,
    Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

import { COLORS } from '@/styles/theme';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useAuthContext } from 'contexts/AuthContext';
import { useBreakpoints } from 'hooks';

const Register: FC = () => {
    const { signUp } = useAuthContext();
    const { isSmallerThanDesktop } = useBreakpoints();
    const schema = yup
        .object({
            confirmPassword: yup.string().required(),
            email: yup.string().required(),
            password: yup.string().required(),
            username: yup.string().required(),
        })
        .required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (formData: {
        email: string;
        password: string;
        confirmPassword: string;
        username: string;
    }) => {
        if (formData.password === formData.confirmPassword) {
            await signUp(formData.email, formData.password, formData.username);
        } else {
            Swal.fire({
                confirmButtonColor: COLORS.primary,
                icon: 'error',
                showConfirmButton: true,
                text: "Passwords don't march!",
                title: 'Oops...',
            });
        }
    };

    return (
        <Flex bg="black" minH="100vh" w="full">
            {!isSmallerThanDesktop && (
                <Flex alignItems="center" h="100vh" justifyContent="center">
                    <Image
                        alt="movies camera"
                        fallback={<Skeleton />}
                        h="full"
                        loading="lazy"
                        objectFit="cover"
                        src="/register.avif"
                    />
                </Flex>
            )}

            <Container h="full" px="50px" py={50}>
                <Flex direction="column" h="full" justifyContent="start">
                    <Box mb="30px">
                        <Link href="/" passHref>
                            <ChakraLink>
                                <Text
                                    _hover={{ color: COLORS.orange }}
                                    color={COLORS.white}
                                    transition="all 0.3s ease-in"
                                >
                                    <chakra.span mr="10px">
                                        <ArrowBackIcon />
                                    </chakra.span>
                                    Back To Home
                                </Text>
                            </ChakraLink>
                        </Link>
                    </Box>

                    <Heading
                        as="h1"
                        color={COLORS.white}
                        fontSize="60px"
                        pb="40px"
                    >
                        Register
                    </Heading>

                    <chakra.form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl
                            isInvalid={errors.email as unknown as boolean}
                            mb="20px"
                        >
                            <FormLabel color={COLORS.white}>Username</FormLabel>
                            <Input
                                color={COLORS.white}
                                type="text"
                                variant="flushed"
                                {...register('username')}
                            />
                            <FormErrorMessage>
                                {errors.username && 'Username is required'}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isInvalid={errors.email as unknown as boolean}
                            mb="20px"
                        >
                            <FormLabel color={COLORS.white}>Email</FormLabel>
                            <Input
                                autoComplete="username"
                                color={COLORS.white}
                                type="email"
                                variant="flushed"
                                {...register('email')}
                            />
                            <FormErrorMessage>
                                {errors.email && 'Email is required'}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isInvalid={errors.password as unknown as boolean}
                            mb="20px"
                        >
                            <FormLabel color={COLORS.white}>Password</FormLabel>
                            <Input
                                autoComplete="new-password"
                                color={COLORS.white}
                                type="password"
                                variant="flushed"
                                {...register('password')}
                            />
                            <FormErrorMessage>
                                {errors.password && 'Password is required'}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isInvalid={
                                errors.confirmPassword as unknown as boolean
                            }
                        >
                            <FormLabel color={COLORS.white}>
                                Confirm Password
                            </FormLabel>
                            <Input
                                autoComplete="current-password"
                                color={COLORS.white}
                                type="password"
                                variant="flushed"
                                {...register('confirmPassword')}
                            />
                            <FormErrorMessage>
                                {errors.confirmPassword &&
                                    'Confirm Password is required'}
                            </FormErrorMessage>
                        </FormControl>
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
                            border="3px solid"
                            borderColor={COLORS.white}
                            borderRadius="0"
                            color={COLORS.white}
                            fontSize={['14px', '18px']}
                            h="50px"
                            mt={['30px', '50px']}
                            transition="all 0.3s ease-in-out"
                            type="submit"
                            variant="outline"
                            w="full"
                        >
                            Register
                        </Button>
                    </chakra.form>

                    <Box mt="40px">
                        <Text
                            color={COLORS.white}
                            transition="all 0.3s ease-in"
                        >
                            {'Already have an accout?'}
                            <Link href="/login" passHref>
                                <ChakraLink>
                                    <chakra.span
                                        _hover={{
                                            color: COLORS.orange,
                                            textDecoration: 'none',
                                        }}
                                        ml="5px"
                                    >
                                        Log in
                                    </chakra.span>
                                </ChakraLink>
                            </Link>
                        </Text>
                    </Box>
                </Flex>
            </Container>
        </Flex>
    );
};

export { Register };
