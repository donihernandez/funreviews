import { type } from 'os';

interface Movie {
    id: number;
    title: string;
    original_title: string;
    poster_path?: string;
    backdrop_path?: string;
    overview: string;
    release_date: string;
    genre_ids: number[];
    vote_average: number;
    vote_count: number;
    video: boolean;
    popularity: number;
    adult: boolean;
}

interface Tv {
    id: number;
    name: string;
    original_name: string;
    poster_path?: string;
    backdrop_path?: string;
    overview: string;
    release_date: string;
    genre_ids: number[];
    first_air_date?: string;
    vote_average: number;
    vote_count: number;
    video: boolean;
    origin_country: string[];
    original_language: string;
    popularity: number;
}

interface Video {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
}

interface Review {
    review: {
        author: string;
        author_details: {
            name: string;
            username: string;
            avatar_path: string;
            rating: number;
        };
        content: string;
        id: string;
        url: string;
        updated_at: string;
        created_at: string;
    };
}

interface IMovieQuery {
    'primary_release_date.gte': string;
    'primary_release_date.lte': string;
    sort_by: string;
    'vote_average.gte': number;
    'vote_average.lte': number;
    with_genres: string;
}

interface IShowQuery {
    'first_air_date.gte': string;
    'first_air_date.lte': string;
    sort_by: string;
    'vote_average.gte': number;
    'vote_average.lte': number;
    with_genres: string;
}

interface IGenre {
    id: number;
    name: string;
}

type IQuery = IMovieQuery | IShowQuery;

export { Movie, Tv, Video, IQuery, IGenre, Review };
