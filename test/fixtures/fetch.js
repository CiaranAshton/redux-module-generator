module.exports = () => `
import { createAction } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// api calls
export const getTesty = () => axios.get('/api/testy');

// events
export const FETCH_TESTY = 'FETCH_TESTY';
export const FETCH_TESTY_SUCCESS = 'FETCH_TESTY_SUCCESS';
export const FETCH_TESTY_FAILED = 'FETCH_TESTY_FAILED';



// status
export const UNINITIALISED = 'UNINITIALISED';
export const LOADING = 'LOADING';
export const LOADING_FAILED = 'LOADING_FAILED';
export const LOADED = 'LOADED';

// actions
export const fetchTesty = createAction(FETCH_TESTY);
export const fetchTestySuccess = createAction(FETCH_TESTY_SUCCESS);
export const fetchTestyFailed = createAction(FETCH_TESTY_FAILED);


const INITIAL_STATE = {
    status: UNINITIALISED,
};

// reducer
export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case FETCH_TESTY:
            return { ...state, status: LOADING };

        case FETCH_TESTY_SUCCESS:
            return { ...state, status: LOADED, testy: payload.data };

        case FETCH_TESTY_FAILED:
            return {
                ...state,
                status: LOADING_FAILED,
                error: 'FAILED_TO_RETRIEVE_TESTY',
            };

        default:
            return state;
    }
};

// watchers
export function* watchTestySaga() {
    yield takeLatest(FETCH_TESTY, fetchTestySaga);

}

// sagas
export function* fetchTestySaga() {
    try {
        const res = yield call(getTesty);
        yield put(fetchTestySuccess(res));
    } catch (err) {
        yield put(fetchTestyFailed(err));
    }
}`.trim();
