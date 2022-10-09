import type { FC } from 'react';

import { Box, Divider, Flex, List, ListItem, Text } from '@chakra-ui/layout';
import { COLORS } from '@/styles/theme';
import { Button, SkeletonCircle } from '@chakra-ui/react';
import { useAuthContext } from 'contexts/AuthContext';

interface IProfileSidebar {
    setActiveLink: (vale: string) => void;
}

const ProfileSidebar: FC<IProfileSidebar> = ({ setActiveLink }) => {
    const { logout } = useAuthContext();

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
                    <SkeletonCircle size="150px" />
                    <Button
                        _hover={{
                            bg: COLORS.primary,
                        }}
                        bg={COLORS.orange}
                        borderRadius="0"
                        color={COLORS.white}
                        mt="20px"
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
                        <ListItem
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
                        </ListItem>
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
        </>
    );
};

export { ProfileSidebar };
