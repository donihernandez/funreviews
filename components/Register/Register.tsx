import type { FC } from 'react';
import { useState } from 'react';
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
    Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

import { COLORS } from '@/styles/theme';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { supabase } from '@/utils/supabaseClient';

const Register: FC = () => {
    const schema = yup
        .object({
            confirmPassword: yup.string().required(),
            email: yup.string().required(),
            password: yup.string().required(),
        })
        .required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async formData => {
        if (formData.password === formData.confirmPassword) {
            const { error, user } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            });

            if (error) {
                Swal.fire({
                    confirmButtonColor: COLORS.primary,
                    icon: 'error',
                    showConfirmButton: true,
                    text: error.message,
                    title: 'Oops...',
                });
            } else {
                console.log(user);
            }
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
        <Flex bg="black" h="100vh" w="full">
            <Box h="100vh">
                <Image
                    alt="movies camera"
                    h="full"
                    objectFit="contain"
                    src="/register.webp"
                />
            </Box>
            <Container h="100vh" px="50px" w="full">
                <Flex direction="column" h="full" justifyContent="center">
                    <Box mb="60px">
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
                        pb="100px"
                    >
                        Register
                    </Heading>

                    <chakra.form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl
                            isInvalid={errors.email as unknown as boolean}
                            mb="50px"
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
                            mb="50px"
                        >
                            <FormLabel color={COLORS.white}>Password</FormLabel>
                            <Input
                                autoComplete="current-password"
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
                            mt={[null, '50px']}
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
