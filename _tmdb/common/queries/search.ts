import { client } from '@/utils/client';
import { IQuery } from 'typings';

const search = async (query: IQuery, type) => {
    const res = await client.get(
        // eslint-disable-next-line max-len
        `/discover/${type}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
        {
            params: query,
        },
    );

    if (res?.data) {
        return res.data;
    }

    return null;
};

export { search };
