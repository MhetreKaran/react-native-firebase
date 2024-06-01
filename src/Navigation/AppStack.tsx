import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../Components/Login';
import SignUp from '../Components/SignUp';
import Home from '../Components/Home';
import AddFoods from '../Components/AddFoods';


const Stack = createNativeStackNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='SignUp' component={SignUp} />
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='AddFoods' component={AddFoods} />
    </Stack.Navigator>
  )
}

export default AppStack