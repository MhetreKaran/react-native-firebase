import { View, Text, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AppStack from './src/Navigation/AppStack'
import messaging from '@react-native-firebase/messaging'

const App = () => {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const getToken =async() =>{
    const token = await messaging().getToken();
    console.log("token",token);
    
  }
  useEffect(()=>{
    requestUserPermission();
    getToken()
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  },[])

  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  )
}

export default App