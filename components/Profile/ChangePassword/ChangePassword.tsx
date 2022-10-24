import { FC, useState } from 'react';
import {
    Button,
    chakra,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    SimpleGrid,
} from '@chakra-ui/react';
import { Text } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import {
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
} from 'firebase/auth';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Swal from 'sweetalert2';

import { FormContainer } from '../Profile.components';
import { useAuthContext } from 'contexts/AuthContext';

import { auth } from '@/utils/firebase';
import { COLORS } from '@/styles/theme';

const ChangePassword: FC = () => {
    const { user } = useAuthContext();
    const router = useRouter();

    const schema = yup
        .object({
            confirmPassword: yup.string().required(),
            newPassword: yup.string().required(),
            oldPassword: yup.string().required(),
        })
        .required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const changePassword = async (oldPassword: string, newPassword: string) => {
        try {
            const credential = EmailAuthProvider.credential(
                user.email,
                oldPassword,
            );

            reauthenticateWithCredential(auth.currentUser, credential)
                .then(() => {
                    updatePassword(auth.currentUser, newPassword)
                        .then(() => {
                            Swal.fire({
                                confirmButtonColor: COLORS.primary,
                                icon: 'success',
                                showConfirmButton: true,
                                // eslint-disable-next-line max-len
                                text: 'Password updated successfully!',
                                title: 'Updated',
                            }).then(result => {
                                if (result.isConfirmed) {
                                    router.push('/login');
                                }
                            });
                        })
                        .catch(e =>
                            Swal.fire({
                                confirmButtonColor: COLORS.primary,
                                icon: 'error',
                                showConfirmButton: true,
                                text: e,
                                title: 'Oops...',
                            }),
                        );
                })
                .catch(e =>
                    Swal.fire({
                        confirmButtonColor: COLORS.primary,
                        icon: 'error',
                        showConfirmButton: true,
                        text: e,
                        title: 'Oops...',
                    }),
                );
        } catch (error) {
            return Swal.fire({
                confirmButtonColor: COLORS.primary,
                icon: 'error',
                showConfirmButton: true,
                text: error.message,
                title: 'Oops...',
            });
        }
    };

    const onSubmit = async (formData: {
        oldPassword: string;
        newPassword: string;
        confirmPassword: string;
    }) => {
        if (formData.newPassword === formData.confirmPassword) {
            await changePassword(formData.oldPassword, formData.newPassword);
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
        <FormContainer>
            <Text color={COLORS.white} fontFamily="Nunito">
                Change Password
            </Text>
            <chakra.form onSubmit={handleSubmit(onSubmit)}>
                <SimpleGrid columns={[1, 1, 2, 2]} mt="40px" spacing={10}>
                    <FormControl
                        color={COLORS.white}
                        isInvalid={errors.oldPassword as unknown as boolean}
                    >
                        <FormLabel>Old Password</FormLabel>
                        <Input
                            type="password"
                            variant="flushed"
                            {...register('oldPassword')}
                        />
                        <FormErrorMessage>
                            {errors.oldPassword && 'Old Password is required'}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl
                        color={COLORS.white}
                        isInvalid={errors.newPassword as unknown as boolean}
                    >
                        <FormLabel>New Password</FormLabel>
                        <Input
                            type="password"
                            variant="flushed"
                            {...register('newPassword')}
                        />
                        <FormErrorMessage>
                            {errors.newPassword && 'New Password is required'}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl
                        color={COLORS.white}
                        isInvalid={errors.confirmPassword as unknown as boolean}
                    >
                        <FormLabel>Confirm Password</FormLabel>
                        <Input
                            type="password"
                            variant="flushed"
                            {...register('confirmPassword')}
                        />
                        <FormErrorMessage>
                            {errors.confirmPassword &&
                                'Confirm Password is required'}
                        </FormErrorMessage>
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
        </FormContainer>
    );
};

export { ChangePassword };
