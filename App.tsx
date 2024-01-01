import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Signup from './screens/Signup';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import {supabase} from './lib/supabase';
import useStore from './store';

const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();

function App() {
  const isLoggedIn = useStore(state => state.isLoggedIn);

  useEffect(() => {
    const checkSession = async () => {
      const {data, error} = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
        return;
      }
      data.session
        ? useStore.getState().setIsloggedIn(true)
        : useStore.getState().setIsloggedIn(false);
    };

    checkSession();
  }, []);

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <AuthStack.Navigator initialRouteName="Sign up">
          <AuthStack.Screen name="Sign up" component={Signup} />
          <AuthStack.Screen name="Login" component={Login} />
        </AuthStack.Navigator>
      ) : (
        <AppStack.Navigator initialRouteName="Dashboard">
          <AppStack.Screen name="Dashboard" component={Dashboard} />
        </AppStack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
