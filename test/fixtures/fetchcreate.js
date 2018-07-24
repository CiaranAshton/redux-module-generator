module.exports = () => `import { createAction } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// api calls
export const getTesty = () => axios.get('/api/testy');

// events
export const FETCH_TESTY = 'FETCH_TESTY';
export const FETCH_TESTY_SUCCESS = 'FETCH_TESTY_SUCCESS';
export const FETCH_TESTY_FAILED = 'FETCH_TESTY_FAILED';
export const CREATE_TESTY = 'CREATE_TESTY';
export const CREATE_TESTY_SUCCESS = 'CREATE_TESTY_SUCCESS';
export const CREATE_TESTY_FAILED = 'CREATE_TESTY_FAILED';

// status
export const UNINITIALISED = 'UNINITIALISED';
export const LOADING = 'LOADING';
export const LOADING_FAILED = 'LOADING_FAILED';
export const LOADED = 'LOADED';

// actions
export const fetchTesty = createAction(FETCH_TESTY);
export const fetchTestySuccess = createAction(FETCH_TESTY_SUCCESS);
export const fetchTestyFailed = createAction(FETCH_TESTY_FAILED);
export const createTesty = createAction(CREATE_TESTY);
export const createTestySuccess = createAction(CREATE_TESTY_SUCCESS);
export const createTestyFailed = createAction(CREATE_TESTY_FAILED);

// initial state
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
        case CREATE_TESTY:
            return { ...state, status: LOADING };
        case CREATE_TESTY_SUCCESS:
            return { 
                ...state, 
                status: LOADED, 
                testy: {
                    ...state.testy,
                    [payload.id]: payload.data,
                }
            };
        case CREATE_TESTY_FAILED:
            return {
                ...state,
                status: LOADING_FAILED,
                error: 'FAILED_TO_CREATE_TESTY',
            };
        default:
            return state;
    }
};

// watchers
export function* watchTestySaga() {
    yield takeLatest(FETCH_TESTY, fetchTestySaga);
    yield takeLatest(CREATE_TESTY, createTestySaga);
}

// sagas
export function* fetchTestySaga() {
    try {
        const res = yield call(getTesty);
        yield put(fetchTestySuccess(res));
    } catch (err) {
        yield put(fetchTestyFailed(err));
    }
}
export function* createTestySaga() {
    try {
        const res = yield call(getTesty);
        yield put(createTestySuccess(res));
    } catch (err) {
        yield put(createTestyFailed(err));
    }
}`.trim();
