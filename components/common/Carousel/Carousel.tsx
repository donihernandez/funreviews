import { FC, useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';
import { InfoCard } from '../InfoCard';
import { MotionBox } from '../MotionBox';

interface ICarouselProps {
    filtered: any;
}

const Carousel: FC<ICarouselProps> = ({ filtered }) => {
    const [width, setWidth] = useState(0);
    const carouselRef = useRef(null);

    const carouselStyle = {
        cursor: 'grab',
        overflow: 'hidden',
    };

    const innerCarouselStyle = {
        display: 'flex',
    };

    useEffect(() => {
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
