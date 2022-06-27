import { Flex } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper';

import { useBreakpoints } from 'hooks';
import {
    SlideShowContainer,
    SlideShowPreview,
    SlideShowVideo,
} from './Slideshow.components';

import { Movie } from 'typings';
import { getVideos } from '@/api/movies/queries';
import { getTrailer } from 'utils';

interface ISlideShowProps {
    movies: Movie[];
}

const SlideShow: FC<ISlideShowProps> = ({ movies }) => {
    const { isSmallerThanDesktop } = useBreakpoints();

    const [videos, setVideos] = useState([]);
    const [activeSlide, setActiveSlide] = useState<number>(movies[0].id);
    const [currentTrailer, setCurrentTrailer] = useState('');

    const handleGetVideo = async (id: number) => {
        const data = await getVideos(id);
        setVideos(data.results);
        const trailer = getTrailer(data.results);
        setCurrentTrailer(trailer);
    };

    useEffect(() => {
        handleGetVideo(activeSlide);
    }, []);

    const updateActiveSlide = async (id: number) => {
        setActiveSlide(id);
        await handleGetVideo(id);
    };

    return (
        <SlideShowContainer>
            <SlideShowVideo video={currentTrailer} />
            <Flex
                alignItems="center"
                bg="#000"
                direction={isSmallerThanDesktop ? 'row' : 'column'}
                maxW={['full', null, '300px']}
                w="full"
            >
                <Swiper
                    className="mySwiper"
                    direction={'vertical'}
                    grabCursor={true}
                    modules={[Pagination]}
                    pagination={{
                        clickable: true,
                    }}
                    slidesPerView={5}
                    spaceBetween={10}
                >
                    {movies?.map(movie => (
                        <SwiperSlide key={movie.id}>
                            <SlideShowPreview
                                movie={movie}
                                updateActiveSlide={updateActiveSlide}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Flex>
        </SlideShowContainer>
    );
};

export { SlideShow };
