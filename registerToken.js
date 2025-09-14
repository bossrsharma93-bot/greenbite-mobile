import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function registerForPushNotificationsAsync() {
  try {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') { return; }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      // send to backend
      const jwt = await AsyncStorage.getItem('token');
      await axios.post(Constants.expoConfig.extra.API_URL + '/register-token', { token }, { headers: { Authorization: 'Bearer ' + jwt } });
    } else {
      console.log('Must use physical device for Push Notifications');
    }
  } catch (e) { console.log('register token error', e.message); }
}