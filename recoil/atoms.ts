import { atom } from 'recoil';

const showsState = atom({
    default: [],
    key: 'showsState',
});

const typeState = atom({
    default: '',
    key: 'typeState',
});

const movieGenresState = atom({
    default: [],
    key: 'movieGenresState',
});

const tvGenresState = atom({
    default: [],
    key: 'tvGenresState',
});

const isVideoState = atom({
    default: false,
    key: 'isVideoState',
});

export { showsState, typeState, movieGenresState, tvGenresState, isVideoState };
