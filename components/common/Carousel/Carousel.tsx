import { FC, useEffect, useRef } from 'react';
import { useState } from 'react';
import { MotionBox } from '../MotionBox';

interface ICarouselProps {
    children: React.ReactNode;
}

const Carousel: FC<ICarouselProps> = ({ children }) => {
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
                dragTransition={{ bounceDamping: 10, bounceStiffness: 500 }}
                style={innerCarouselStyle}
            >
                {children}
            </MotionBox>
        </MotionBox>
    );
};

export { Carousel };
