import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import { useState } from 'react';

import { Movie, Tv } from 'typings';
import { InfoCard } from '../InfoCard';
import { MotionBox } from '../MotionBox';

interface ICarouselProps {
    shows: Movie[] | Tv[];
    type: 'movie' | 'tv';
}

const Carousel: FC<ICarouselProps> = ({ shows, type }) => {
    const [width, setWidth] = useState(0);

    const innerCarouselStyle = {
        display: 'flex',
        x: 0,
    };

    const carouselRef = useRef(null);

    const carouselStyle = {
        cursor: 'grab',
        overflow: 'hidden',
    };

    useEffect(() => {
        setWidth(
            carouselRef.current.scrollWidth - carouselRef.current.offsetWidth,
        );
    }, []);

    return (
        <MotionBox
            ref={carouselRef}
            style={carouselStyle}
            whileTap={{ cursor: 'grabbing' }}
        >
            <MotionBox
                drag="x"
                dragConstraints={{ left: -width, right: 0 }}
                dragPropagation={true}
                dragTransition={{ bounceDamping: 10, bounceStiffness: 400 }}
                initial={{ x: 0 }}
                style={innerCarouselStyle}
            >
                {shows?.map(item => {
                    return <InfoCard item={item} key={item.id} type={type} />;
                })}
            </MotionBox>
        </MotionBox>
    );
};

export { Carousel };
