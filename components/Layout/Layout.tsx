import { FC } from 'react';
import dynamic from 'next/dynamic';

interface ILayoutProps {
    children: JSX.Element;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
    const Header = dynamic(() => import('../Header/Header'));
    const Footer = dynamic(() => import('../Footer/Footer'));

    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};

export default Layout;
