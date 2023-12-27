import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Signup from './screens/Signup';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import {supabase} from './lib/supabase';

function App(): React.JSX.Element {
  const AuthStack = createNativeStackNavigator();
  const AppStack = createNativeStackNavigator();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLogout = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const checkSession = async () => {
      const {data, error} = await supabase.auth.getSession();
      console.log('data', data);
      if (error) {
        // Handle the error
        console.error('Error fetching session:', error);
        return;
      }
      setIsLoggedIn(true);
      // Additional logic if needed
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
          <AppStack.Screen name="Dashboard">
            {props => <Dashboard {...props} onLogout={onLogout} />}
          </AppStack.Screen>
        </AppStack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
