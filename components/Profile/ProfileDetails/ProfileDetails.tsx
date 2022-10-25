import { Text } from '@chakra-ui/layout';
import {
    Button,
    chakra,
    FormControl,
    FormLabel,
    Input,
    SimpleGrid,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { COLORS } from '@/styles/theme';

import { FormContainer } from '../Profile.components';
import { useAuthContext } from 'contexts/AuthContext';
import Swal from 'sweetalert2';
import { Loading } from '@/components/common/Loading';

interface IUser {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
}

const ProfileDetails = () => {
    const { user, getCurrentUser, updateUser } = useAuthContext();
    const [currentUser, setCurrentUser] = useState<IUser>();
    const [isLoading, setIsLoading] = useState(false);

    const schema = yup
        .object({
            email: yup.string(),
            firstName: yup.string(),
            lastName: yup.string(),
            username: yup.string().required(),
        })
        .required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: currentUser?.email,
            firstName: currentUser?.firstName,
            lastName: currentUser?.lastName,
            username: currentUser?.username,
        },
        resolver: yupResolver(schema),
    });

    const getUser = async () => {
        setIsLoading(true);
        const user = await getCurrentUser();
        setCurrentUser(user);
        setIsLoading(false);
    };

    useEffect(() => {
        getUser();
    }, [user]);

    const onSubmit = async (formData: {
        email?: string;
        firstName?: string;
        lastName?: string;
    }) => {
        try {
            const message = await updateUser(formData);
            Swal.fire({
                confirmButtonColor: COLORS.primary,
                icon: 'success',
                showConfirmButton: true,
                text: message,
                title: 'Updated',
            });
        } catch (error) {
            Swal.fire({
                confirmButtonColor: COLORS.primary,
                icon: 'error',
                showConfirmButton: true,
                text: error,
                title: 'Oops...',
            });
        }
    };

    return (
        <FormContainer>
            <Text color={COLORS.white} fontFamily="Nunito">
                Profile Details
            </Text>

            {!isLoading ? (
                <chakra.form onSubmit={handleSubmit(onSubmit)}>
                    <SimpleGrid columns={[1, 1, 2, 2]} mt="40px" spacing={10}>
                        <FormControl color={COLORS.white} isReadOnly>
                            <FormLabel>Username</FormLabel>
                            <Input
                                type="text"
                                variant="flushed"
                                {...register('username')}
                            />
                        </FormControl>
                        <FormControl
                            color={COLORS.white}
                            isInvalid={errors.email as unknown as boolean}
                        >
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                variant="flushed"
                                {...register('email', {
                                    pattern:
                                        // eslint-disable-next-line max-len
                                        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
                                })}
                            />
                        </FormControl>
                        <FormControl
                            color={COLORS.white}
                            isInvalid={errors.firstName as unknown as boolean}
                        >
                            <FormLabel>First Name</FormLabel>
                            <Input
                                type="text"
                                variant="flushed"
                                {...register('firstName')}
                            />
                        </FormControl>
                        <FormControl
                            color={COLORS.white}
                            isInvalid={errors.lastName as unknown as boolean}
                        >
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                type="text"
                                variant="flushed"
                                {...register('lastName')}
                            />
                        </FormControl>
                    </SimpleGrid>

                    <Button
                        _hover={{
                            bg: COLORS.primary,
                        }}
                        bg={COLORS.orange}
                        borderRadius="0"
                        color={COLORS.white}
                        mt="50px"
                        type="submit"
                        w="full"
                    >
                        Save
                    </Button>
                </chakra.form>
            ) : (
                <Loading />
            )}
        </FormContainer>
    );
};

export { ProfileDetails };
