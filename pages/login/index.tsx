import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import { Login } from '@/components/Login';

const LoginPage: NextPage = () => {
    return (
        <>
            <NextSeo
                canonical="https://funreviews.org/login"
                description="Sign in to your account"
                noindex
                title="Login | FunReviews"
            />
            <Login />
        </>
    );
};

export default LoginPage;
