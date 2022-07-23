import { chakra } from '@chakra-ui/react';
import { isValidMotionProp, motion } from 'framer-motion';

const MotionImage = chakra(motion.image, {
    shouldForwardProp: prop => isValidMotionProp(prop) || prop === 'children',
});

export { MotionImage };
