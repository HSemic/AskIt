import askIt from '../../api/askIt';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchUserSuccess, fetchUserFailure } from '../actions/userActions';
import { userTypes } from '../actiontypes/userTypes';
import { UserApiData, FetchUserRequest } from '../reducers/userReducer/types';
import { AxiosResponse } from 'axios';

const getUser = (id: string) => askIt.get<UserApiData[]>(`/users/${id}`);

function* fetchUserSaga(action: FetchUserRequest) {
  try {
    const response: AxiosResponse<UserApiData> = yield call(getUser, action.id);
    yield put(
      fetchUserSuccess({
        user: response.data
      })
    );
  } catch (e: any) {
    yield put(
      fetchUserFailure({
        error: e.error
      })
    );
  }
}

function* userSaga() {
  yield all([takeLatest(userTypes.FETCH_USER_REQUEST, fetchUserSaga)]);
}

export default userSaga;
