import PushNotification from 'react-native-push-notification'
import {NotificationType, Notification, NotificationEngagement} from '../Models/TextileTypes'
import {Platform} from 'react-native'

export interface NotificationsPayload {
  title: string,
  message: string,
  typeString: string
}

export function toPayload(notification: Notification): NotificationsPayload | undefined {
  const typeString = NotificationType[notification.type] as string
  const actor = notification.actor_username || 'A peer'

  switch (notification.type) {
    case(NotificationType.receivedInviteNotification): {
      const target = notification.category && notification.category != '' ? 'to ' + notification.category : 'to a new Thread'
      const title = 'New Invite'
      const message =  [actor, notification.body, target].join(' ') + '.'
      return {title, message, typeString}
    }
    case(NotificationType.deviceAddedNotification): {
      const title = 'New Device'
      const message = 'A new device has paired with your wallet'
      return {title, message, typeString}
    }
    case(NotificationType.photoAddedNotification): {
      const target = notification.category && notification.category != '' ? 'to ' + notification.category : ''
      const title = 'New Photo'
      const message =  [actor, notification.body, target].join(' ') + '.'
      return {title, message, typeString}
    }
    case(NotificationType.commentAddedNotification): {
      const title =  'New comment'
      const message = [actor, notification.body].join(' ') + '.'
      return {title, message, typeString}
    }
    case(NotificationType.likeAddedNotification): {
      const title = 'New like'
      const message = [actor, notification.body].join(' ') + '.'
      return {title, message, typeString}
    }
    case(NotificationType.peerJoinedNotification): {
      const target = notification.category && notification.category != 'a thread' ? ' ' + notification.category : ''
      const title = 'New Peer'
      const message =  [actor, notification.body, target].join(' ') + '.'
      return {title, message, typeString}
    }
    case(NotificationType.peerLeftNotification): {
      const target = notification.category && notification.category != 'a thread' ? ' ' + notification.category : ''
      const title = 'Peer left'
      const message =  [actor, notification.body, target].join(' ') + '.'
      return {title, message, typeString}
    }
    default: {
      return undefined
    }
  }
}

export function getData(engagement: NotificationEngagement): any {
  if (Platform.OS === 'ios') {
  } else {
    console.log('HELLLLOOO ANDROID', engagement)
    const { data } = engagement
    return data
  }
}

export async function createNew(notification: Notification): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    try {
      const payload = toPayload(notification)
      if (!payload) return
      PushNotification.localNotification({
        title: payload.title,
        message: payload.message,
        /* Android Only Property */
        group: payload.typeString, // (optional) add group to message
        /* iOS Only Property */
        category: payload.typeString, // (optional) default: null
        userInfo: { notification },

        /* Android Only Properties */
        largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
        smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
        //id: '22', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
        //actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
        //ticker: "My Notification Ticker", // (optional)
        //bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
        //subText: "This is a subText", // (optional) default: none

        /* iOS only properties */
        // alertAction: 'view' // (optional) default: view
        playSound: false,
        vibrate: false
      })
      resolve()
    } catch (error) {
      reject()
    }
  })
}

export async function enable(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    try {
      PushNotification.requestPermissions()
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

