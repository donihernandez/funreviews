import type { FC } from 'react';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { useAuthContext } from 'contexts/AuthContext';
import { FullPageLoader } from '../common/FullPageLoader';

interface ILayoutProps {
    children: JSX.Element;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
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
