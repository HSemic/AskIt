import { notificationTypes } from '../../actiontypes/notificationTypes';
import { NotificationState, NotificationAction } from './types';

const initialState: NotificationState = {
  notifications: [],
  error: null,
  pending: false,
  requestStatus: 'success'
};

const notificationReducer = (
  state = initialState,
  action: NotificationAction
): NotificationState => {
  switch (action.type) {
    case notificationTypes.FETCH_UNREAD_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.payload.notificationList,
        pending: false,
        requestStatus: 'success'
      };
    case notificationTypes.FETCH_UNREAD_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
        requestStatus: 'failure'
      };
    case notificationTypes.SEND_NOTIFICATION_SUCCESS:
      return {
        ...state,
        pending: false,
        requestStatus: 'success'
      };
    case notificationTypes.SEND_NOTIFICATION_FAILURE:
      return {
        ...state,
        pending: false,
        requestStatus: 'failure',
        error: action.payload.error
      };
    case notificationTypes.EDIT_NOTIFICATION_SUCCESS:
      const editedNotificationIndex = state.notifications
        .map((n) => n.id)
        .indexOf(action.payload.editedNotification.id);

      const newNotificationList = [...state.notifications];
      newNotificationList[editedNotificationIndex] =
        action.payload.editedNotification;
      return {
        ...state,
        notifications: newNotificationList,
        pending: false,
        requestStatus: 'failure'
      };
    case notificationTypes.EDIT_NOTIFICATION_FAILURE:
      return {
        ...state,
        pending: false,
        requestStatus: 'failure',
        error: action.payload.error
      };
    case notificationTypes.RECEIVE_A_NOTIFICATION_SUCCESS:
      const newNotificationList2 = [
        action.payload.receivedNotification,
        ...state.notifications
      ];
      return {
        ...state,
        notifications: newNotificationList2,
        pending: false,
        requestStatus: 'success'
      };
    case notificationTypes.RECEIVE_A_NOTIFICATION_FAILURE:
      return {
        ...state,
        pending: false,
        requestStatus: 'failure',
        error: action.payload.error
      };
    default:
      return {
        ...state
      };
  }
};

export default notificationReducer;
