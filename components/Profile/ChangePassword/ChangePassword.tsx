import { Text } from '@chakra-ui/layout';
import { COLORS } from '@/styles/theme';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    SimpleGrid,
} from '@chakra-ui/react';
import { FormContainer } from '../Profile.components';

const ChangePassword = () => {
    return (
        <FormContainer>
            <Text color={COLORS.white} fontFamily="Nunito">
                Change Password
            </Text>

            <SimpleGrid columns={[1, 1, 2, 2]} mt="40px" spacing={10}>
                <FormControl color={COLORS.white}>
                    <FormLabel>Old Password</FormLabel>
                    <Input type="password" variant="flushed" />
                </FormControl>
                <FormControl color={COLORS.white}>
                    <FormLabel>New Password</FormLabel>
                    <Input type="password" variant="flushed" />
                </FormControl>
                <FormControl color={COLORS.white}>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input type="password" variant="flushed" />
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
            >
                Save
            </Button>
        </FormContainer>
    );
};

export { ChangePassword };
