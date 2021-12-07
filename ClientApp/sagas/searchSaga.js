// in src/searchSaga.js
import { call, put, takeEvery } from 'redux-saga/effects';
import apiCall from './apiCall';

function* searchItem(action) {
  try {
    const item = yield call(
      apiCall,
      'GET',
      `/sales/search?batch=${action.payload.batch}`,
    );
    yield put({ type: 'ITEM_FETCH_SUCCEEDED', item: item });
  } catch (e) {
    console.log(e);
    yield put({ type: 'ITEM_FETCH_FAILED', message: e.message });
  }
}

export default function* searchSaga() {
  yield takeEvery('BATCH_RECEIVED', searchItem);
}
