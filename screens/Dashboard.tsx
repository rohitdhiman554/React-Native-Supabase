import {View, Text, Alert} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import {supabase} from '../lib/supabase';

interface DashboardProps {
  setIsLoggedIn: (e: boolean) => void;
}

export default function Dashboard({setIsLoggedIn}: DashboardProps) {
  async function handleLogout() {
    const {error} = await supabase.auth.signOut();

    if (error) {
      Alert.alert(error.message);
      return;
    }
    setIsLoggedIn(false);
  }
  return (
    <View>
      <Text>Dashboard</Text>
      <Button onPress={handleLogout}>Log out</Button>
    </View>
  );
}
