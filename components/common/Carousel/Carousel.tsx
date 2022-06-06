import { FC, useEffect, useRef } from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';

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
        <motion.div
            ref={carouselRef}
            style={carouselStyle}
            whileTap={{ cursor: 'grabbing' }}
        >
            <motion.div
                drag="x"
                dragConstraints={{ left: -width, right: 0 }}
                style={innerCarouselStyle}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

export { Carousel };
