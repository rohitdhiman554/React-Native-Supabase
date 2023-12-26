import React from 'react';

import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  useColorScheme,
} from 'react-native';

import Signup from './components/Signup';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView>
      <StatusBar />
      <Signup />
    </SafeAreaView>
  );
}

export default App;
