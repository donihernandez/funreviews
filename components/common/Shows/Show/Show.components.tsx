import type { FC } from 'react';
import { ReactNode } from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { COLORS } from '../../../../styles/theme';
import { StarIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import { useBreakpoints } from 'hooks';

interface IChildrenProps {
    children: ReactNode;
}

const ShowContainer: FC<IChildrenProps> = ({ children }) => {
    return (
        <Flex alignItems="center" direction={['column', null, 'row']} my="45px">
            {children}
        </Flex>
    );
};

interface IShowImageProps {
    image: string;
    lazyImage: string;
    title?: string;
    name?: string;
}

const ShowImage: FC<IShowImageProps> = ({ image, lazyImage, title, name }) => {
    const { isSmallerThanDesktop } = useBreakpoints();
    return (
        <Image
            alt={title || name}
            blurDataURL={lazyImage}
            height={isSmallerThanDesktop ? '300px' : '460px'}
            loading="lazy"
            placeholder="blur"
            src={image}
            width={isSmallerThanDesktop ? '500px' : '300px'}
        />
    );
};

const ShowDetailsContainer: FC<IChildrenProps> = ({ children }) => {
    return (
        <Flex
            color={COLORS.white}
            direction="column"
            ml={6}
            textAlign="justify"
            w="full"
        >
            {children}
        </Flex>
    );
};

interface IShowTitleProps {
    date: Date;
    title?: string;
    name?: string;
}

const ShowTitle: FC<IShowTitleProps> = ({ title, name, date }) => {
    return (
        <Heading as="h3" fontFamily="Lato" fontSize="xl">
            {title || name} ({date.getFullYear()})
        </Heading>
    );
};

interface IShowRatingProps {
    vote_average: number;
}

const ShowRating: FC<IShowRatingProps> = ({ vote_average }) => {
    return (
        <Flex alignItems="center" py="15px">
            <StarIcon boxSize="15px" color="yellow.500" />
            <Text fontSize="md" ml={1}>
                {vote_average}/10
            </Text>
        </Flex>
    );
};

interface IShowDescriptionProps {
    overview: string;
}

const ShowDescription: FC<IShowDescriptionProps> = ({ overview }) => {
    return (
        <Text fontSize="14px" fontWeight="300">
            {overview}
        </Text>
    );
};

export {
    ShowContainer,
    ShowImage,
    ShowDetailsContainer,
    ShowTitle,
    ShowRating,
    ShowDescription,
};
