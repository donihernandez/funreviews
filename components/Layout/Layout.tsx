import type { FC } from 'react';
import { Footer } from '../Footer';
import { Header } from '../Header';

interface ILayoutProps {
    children: JSX.Element;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};

export { Layout };
