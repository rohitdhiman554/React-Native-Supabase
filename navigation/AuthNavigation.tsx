import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Dashboard from '../screens/Dashboard';

const AuthNavigation = ({setIsLoggedIn}: any) => {
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
