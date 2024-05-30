import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleSignUp = () => {
    if (email && password && confirmPassword) {
      if (password == confirmPassword) {
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            Alert.alert(`${email} Registered !`);
            navigation.navigate('Login');
          })
          .catch(err => {
            console.log(err.nativeErrorMessage);
            Alert.alert(`${err}`);
          });
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={{alignSelf: 'center', width: '80%'}}>
        <Text style={{alignSelf: 'center',color:'black',fontSize:20}}>Sign Up</Text>
        <TextInput
          value={email}
          onChangeText={e => setEmail(e)}
          placeholder="Enter Email"
        />
        <TextInput
          value={password}
          onChangeText={e => setPassword(e)}
          placeholder="Enter Password"
          secureTextEntry
        />
        <TextInput
          value={confirmPassword}
          onChangeText={e => setConfirmPassword(e)}
          placeholder="Enter Confirm Password"
          secureTextEntry
        />
        <Button onPress={() => handleSignUp()} title="SignUp" />
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
