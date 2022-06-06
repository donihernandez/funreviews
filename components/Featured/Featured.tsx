import { Flex } from '@chakra-ui/react';
import { Carousel } from '../common/Carousel';
import { InfoCard } from '../common/InfoCard';

const Featured = () => {
    return (
        <Flex direction="column" h="full" padding="100px 0" w="full">
            <Carousel>
                <InfoCard />
                <InfoCard />
                <InfoCard />
                <InfoCard />
                <InfoCard />
                <InfoCard />
                <InfoCard />
                <InfoCard />
            </Carousel>
        </Flex>
    );
};

export { Featured };
