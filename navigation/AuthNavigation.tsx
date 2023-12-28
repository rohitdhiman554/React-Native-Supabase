import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Dashboard from '../screens/Dashboard';

interface AuthNavigationProps {
  setIsLoggedIn: (e: boolean) => void;
}

const AuthNavigation = ({setIsLoggedIn}: AuthNavigationProps) => {
  const AuthStack = createNativeStackNavigator();
  return (
    <AuthStack.Navigator initialRouteName="Dashboard">
      <AuthStack.Screen name="Dashboard">
        {props => <Dashboard {...props} setIsLoggedIn={setIsLoggedIn} />}
      </AuthStack.Screen>
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
