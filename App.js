import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import LoginScreen from './src/pages/LoginScreen';
import SignUpScreen from './src/pages/SignUpScreen';
import HomeScreen from './src/pages/HomeScreen';
import SettingScreen from './src/pages/SettingScreen';
import UserSettings from './src/pages/UserSettings';
import UserScreen from './src/pages/UserScreen';
import AddUserScreen from './src/pages/AddUserScreen';
import AddMedScreen from './src/pages/AddMedScreen';
import MapScreen from './src/pages/MapScreen';
import NotificationScreen from './src/pages/NotificationScreen';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >

        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />


        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen name="Setting" component={SettingScreen} />
        <Stack.Screen name="UserSettings" component={UserSettings} />

        <Stack.Screen name="UserScreen" component={UserScreen} />
        <Stack.Screen name="AddUserScreen" component={AddUserScreen} />


        <Stack.Screen name="MapScreen" component={MapScreen} />


        <Stack.Screen name="NotificationScreen" component={NotificationScreen} />


        <Stack.Screen name="AddMedScreen" component={AddMedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
