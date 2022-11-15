import type { FC } from 'react';
import dynamic from 'next/dynamic';
import { useAuthContext } from 'contexts/AuthContext';
import { FullPageLoader } from '../common/FullPageLoader';

interface ILayoutProps {
    children: JSX.Element;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
    const Header = dynamic(() =>
        import('../Header').then(module => module.Header),
    );
    const Footer = dynamic(() =>
        import('../Footer').then(module => module.Footer),
    );
    const { loading } = useAuthContext();

    if (loading) {
        return <FullPageLoader />;
    }

    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};

export { Layout };
