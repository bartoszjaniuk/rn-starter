import { DeviceEventEmitter, EmitterSubscription } from 'react-native';

export const EventEmitter = {
  emitLogout: () => DeviceEventEmitter.emit('logout'),
  addLogoutListener: (callback: () => void) => DeviceEventEmitter.addListener('logout', callback),
  removeLogoutListener: (subscription: EmitterSubscription) => {
    subscription.remove(); // Properly remove the event listener
  },
};
