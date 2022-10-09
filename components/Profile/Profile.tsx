import { Flex } from '@chakra-ui/layout';
import { Intro } from '../common/Intro';
import { Wrapper } from '../common/Wrapper';

const Profile = () => {
    const breadcrumbs = [
        {
            link: '/',
            name: 'Home',
        },
        {
            isCurrentPage: true,
            link: '#',
            name: 'Profile',
        },
    ];

    return (
        <Wrapper>
            <Intro
                breadcrumbs={breadcrumbs}
                hasSearch={false}
                title="Profile"
            />
            <Flex>
                <Flex direction="column"></Flex>
                <Flex></Flex>
            </Flex>
        </Wrapper>
    );
};

export { Profile };
