import {View, Text, StyleSheet, Alert} from 'react-native';
import React, {useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import {supabase} from '../lib/supabase';

const Login = ({navigation, setIsLoggedIn}: any) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);

    const {data: userExists, error: userExistsError} = await supabase
      .from('auth')
      .select('email')
      .eq('email', email)
      .single();

    if (userExistsError || !userExists) {
      Alert.alert('Error', 'User does not exist');
      setLoading(false);
      return;
    }

    const {error} = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
      return;
    }
    setIsLoggedIn(true);
  }

  return (
    <View style={styles.container}>
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
        onPress={signInWithEmail}>
        Login
      </Button>

      <View style={{alignItems: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text> Doesn't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Sign up')}>
            <Text style={{color: 'blue'}}> Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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

export default Login;
