import askIt, { apiUrl } from '../../api/askIt';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  fetchUnreadNotificationsSuccess,
  fetchUnreadNotificationsFailure,
  createNotificationSocketSuccess,
  createNotificationSocketFailure,
  sendNotificationSuccess,
  sendNotificationFailure,
  editNotificationSuccess,
  editNotificationFailure
} from '../actions/notificationActions';
import { notificationTypes } from '../actiontypes/notificationTypes';
import {
  NotificationApiData,
  FetchUnreadNotificationsRequest,
  NotificationData,
  SendNotificationRequest,
  EditNotificationRequest
} from '../reducers/notificationReducer/types';

import { AxiosResponse } from 'axios';

import * as userSelectors from '../selectors/userSelectors';
import * as notificationSelectors from '../selectors/notificationSelectors';
import { localizeDate } from '../../../services/localization';
import { UserData } from '../reducers/userReducer/types';

import { io, Socket } from 'socket.io-client';
import { generateRandomId } from '../../../services/uuidService';

const getUnreadNotificationsForLoggedInUser = (id: string) =>
  askIt.get<NotificationApiData[]>(
    `/notifications?recipientId=${id}&_read=false&_sort=datetime&_order=desc`
  );

const addNewNotification = (
  notification: Omit<NotificationApiData, 'id' | 'read' | 'datetime'>
) =>
  askIt.post<NotificationApiData>('/notifications', {
    ...notification,
    id: generateRandomId(),
    read: false,
    datetime: Date.now()
  });

const editANotification = (id: string) =>
  askIt.patch<NotificationApiData>(`/notifications/${id}`, {
    read: true
  });

function* createNewNotificationSocket() {
  try {
    const newSocket = io(apiUrl);

    yield put(
      createNotificationSocketSuccess({
        newSocket: newSocket
      })
    );
  } catch (e: any) {
    yield put(
      createNotificationSocketFailure({
        error: e.error
      })
    );
  }
}

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

    const notificationSocket: Socket = yield select(
      notificationSelectors.socket
    );

    notificationSocket.emit('notification', action.newNotification);

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

function* notificationSaga() {
  yield all([
    takeLatest(
      notificationTypes.FETCH_UNREAD_NOTIFICATIONS_REQUEST,
      fetchUnreadNotifications
    ),
    takeLatest(
      notificationTypes.CREATE_NOTIFICATION_SOCKET_REQUEST,
      createNewNotificationSocket
    ),
    takeLatest(notificationTypes.SEND_NOTIFICATION_REQUEST, sendNotification),
    takeLatest(notificationTypes.EDIT_NOTIFICATION_REQUEST, editNotification)
  ]);
}

export default notificationSaga;
