import { IMAGE_CONFIG, IMAGE_URL } from '@/utils/images';

const getImages = async (size: string, type: string, imageUrl: string) => {
    const getImageSize = () => {
        switch (type) {
            case 'backdrop':
                return IMAGE_CONFIG.backdrop_sizes.find(s => s === size);
            case 'poster':
                return IMAGE_CONFIG.poster_sizes.find(s => s === size);
            default:
                return 'original';
        }
    };
    return `${IMAGE_URL}${getImageSize()}${imageUrl}`;
};

export { getImages };
