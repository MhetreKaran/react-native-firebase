import {Alert, Button, Linking, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import { CommonActions } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    Alert.alert("Success Login")
    
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log("error",error);
      
    }
    
  }

  useEffect(()=>{
    GoogleSignin.configure({
      webClientId: '431633234322-cg30s5g1irqmtn09irl9e2iqpa86br6e.apps.googleusercontent.com',
    });
  },[])
  const handleLogin = () => {
    if(email && password){

        auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
            Alert.alert("Success Logged In")
            setEmail('');
            setPassword('');
            navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [
                    { name: 'Home' },
                  ]
                })
            )
        })
        .catch(err => console.log(err))
    }
  };
  return (
    <View style={styles.container}>
      <View style={{alignSelf: 'center', width: '80%'}}>
        <Text style={{alignSelf: 'center',color:'black',fontSize:20}}>Login</Text>
        <TextInput
          value={email}
          onChangeText={e => setEmail(e)}
          placeholder="Username"
        />
        <TextInput
          secureTextEntry
          value={password}
          onChangeText={e => setPassword(e)}
          placeholder="Password"
        />
        <Button onPress={()=>handleLogin()} title="Login" />
        <Text
          style={{alignSelf: 'flex-end', marginVertical: 8}}
          onPress={() => navigation.navigate('SignUp')}>
          Register User
        </Text>
        <Button onPress={()=>onGoogleButtonPress()} title="Login with google" />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
