import { IGenre } from 'typings';

const getGenres = (items: any, genreList: IGenre[]) => {
    const genres = items?.map(item => item.genre_ids);

    const flatGenres = genres.flat();
    const uniqueGenres = [...new Set(flatGenres)];
    const genreNames = uniqueGenres.map(
        (genre: number) => genreList?.find(g => g.id === genre)?.name,
    );
    return genreNames;
};

export { getGenres };
