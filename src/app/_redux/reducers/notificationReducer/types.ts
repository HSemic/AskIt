import { Socket } from 'socket.io-client';
import { notificationTypes } from '../../actiontypes/notificationTypes';

export interface NotificationApiData {
  id: string;
  recipientId: string;
  questionId: string;
  authorId: string;
  read: boolean;
  datetime: number;
}

export interface NotificationData {
  id: string;
  questionId: string;
  authorUsername: string;
  read: boolean;
  datetime: string;
}

export interface NotificationState {
  notifications: NotificationData[];
  error: string | null;
  pending: boolean;
  requestStatus: 'success' | 'failure';
}

export interface FetchUnreadNotificationsSuccessPayload {
  notificationList: NotificationData[];
}

export interface FetchUnreadNotificationsFailurePayload {
  error: string;
}

export interface FetchUnreadNotificationsRequest {
  type: typeof notificationTypes.FETCH_UNREAD_NOTIFICATIONS_REQUEST;
  recipientId: string;
}

export type FetchUnreadNotificationsSuccess = {
  type: typeof notificationTypes.FETCH_UNREAD_NOTIFICATIONS_SUCCESS;
  payload: FetchUnreadNotificationsSuccessPayload;
};

export type FetchUnreadNotificationsFailure = {
  type: typeof notificationTypes.FETCH_UNREAD_NOTIFICATIONS_FAILURE;
  payload: FetchUnreadNotificationsFailurePayload;
};

export interface SendNotificationFailurePayload {
  error: string;
}

export interface SendNotificationRequest {
  type: typeof notificationTypes.SEND_NOTIFICATION_REQUEST;
  newNotification: Omit<NotificationApiData, 'id' | 'read' | 'datetime'>;
}

export interface SendNotificationSuccess {
  type: typeof notificationTypes.SEND_NOTIFICATION_SUCCESS;
}

export interface SendNotificationFailure {
  type: typeof notificationTypes.SEND_NOTIFICATION_FAILURE;
  payload: SendNotificationFailurePayload;
}

export interface EditNotificationSuccessPayload {
  editedNotification: NotificationData;
}

export interface EditNotificationFailurePayload {
  error: string;
}

export interface EditNotificationRequest {
  type: typeof notificationTypes.EDIT_NOTIFICATION_REQUEST;
  id: string;
}

export interface EditNotificationSuccess {
  type: typeof notificationTypes.EDIT_NOTIFICATION_SUCCESS;
  payload: EditNotificationSuccessPayload;
}

export interface EditNotificationFailure {
  type: typeof notificationTypes.EDIT_NOTIFICATION_FAILURE;
  payload: EditNotificationFailurePayload;
}

export interface ReceiveANotificationSuccessPayload {
  receivedNotification: NotificationData;
}

export interface ReceiveANotificationFailurePayload {
  error: string;
}

export interface ReceiveANotificationRequest {
  type: typeof notificationTypes.RECEIVE_A_NOTIFICATION_REQUEST;
  newNotification: NotificationApiData;
}

export interface ReceiveANotificationSuccess {
  type: typeof notificationTypes.RECEIVE_A_NOTIFICATION_SUCCESS;
  payload: ReceiveANotificationSuccessPayload;
}

export interface ReceiveANotificationFailure {
  type: typeof notificationTypes.RECEIVE_A_NOTIFICATION_FAILURE;
  payload: ReceiveANotificationFailurePayload;
}

export type NotificationAction =
  | FetchUnreadNotificationsRequest
  | FetchUnreadNotificationsSuccess
  | FetchUnreadNotificationsFailure
  | SendNotificationRequest
  | SendNotificationSuccess
  | SendNotificationFailure
  | EditNotificationRequest
  | EditNotificationSuccess
  | EditNotificationFailure
  | ReceiveANotificationRequest
  | ReceiveANotificationSuccess
  | ReceiveANotificationFailure;
