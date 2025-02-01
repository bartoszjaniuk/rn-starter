import { DeviceEventEmitter, EmitterSubscription } from 'react-native';

// NOT USED ANYMORE, LEGACY CODE
export const EventEmitter = {
  emitLogout: () => DeviceEventEmitter.emit('logout'),
  addLogoutListener: (callback: () => void) => DeviceEventEmitter.addListener('logout', callback),
  removeLogoutListener: (subscription: EmitterSubscription) => {
    subscription.remove(); // Properly remove the event listener
  },
};
