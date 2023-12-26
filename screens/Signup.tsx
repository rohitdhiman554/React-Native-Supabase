import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {supabase} from '../lib/supabase';
import {TextInput, Button} from 'react-native-paper';
import {Link} from '@react-navigation/native';

export default function Signup({navigation}: any) {
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
        mode="outlined"
        style={styles.input}
        activeUnderlineColor="black"
        label="Name"
        activeOutlineColor="black"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        mode="outlined"
        style={styles.input}
        activeUnderlineColor="black"
        label="Email"
        activeOutlineColor="black"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        mode="outlined"
        style={styles.input}
        activeUnderlineColor="black"
        label="Password"
        activeOutlineColor="black"
        value={password}
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <Button
        buttonColor="white"
        textColor="black"
        mode="outlined"
        loading={loading}
        onPress={() => console.log('Pressed')}>
        Register
      </Button>
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text> Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{color: 'blue'}}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    padding: 12,
    gap: 20,
    justifyContent: 'center',
    paddingVertical: 20,
  },

  input: {
    backgroundColor: 'transparent',
  },
});
