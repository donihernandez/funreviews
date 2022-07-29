import { client } from 'utils';

const getLatest = async () => {
    const res = await client.get(
        // eslint-disable-next-line max-len
        `/movie/latest?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
    );

    if (res?.data) {
        return res.data;
    }

    return null;
};

export { getLatest };
