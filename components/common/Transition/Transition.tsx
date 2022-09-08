import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

const variants = {
    in: {
        opacity: 1,
        scale: 1,
        transition: {
            delay: 0.5,
            duration: 0.75,
        },
        y: 0,
    },
    out: {
        opacity: 0,
        scale: 1,
        transition: {
            duration: 0.75,
        },
        y: 40,
    },
};

const Transition = ({ children }) => {
    const { asPath } = useRouter();

    return (
        <div className="effect-1">
            <AnimatePresence exitBeforeEnter initial={false}>
                <motion.div
                    animate="in"
                    exit="out"
                    initial="out"
                    key={asPath}
                    variants={variants}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export { Transition };
