import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useSession} from './hooks/useSession';
import AuthNavigation from './navigation/AuthNavigation';
import AppNavigation from './navigation/AppNavigation';

function App() {
  const AuthStack = createNativeStackNavigator();
  const AppStack = createNativeStackNavigator();
  const [isLoggedIn, setIsLoggedIn] = useSession();

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <AuthNavigation setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <AppNavigation setIsLoggedIn={setIsLoggedIn} />
      )}
    </NavigationContainer>
  );
}

export default App;
