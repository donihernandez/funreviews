import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { Intro } from '../common/Intro';
import { Wrapper } from '../common/Wrapper';
import { ChangePassword } from './ChangePassword';
import { ProfileDetails } from './ProfileDetails';
import { ProfileSidebar } from './ProfileSidebar';

const Profile = () => {
    const [activeLink, setActiveLink] = useState('profile_details');

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

    const renderLink = () => {
        let renderComponent = null;
        switch (activeLink) {
            case 'profile_details':
                renderComponent = <ProfileDetails />;
                break;
            case 'change_password':
                renderComponent = <ChangePassword />;
                break;
        }

        return renderComponent;
    };

    return (
        <Wrapper>
            <Intro
                breadcrumbs={breadcrumbs}
                hasSearch={false}
                title="Profile"
            />
            <Flex flexDirection={['column', 'row']}>
                <ProfileSidebar setActiveLink={setActiveLink} />
                {renderLink()}
            </Flex>
        </Wrapper>
    );
};

export { Profile };
