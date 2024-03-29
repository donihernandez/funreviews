import { Video } from 'typings';

const getTrailer = (videos?: Video[]) => {
    const trailer = videos?.find(video => video.type === 'Trailer');

    if (trailer) {
        return trailer.key;
    }

    return null;
};

export { getTrailer };
