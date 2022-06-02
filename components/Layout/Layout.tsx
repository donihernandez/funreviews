import { Container } from '@chakra-ui/react';
import type { FC } from 'react';
import { Header } from '../Header';

interface ILayoutProps {
  children: JSX.Element;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Container maxW={{ base: '100vw', lg: '80vw' }}>{children}</Container>
    </>
  );
};

export { Layout };
