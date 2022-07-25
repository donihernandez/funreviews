import type { FC, ReactNode } from 'react';
import {
    AspectRatio,
    Avatar,
    Box,
    Center,
    chakra,
    Divider,
    Flex,
    Heading,
    Image,
    Text,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';

import { COLORS } from '@/styles/theme';
import { IMAGE_CONFIG, IMAGE_URL } from '@/utils/images';
import { StarIcon } from '@chakra-ui/icons';

import { IReview } from 'typings';
import { Review } from '../common/Review';

interface IDetailsProps {
    children: ReactNode;
}

const DetailsContainer: FC<IDetailsProps> = ({ children }) => {
    return (
        <Flex
            alignItems="center"
            direction={['column', null, 'row']}
            justifyContent="center"
            paddingY="50px"
        >
            {children}
        </Flex>
    );
};

const MovieInfoContainer: FC<IDetailsProps> = ({ children }) => {
    return (
        <Flex direction="column" ml={['0', null, '30px']}>
            {children}
        </Flex>
    );
};

interface IMovieTitleProps {
    title: string;
}

const MovieTitle: FC<IMovieTitleProps> = ({ title }) => {
    return (
        <Heading
            _hover={{
                color: COLORS.orange,
            }}
            as="h1"
            color={COLORS.white}
            cursor="pointer"
            fontFamily="Lato"
            fontSize="4xl"
            fontWeight="bold"
        >
            {title}
        </Heading>
    );
};

interface IMovieRateProps {
    vote_average: number;
}

const MovieRate: FC<IMovieRateProps> = ({ vote_average }) => {
    return (
        <Flex alignItems="center" my="10px">
            <StarIcon color="yellow.400" mr="5px" />
            <Text color={COLORS.white} fontFamily="Nunito" fontSize="12px">
                <chakra.span fontSize="16px" fontWeight="800">
                    {vote_average}
                </chakra.span>
                /10
            </Text>
        </Flex>
    );
};

interface IMovieDescriptionProps {
    overview: string;
}

const MovieDescription: FC<IMovieDescriptionProps> = ({ overview }) => {
    return (
        <Text
            color={COLORS.white}
            fontFamily="Nunito"
            fontSize="15px"
            textAlign="justify"
        >
            {overview}
        </Text>
    );
};

interface IMovieBudgetAndReleaseDateProps {
    budget: number;
    date: string;
}

const MovieBudgetAndReleaseDate: FC<IMovieBudgetAndReleaseDateProps> = ({
    budget,
    date,
}) => {
    return (
        <Flex>
            <Text color={COLORS.white} fontWeight="extrabold">
                Budget: <chakra.span fontWeight="light">${budget}</chakra.span>
            </Text>
            <Divider color={COLORS.white} mx="10px" orientation="vertical" />
            <Text color={COLORS.white} fontWeight="extrabold">
                Release Date:{' '}
                <chakra.span fontWeight="light">{date}</chakra.span>
            </Text>
        </Flex>
    );
};

interface IMoviePosterProps {
    title: string;
    image: string;
}

const MoviePoster: FC<IMoviePosterProps> = ({ title, image }) => {
    return (
        <AspectRatio maxH="600px" maxW="90vw" ratio={1}>
            <Image
                alt={title}
                h="full"
                objectFit="cover"
                src={image}
                w="full"
            />
        </AspectRatio>
    );
};

interface IMovieTrailerProps {
    video: string;
}

const MovieTrailer: FC<IMovieTrailerProps> = ({ video }) => {
    return (
        <Box
            // eslint-disable-next-line max-len
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            as="iframe"
            frameBorder="0"
            h="full"
            minH={['300px', null, '500px']}
            minW={['375px', null, '600px']}
            src={`https://www.youtube.com/embed/${video}`}
            w="full"
        />
    );
};

interface IProductionCompaniesContainerProps {
    companies: {
        id: number;
        logo_path?: string;
        name: string;
        origin_country: string;
    }[];
}

const ProductionCompaniesContainer: FC<IProductionCompaniesContainerProps> = ({
    companies,
}) => {
    return (
        <Flex direction="column" mt="25px">
            <Heading
                color={COLORS.white}
                fontFamily="Nunito"
                fontSize="20px"
                mb="10px"
            >
                Production Companies
            </Heading>
            <Wrap>
                {companies.map(company => (
                    <WrapItem key={company.id}>
                        <ProductionCompany company={company} />
                    </WrapItem>
                ))}
            </Wrap>
        </Flex>
    );
};

interface IProductionCompanyProps {
    company: {
        id: number;
        logo_path?: string;
        name: string;
        origin_country: string;
    };
}

const ProductionCompany: FC<IProductionCompanyProps> = ({ company }) => {
    const size = IMAGE_CONFIG.logo_sizes.find(s => s === 'w154');
    const image = `${IMAGE_URL}${size}${company?.logo_path}`;
    return (
        <Flex
            alignItems="center"
            bg={COLORS.white}
            justifyContent="center"
            mr="5px"
            padding="10px"
        >
            <Center>
                {company.logo_path ? (
                    <Image alt={company.name} h="20px" mr="5px" src={image} />
                ) : (
                    <Text fontSize="20px" fontWeight="bold">
                        {company.name}
                    </Text>
                )}
            </Center>
        </Flex>
    );
};

const MovieAdditionalInfo: FC<IDetailsProps> = ({ children }) => {
    return <Flex w="full">{children}</Flex>;
};

interface ICastContainerProps {
    castList: {
        adult: boolean;
        cast_id: number;
        character: string;
        credit_id: string;
        gender: number;
        id: number;
        known_for_department: string;
        name: string;
        order: number;
        original_name: string;
        popularity: number;
        profile_path?: string;
    }[];
}

const CastContainer: FC<ICastContainerProps> = ({ castList }) => {
    return (
        <Flex direction="column">
            <Heading
                as="h3"
                color={COLORS.white}
                fontSize="20px"
                fontWeight="bold"
                mt="20px"
            >
                Cast
            </Heading>
            <Divider color={COLORS.white} my="15px" />
            {castList.map(cast => (
                <Cast cast={cast} key={cast.id} />
            ))}
        </Flex>
    );
};

interface ICastProps {
    cast: {
        adult: boolean;
        cast_id: number;
        character: string;
        credit_id: string;
        gender: number;
        id: number;
        known_for_department: string;
        name: string;
        order: number;
        original_name: string;
        popularity: number;
        profile_path?: string;
    };
}

const Cast: FC<ICastProps> = ({ cast }) => {
    const size = IMAGE_CONFIG?.profile_sizes.find(s => s === 'w185');
    const image = `${IMAGE_URL}${size}${cast?.profile_path}`;

    return (
        <Flex
            _hover={{
                transform: 'scale(1.1)',
            }}
            alignItems="center"
            border="1px solid"
            borderColor={COLORS.white}
            cursor="pointer"
            mb="20px"
            padding="20px"
            transition="all 0.2s ease-in-out"
        >
            <Avatar name={cast.name} src={image} />
            <Flex direction="column">
                <Text
                    color={COLORS.white}
                    fontSize="18px"
                    fontWeight="bold"
                    ml="10px"
                >
                    {cast.character}:{' '}
                    <chakra.span fontWeight="light">{cast.name}</chakra.span>
                </Text>
                <Text
                    color={COLORS.white}
                    fontSize="18px"
                    fontWeight="bold"
                    ml="10px"
                >
                    Popularity:{' '}
                    <chakra.span fontWeight="light">
                        {cast.popularity}
                    </chakra.span>
                </Text>
            </Flex>
        </Flex>
    );
};

interface ICrewContainerProps {
    crewList: {
        adult: boolean;
        job: string;
        credit_id: string;
        gender: number;
        id: number;
        department: string;
        known_for_department: string;
        name: string;
        order: number;
        original_name: string;
        popularity: number;
        profile_path?: string;
    }[];
}

const CrewContainer: FC<ICrewContainerProps> = ({ crewList }) => {
    return (
        <Flex direction="column">
            <Heading
                as="h3"
                color={COLORS.white}
                fontSize="20px"
                fontWeight="bold"
                mt="20px"
            >
                Crew
            </Heading>
            <Divider color={COLORS.white} my="15px" />
            {crewList.map((crew, index) => (
                <Crew crew={crew} key={index} />
            ))}
        </Flex>
    );
};

interface ICrewProps {
    crew: {
        adult: boolean;
        job: string;
        credit_id: string;
        gender: number;
        id: number;
        department: string;
        known_for_department: string;
        name: string;
        order: number;
        original_name: string;
        popularity: number;
        profile_path?: string;
    };
}

const Crew: FC<ICrewProps> = ({ crew }) => {
    const size = IMAGE_CONFIG?.profile_sizes.find(s => s === 'w185');
    const image = `${IMAGE_URL}${size}${crew?.profile_path}`;

    return (
        <Flex
            _hover={{
                transform: 'scale(1.1)',
            }}
            alignItems="center"
            border="1px solid"
            borderColor={COLORS.white}
            cursor="pointer"
            mb="20px"
            padding="20px"
            transition="all 0.2s ease-in-out"
        >
            <Avatar name={crew.name} src={image} />
            <Flex direction="column">
                <Text
                    color={COLORS.white}
                    fontSize="18px"
                    fontWeight="bold"
                    ml="10px"
                >
                    Name:{' '}
                    <chakra.span fontWeight="light">{crew.name}</chakra.span>
                </Text>
                <Text
                    color={COLORS.white}
                    fontSize="18px"
                    fontWeight="bold"
                    ml="10px"
                >
                    Department:{' '}
                    <chakra.span fontWeight="light">
                        {crew.department}
                    </chakra.span>
                </Text>
            </Flex>
        </Flex>
    );
};

interface ReviewsList {
    reviews: IReview[];
}

const ReviewsList = ({ reviews }) => {
    return (
        <Flex direction="column">
            {reviews.map(review => (
                <Review key={review.id} review={review} />
            ))}
        </Flex>
    );
};

export {
    Crew,
    Cast,
    CrewContainer,
    CastContainer,
    DetailsContainer,
    MoviePoster,
    MovieTitle,
    MovieInfoContainer,
    MovieAdditionalInfo,
    MovieDescription,
    MovieBudgetAndReleaseDate,
    MovieRate,
    MovieTrailer,
    ProductionCompany,
    ProductionCompaniesContainer,
    ReviewsList,
};
