import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import { Register } from '@/components/Register';

const RegisterPage: NextPage = () => {
    return (
        <>
            <NextSeo
                canonical="https://funreviews.org/register"
                description="Create a new Account"
                noindex
                title="Register | FunReviews"
            />
            <Register />
        </>
    );
};

export default RegisterPage;
