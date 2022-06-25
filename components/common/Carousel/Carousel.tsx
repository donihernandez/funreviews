import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import { useState } from 'react';

import { Movie, Tv } from 'typings';
import { InfoCard } from '../InfoCard';
import { MotionBox } from '../MotionBox';

interface ICarouselProps {
    filtered: Movie[] | Tv[];
}

const Carousel: FC<ICarouselProps> = ({ filtered }) => {
    const [width, setWidth] = useState(0);
    const [items] = useState(filtered);
    const [innerCarouselStyle, setInnerCarouselStyle] = useState({
        display: 'flex',
        x: 0,
    });
    const carouselRef = useRef(null);

    const carouselStyle = {
        cursor: 'grab',
        overflow: 'hidden',
    };

    useEffect(() => {
        if (items.length !== filtered.length) {
            setInnerCarouselStyle(prev => ({
                ...prev,
                transform: 'translateX(0px)',
            }));
        }
        setWidth(
            carouselRef.current.scrollWidth - carouselRef.current.offsetWidth,
        );
    }, [filtered]);

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
                {filtered.map(item => {
                    return <InfoCard item={item} key={item.id} />;
                })}
            </MotionBox>
        </MotionBox>
    );
};

export { Carousel };
