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

import { COLORS } from '@/styles/theme';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useAuthContext } from 'contexts/AuthContext';
import { useBreakpoints } from 'hooks';

const Login: FC = () => {
    const { signIn } = useAuthContext();
    const { isSmallerThanDesktop } = useBreakpoints();
    const schema = yup
        .object({
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

    const onSubmit = async (formData: { email: string; password: string }) => {
        await signIn(formData.email, formData.password);
    };

    return (
        <Flex bg="black" h="100vh" w="full">
            {!isSmallerThanDesktop && (
                <Box h="100vh" w="full">
                    <Image
                        alt="movies camera"
                        fallback={<Skeleton />}
                        h="full"
                        loading="lazy"
                        objectFit="contain"
                        src="/login.avif"
                    />
                </Box>
            )}

            <Container h="100vh" px="30px" w="full">
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
                        pb="50px"
                    >
                        Login
                    </Heading>

                    <chakra.form onSubmit={handleSubmit(onSubmit)}>
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
                        >
                            <FormLabel color={COLORS.white}>Password</FormLabel>
                            <Input
                                autoComplete="password"
                                color={COLORS.white}
                                type="password"
                                variant="flushed"
                                {...register('password')}
                            />
                            <FormErrorMessage>
                                {errors.password && 'Password is required'}
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
                            mt={['20px', '50px']}
                            transition="all 0.3s ease-in-out"
                            type="submit"
                            variant="outline"
                            w="full"
                        >
                            Login
                        </Button>
                    </chakra.form>

                    <Box mt="40px">
                        <Text
                            color={COLORS.white}
                            transition="all 0.3s ease-in"
                        >
                            {"Don't have an account yet?"}
                            <Link href="/register" passHref>
                                <ChakraLink>
                                    <chakra.span
                                        _hover={{
                                            color: COLORS.orange,
                                            textDecoration: 'none',
                                        }}
                                        ml="5px"
                                    >
                                        Create a new account
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

export default Login;
