import { client } from 'utils';

const getAllMovies = async () => {
    let isLast = false;
    const movies = [];
    let nextPage = 1;

    while (!isLast) {
        const res = await client.get(
            // eslint-disable-next-line max-len
            `/movie/popular?page=${nextPage}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
        );

        if (res.data) {
            const currentPage = res.data.page;
            if (currentPage === res.data.total_pages) {
                isLast = true;
            }

            res.data.results.forEach(movie => movies.push(movie));
            nextPage++;
        }
    }

    return movies;
};

export { getAllMovies };
