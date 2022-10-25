import { ChangeEvent, FC, useCallback } from 'react';
import { useEffect, useState } from 'react';
import { Box, Divider, Flex, List, ListItem, Text } from '@chakra-ui/layout';
import {
    Avatar,
    chakra,
    CircularProgress,
    CircularProgressLabel,
    FormLabel,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import { COLORS } from '@/styles/theme';
import { Button, SkeletonCircle } from '@chakra-ui/react';
import { useAuthContext } from 'contexts/AuthContext';
import Swal from 'sweetalert2';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/utils/firebase';

interface IProfileSidebar {
    setActiveLink: (vale: string) => void;
}

const ProfileSidebar: FC<IProfileSidebar> = ({ setActiveLink }) => {
    const { logout, uploadAvatar, uploadProgress, isUploading, user } =
        useAuthContext();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [profilePic, setProfilePic] = useState<File>();
    const [avatarPreview, setAvatarPreview] = useState<string>();
    const [currentUser, setCurrentUser] = useState(null);

    const imageMimeType = /image\/(png|jpg|jpeg|webp)/i;

    const handleLoadImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0];
        if (!file.type.match(imageMimeType)) {
            Swal.fire({
                icon: 'error',
                text: '"Image format type is not valid"!',
                title: 'Oops...',
            });
            return;
        }
        const url = URL.createObjectURL(file);
        setAvatarPreview(url);
        setProfilePic(file);
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const updatedUser = await uploadAvatar(profilePic);

        setCurrentUser(updatedUser);
        onClose();
        setProfilePic(null);
        setAvatarPreview('');
    };

    useEffect(() => {
        if (user) {
            const userDocRef = doc(db, 'users', user.uid);
            const unsubscribe = onSnapshot(userDocRef, doc => {
                setCurrentUser(doc.data());
            });

            return () => unsubscribe();
        }
    }, [user]);

    return (
        <>
            <Flex
                border="1px solid"
                borderColor={COLORS.secondary}
                direction="column"
            >
                <Box
                    alignItems="center"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    padding="30px 25px"
                >
                    {!currentUser?.avatar ? (
                        <SkeletonCircle size="150px" />
                    ) : (
                        <Avatar
                            height="150px"
                            src={currentUser.avatar}
                            w="150px"
                        />
                    )}

                    <Button
                        _hover={{
                            bg: COLORS.primary,
                        }}
                        bg={COLORS.orange}
                        borderRadius="0"
                        color={COLORS.white}
                        mt="20px"
                        onClick={onOpen}
                    >
                        Change Avatar
                    </Button>
                </Box>
                <Divider my="10px" w="full" />
                <Box padding="10px 25px">
                    <Text color={COLORS.secondary} fontSize="sm">
                        Account Details
                    </Text>
                    <List mt="8px">
                        {/* <ListItem
                            _hover={{
                                color: COLORS.orange,
                            }}
                            color={COLORS.white}
                            cursor="pointer"
                            fontFamily="Nunito"
                            fontSize="16px"
                            fontWeight="bold"
                            onClick={() => setActiveLink('profile_details')}
                        >
                            Profile
                        </ListItem> */}
                        <ListItem
                            _hover={{
                                color: COLORS.orange,
                            }}
                            color={COLORS.white}
                            cursor="pointer"
                            fontFamily="Nunito"
                            fontSize="16px"
                            fontWeight="bold"
                            onClick={() => setActiveLink('change_password')}
                        >
                            Change Password
                        </ListItem>
                    </List>
                </Box>
                <Divider my="10px" w="full" />
                <Box padding="10px 25px 30px 25px">
                    <Text color={COLORS.secondary} fontSize="sm">
                        Others
                    </Text>
                    <List mt="8px">
                        <ListItem
                            _hover={{
                                color: COLORS.orange,
                            }}
                            color={COLORS.white}
                            cursor="pointer"
                            fontFamily="Nunito"
                            fontSize="16px"
                            fontWeight="bold"
                            onClick={logout}
                        >
                            Logout
                        </ListItem>
                    </List>
                </Box>
            </Flex>

            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent py="20px">
                    <ModalHeader
                        fontFamily="Nunito"
                        fontSize="3xl"
                        fontWeight="bold"
                        textAlign="center"
                    >
                        Choose an Image{' '}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {!isUploading ? (
                            <chakra.form onSubmit={handleSubmit}>
                                <Flex
                                    alignItems="center"
                                    direction="column"
                                    justifyContent="center"
                                >
                                    {!profilePic ? (
                                        <FormLabel
                                            border="1px dashed"
                                            borderColor={COLORS.primary}
                                            cursor="pointer"
                                            p={10}
                                        >
                                            <chakra.input
                                                accept="image/*"
                                                hidden
                                                onChange={e =>
                                                    handleLoadImage(e)
                                                }
                                                type="file"
                                                value={profilePic?.name}
                                            />
                                            {
                                                // eslint-disable-next-line max-len
                                                "Drag 'n' drop your profile pic here,or click to select files"
                                            }
                                        </FormLabel>
                                    ) : (
                                        <Flex
                                            alignItems="center"
                                            justifyContent="center"
                                            maxH="150px"
                                            maxW="150px"
                                        >
                                            <Image
                                                alt={profilePic.name}
                                                h="full"
                                                src={avatarPreview}
                                                w="full"
                                            />
                                        </Flex>
                                    )}
                                    <Flex
                                        alignItems="center"
                                        experimental_spaceX={4}
                                        justifyContent="center"
                                        mt="20px"
                                    >
                                        <Button
                                            _hover={{
                                                bg: COLORS.orange,
                                                textDecoration: 'none',
                                            }}
                                            bg={COLORS.primary}
                                            borderRadius="0"
                                            color={COLORS.white}
                                            cursor="pointer"
                                            transition="all 0.3s ease-in-out"
                                            type="submit"
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            borderRadius="0"
                                            colorScheme="red"
                                            onClick={() => setProfilePic(null)}
                                            transition="all 0.3s ease-in-out"
                                        >
                                            Clear
                                        </Button>
                                    </Flex>
                                </Flex>
                            </chakra.form>
                        ) : (
                            <Flex
                                alignItems="center"
                                h="full"
                                justifyContent="center"
                                w="full"
                            >
                                <CircularProgress
                                    color={COLORS.primary}
                                    value={uploadProgress}
                                >
                                    <CircularProgressLabel>
                                        {uploadProgress}
                                    </CircularProgressLabel>
                                </CircularProgress>
                            </Flex>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export { ProfileSidebar };
