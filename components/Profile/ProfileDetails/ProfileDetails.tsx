import { Text } from '@chakra-ui/layout';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    SimpleGrid,
} from '@chakra-ui/react';
import { COLORS } from '@/styles/theme';

import { FormContainer } from '../Profile.components';

const ProfileDetails = () => {
    return (
        <FormContainer>
            <Text color={COLORS.white} fontFamily="Nunito">
                Profile Details
            </Text>

            <SimpleGrid columns={[1, 1, 2, 2]} mt="40px" spacing={10}>
                <FormControl color={COLORS.white}>
                    <FormLabel>Username</FormLabel>
                    <Input type="text" variant="flushed" />
                </FormControl>
                <FormControl color={COLORS.white}>
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" variant="flushed" />
                </FormControl>
                <FormControl color={COLORS.white}>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" variant="flushed" />
                </FormControl>
                <FormControl color={COLORS.white}>
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" variant="flushed" />
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

export { ProfileDetails };
