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

  useEffect(() => {
    const checkSession = async () => {
      const {data, error} = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
        return;
      }
      setIsLoggedIn(true);
    };

    checkSession();
  }, []);
  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <AuthStack.Navigator initialRouteName="Sign up">
          <AuthStack.Screen name="Sign up">
            {props => <Signup {...props} setIsLoggedIn={setIsLoggedIn} />}
          </AuthStack.Screen>
          <AuthStack.Screen name="Login">
            {props => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
          </AuthStack.Screen>
        </AuthStack.Navigator>
      ) : (
        <AppStack.Navigator initialRouteName="Dashboard">
          <AppStack.Screen name="Dashboard">
            {props => <Dashboard {...props} setIsLoggedIn={setIsLoggedIn} />}
          </AppStack.Screen>
        </AppStack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
