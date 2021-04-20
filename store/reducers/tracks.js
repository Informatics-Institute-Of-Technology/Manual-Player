import TRACKS from '../../data/dummy-data';

const initialState = {
    availableTracks: TRACKS,
    userTracks: TRACKS.filter(track => track.id === '1')
};

export default (state = initialState, action) => {
    return state;
};