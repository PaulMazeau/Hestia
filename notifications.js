import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

//setup des notifs locals + demande des permissions
const Notif = () => {
    //setup des listeners qu'utilise expo notification
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    //dmd la permission pr les notifs
    const getPermission = async () => {
            const { status: existingStatus } = await Notifications.getPermissionsAsync(); //on check si on a la permission
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') { //si on la pas on demande
              const { status } = await Notifications.requestPermissionsAsync();
              finalStatus = status;
            }
            if (finalStatus !== 'granted') { //si permission refusée on fait les forceurs
              alert('Enable push notifications to use the app!');
              return;
            }
  
          if (Platform.OS === 'android') { //style de la notif sur android
            Notifications.setNotificationChannelAsync('default', {
              name: 'default',
              importance: Notifications.AndroidImportance.MAX,
              vibrationPattern: [0, 250, 250, 250],
              lightColor: '#FF231F7C',
            });
          }}
     
    getPermission();

    //listener qui font marcher expo notif
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return null;

}

export default Notif