import type { FC } from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
    Heading,
} from '@chakra-ui/react';
import { COLORS } from '@/styles/theme';
import { SearchBar } from '../SearchBar';

interface IBreadcrumb {
    link: string;
    name: string;
    isCurrentPage?: boolean;
}

interface IIntroProps {
    title: string;
    breadcrumbs: IBreadcrumb[];
}

const Intro: FC<IIntroProps> = ({ title, breadcrumbs }) => {
    return (
        <Flex
            alignItems="center"
            direction="column"
            m="200px 0 40px 0"
            w="100%"
        >
            <Heading
                as="h1"
                color={COLORS.white}
                data-testid="welcome-heading"
                fontFamily="Lato"
                fontSize={['4xl', null, '6xl']}
            >
                {title}
            </Heading>
            <Breadcrumb color={COLORS.white} my={6}>
                {breadcrumbs.map((breadcrumb: IBreadcrumb, index: number) => {
                    return (
                        <BreadcrumbItem
                            _hover={{
                                color: !breadcrumb.isCurrentPage
                                    ? COLORS.orange
                                    : '#fff',
                            }}
                            isCurrentPage={breadcrumb.isCurrentPage}
                            key={index}
                        >
                            <BreadcrumbLink href={breadcrumb.link}>
                                {breadcrumb.name}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    );
                })}
            </Breadcrumb>
            <SearchBar />
        </Flex>
    );
};

export { Intro };
