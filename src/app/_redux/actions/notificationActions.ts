import { notificationTypes } from '../actiontypes/notificationTypes';
import {
  FetchUnreadNotificationsFailure,
  FetchUnreadNotificationsFailurePayload,
  FetchUnreadNotificationsRequest,
  FetchUnreadNotificationsSuccess,
  FetchUnreadNotificationsSuccessPayload,
  NotificationApiData,
  SendNotificationRequest,
  SendNotificationSuccess,
  SendNotificationFailure,
  SendNotificationFailurePayload,
  EditNotificationRequest,
  EditNotificationSuccessPayload,
  EditNotificationSuccess,
  EditNotificationFailurePayload,
  EditNotificationFailure,
  ReceiveANotificationRequest,
  ReceiveANotificationSuccessPayload,
  ReceiveANotificationSuccess,
  ReceiveANotificationFailurePayload,
  ReceiveANotificationFailure
} from '../reducers/notificationReducer/types';

export const fetchUnreadNotificationsRequest = (
  recipientId: string
): FetchUnreadNotificationsRequest => ({
  type: notificationTypes.FETCH_UNREAD_NOTIFICATIONS_REQUEST,
  recipientId
});

export const fetchUnreadNotificationsSuccess = (
  payload: FetchUnreadNotificationsSuccessPayload
): FetchUnreadNotificationsSuccess => ({
  type: notificationTypes.FETCH_UNREAD_NOTIFICATIONS_SUCCESS,
  payload
});

export const fetchUnreadNotificationsFailure = (
  payload: FetchUnreadNotificationsFailurePayload
): FetchUnreadNotificationsFailure => ({
  type: notificationTypes.FETCH_UNREAD_NOTIFICATIONS_FAILURE,
  payload
});

export const sendNotificationRequest = (
  newNotification: Omit<NotificationApiData, 'id' | 'read' | 'datetime'>
): SendNotificationRequest => ({
  type: notificationTypes.SEND_NOTIFICATION_REQUEST,
  newNotification
});

export const sendNotificationSuccess = (): SendNotificationSuccess => ({
  type: notificationTypes.SEND_NOTIFICATION_SUCCESS
});

export const sendNotificationFailure = (
  payload: SendNotificationFailurePayload
): SendNotificationFailure => ({
  type: notificationTypes.SEND_NOTIFICATION_FAILURE,
  payload
});

export const editNotificationRequest = (
  id: string
): EditNotificationRequest => ({
  type: notificationTypes.EDIT_NOTIFICATION_REQUEST,
  id
});

export const editNotificationSuccess = (
  payload: EditNotificationSuccessPayload
): EditNotificationSuccess => ({
  type: notificationTypes.EDIT_NOTIFICATION_SUCCESS,
  payload
});

export const editNotificationFailure = (
  payload: EditNotificationFailurePayload
): EditNotificationFailure => ({
  type: notificationTypes.EDIT_NOTIFICATION_FAILURE,
  payload
});

export const receiveNotificationRequest = (
  newNotification: NotificationApiData
): ReceiveANotificationRequest => ({
  type: notificationTypes.RECEIVE_A_NOTIFICATION_REQUEST,
  newNotification
});

export const receiveNotificationSuccess = (
  payload: ReceiveANotificationSuccessPayload
): ReceiveANotificationSuccess => ({
  type: notificationTypes.RECEIVE_A_NOTIFICATION_SUCCESS,
  payload
});

export const receiveNotificationFailure = (
  payload: ReceiveANotificationFailurePayload
): ReceiveANotificationFailure => ({
  type: notificationTypes.RECEIVE_A_NOTIFICATION_FAILURE,
  payload
});
