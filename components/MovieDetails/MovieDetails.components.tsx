import type { FC } from 'react';
import {
    AspectRatio,
    Avatar,
    Box,
    chakra,
    Divider,
    Flex,
    Heading,
    Image,
    Text,
} from '@chakra-ui/react';

import { COLORS } from '@/styles/theme';
import { IMAGE_CONFIG, IMAGE_URL } from '@/utils/images';

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
            <Flex>
                {companies.map(company => (
                    <ProductionCompany company={company} key={company.id} />
                ))}
            </Flex>
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
            {company.logo_path ? (
                <Image alt={company.name} h="20px" mr="5px" src={image} />
            ) : (
                <Text fontSize="20px" fontWeight="bold">
                    {company.name}
                </Text>
            )}
        </Flex>
    );
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

export {
    Crew,
    Cast,
    CrewContainer,
    CastContainer,
    MoviePoster,
    MovieTrailer,
    ProductionCompany,
    ProductionCompaniesContainer,
};
