import { Profile } from '@/components/Profile';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

const ProfilePage: NextPage = () => {
    return (
        <>
            <NextSeo
                canonical="https://funreviews.org/profile"
                description="My Profile"
                noindex
                title="Profile | FunReviews"
            />
            <Profile />
        </>
    );
};

export default ProfilePage;
