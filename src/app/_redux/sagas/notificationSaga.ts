import askIt from '../../api/askIt';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  fetchUnreadNotificationsSuccess,
  fetchUnreadNotificationsFailure,
  sendNotificationSuccess,
  sendNotificationFailure,
  editNotificationSuccess,
  editNotificationFailure,
  receiveNotificationSuccess,
  receiveNotificationFailure
} from '../actions/notificationActions';
import { notificationTypes } from '../actiontypes/notificationTypes';
import {
  NotificationApiData,
  FetchUnreadNotificationsRequest,
  NotificationData,
  SendNotificationRequest,
  EditNotificationRequest,
  ReceiveANotificationRequest
} from '../reducers/notificationReducer/types';

import { AxiosResponse } from 'axios';

import * as userSelectors from '../selectors/userSelectors';
import { localizeDate } from '../../../services/localization';
import { UserData } from '../reducers/userReducer/types';

const getUnreadNotificationsForLoggedInUser = (id: string) =>
  askIt.get<NotificationApiData[]>(
    `/notifications?recipientId=${id}&_read=false&_sort=datetime&_order=desc`
  );

const addNewNotification = (notification: NotificationApiData) =>
  askIt.post<NotificationApiData>('/notifications', notification);

const editANotification = (id: string) =>
  askIt.patch<NotificationApiData>(`/notifications/${id}`, {
    read: true
  });

// function* createNewNotificationSocket() {
//   try {
//     const loggedInUser: UserApiData = yield select(userSelectors.loggedInUser);

//     const newSocket: Socket = io(apiUrl);

//     newSocket.emit('newUser', loggedInUser.id);

//     yield put(
//       createNotificationSocketSuccess({
//         newSocket: newSocket
//       })
//     );
//   } catch (e: any) {
//     yield put(
//       createNotificationSocketFailure({
//         error: e.error
//       })
//     );
//   }
// }

function* fetchUnreadNotifications(action: FetchUnreadNotificationsRequest) {
  try {
    const response: AxiosResponse<NotificationApiData[]> = yield call(
      getUnreadNotificationsForLoggedInUser,
      action.recipientId
    );

    const users: { [id: string]: UserData } = yield select(
      userSelectors.allUsers
    );

    const results: NotificationData[] = [];

    response.data.forEach((notification) => {
      const authorUsername: string = users[notification.authorId].username;

      results.push({
        id: notification.id,
        questionId: notification.questionId,
        authorUsername: authorUsername,
        read: notification.read,
        datetime: localizeDate(notification.datetime)
      });
    });

    yield put(
      fetchUnreadNotificationsSuccess({
        notificationList: results
      })
    );
  } catch (e: any) {
    yield put(
      fetchUnreadNotificationsFailure({
        error: e.error
      })
    );
  }
}

function* sendNotification(action: SendNotificationRequest) {
  try {
    yield call(addNewNotification, action.newNotification);

    yield put(sendNotificationSuccess());
  } catch (e: any) {
    yield put(
      sendNotificationFailure({
        error: e.error
      })
    );
  }
}

function* editNotification(action: EditNotificationRequest) {
  try {
    // if (action.attribute === 'title') console.log(action.value);

    const response: AxiosResponse<NotificationApiData> = yield call(() =>
      editANotification(action.id)
    );

    const users: { [id: string]: UserData } = yield select(
      userSelectors.allUsers
    );

    const result: NotificationData = {
      id: response.data.id,
      questionId: response.data.questionId,
      authorUsername: users[response.data.authorId].username,
      read: response.data.read,
      datetime: localizeDate(response.data.datetime)
    };

    yield put(
      editNotificationSuccess({
        editedNotification: result
      })
    );
  } catch (e: any) {
    yield put(
      editNotificationFailure({
        error: e
      })
    );
  }
}

function* receiveNotification(action: ReceiveANotificationRequest) {
  try {
    // if (action.attribute === 'title') console.log(action.value);

    const users: { [id: string]: UserData } = yield select(
      userSelectors.allUsers
    );

    const result: NotificationData = {
      id: action.newNotification.id,
      questionId: action.newNotification.questionId,
      authorUsername: users[action.newNotification.authorId].username,
      read: action.newNotification.read,
      datetime: localizeDate(action.newNotification.datetime)
    };

    yield put(
      receiveNotificationSuccess({
        receivedNotification: result
      })
    );
  } catch (e: any) {
    yield put(
      receiveNotificationFailure({
        error: e
      })
    );
  }
}

function* notificationSaga() {
  yield all([
    takeLatest(
      notificationTypes.FETCH_UNREAD_NOTIFICATIONS_REQUEST,
      fetchUnreadNotifications
    ),
    takeLatest(notificationTypes.SEND_NOTIFICATION_REQUEST, sendNotification),
    takeLatest(notificationTypes.EDIT_NOTIFICATION_REQUEST, editNotification),
    takeLatest(
      notificationTypes.RECEIVE_A_NOTIFICATION_REQUEST,
      receiveNotification
    )
  ]);
}

export default notificationSaga;
