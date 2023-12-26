import React from 'react';

import {SafeAreaView, useColorScheme} from 'react-native';

import Signup from './components/Signup';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView>
      <Signup />
    </SafeAreaView>
  );
}

export default App;
