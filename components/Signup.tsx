import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {supabase} from '../lib/supabase';
import {TextInput, Button} from 'react-native-paper';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const {error} = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: {session},
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        activeUnderlineColor="black"
        label="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        activeUnderlineColor="black"
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        activeUnderlineColor="black"
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button
        style={{marginTop: 20}}
        buttonColor="white"
        textColor="black"
        mode="outlined"
        loading={loading}
        onPress={() => console.log('Pressed')}>
        Press me
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 200,
    padding: 12,
    gap: 20,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    backgroundColor: 'transparent',
  },
});
