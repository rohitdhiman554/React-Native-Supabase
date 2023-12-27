import React, {useState} from 'react';
import bcrypt from 'react-native-bcrypt';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {supabase} from '../lib/supabase';
import {TextInput, Button} from 'react-native-paper';

export default function Signup({navigation}: any) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  function hashPassword(password: string) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          reject(err);
        }
        bcrypt.hash(password, salt as string, (err, hash) => {
          if (err) {
            reject(err);
          }
          resolve(hash);
        });
      });
    });
  }

  async function signUpWithEmail() {
    setLoading(true);

    // Sign up with Supabase Auth
    const {error} = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
      return;
    }

    const hashedPassword = await hashPassword(password);

    const {error: dbError} = await supabase.from('auth').insert({
      fullName: name,
      email: email,
      password: hashedPassword,
    });

    if (dbError) {
      console.error('Error inserting user details:', dbError.message);
      Alert.alert('Error', dbError.message);
    } else {
      console.log('User details inserted successfully');
    }

    setLoading(false);
    navigation.navigate('Dashboard');
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
        onPress={signUpWithEmail}>
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
