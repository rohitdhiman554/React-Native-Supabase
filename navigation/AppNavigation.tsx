import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Dashboard from '../screens/Dashboard';

const AppNavigation = ({setIsLoggedIn}: any) => {
  const AppStack = createNativeStackNavigator();

  return (
    <AppStack.Navigator initialRouteName="Dashboard">
      <AppStack.Screen name="Dashboard">
        {props => <Dashboard {...props} setIsLoggedIn={setIsLoggedIn} />}
      </AppStack.Screen>
    </AppStack.Navigator>
  );
};

export default AppNavigation;
