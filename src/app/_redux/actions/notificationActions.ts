import { notificationTypes } from '../actiontypes/notificationTypes';
import {
  CreateNotificationSocketFailure,
  CreateNotificationSocketFailurePayload,
  CreateNotificationSocketRequest,
  CreateNotificationSocketSuccess,
  CreateNotificationSocketSuccessPayload,
  DestroyNotificationSocket,
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
  EditNotificationFailure
} from '../reducers/notificationReducer/types';

export const createNotificationSocketRequest =
  (): CreateNotificationSocketRequest => ({
    type: notificationTypes.CREATE_NOTIFICATION_SOCKET_REQUEST
  });

export const createNotificationSocketSuccess = (
  payload: CreateNotificationSocketSuccessPayload
): CreateNotificationSocketSuccess => ({
  type: notificationTypes.CREATE_NOTIFICATION_SOCKET_SUCCESS,
  payload
});

export const createNotificationSocketFailure = (
  payload: CreateNotificationSocketFailurePayload
): CreateNotificationSocketFailure => ({
  type: notificationTypes.CREATE_NOTIFICATION_SOCKET_FAILURE,
  payload
});

export const destroyNotificationSocket = (): DestroyNotificationSocket => ({
  type: notificationTypes.DESTROY_NOTIFICATION_SOCKET
});

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
