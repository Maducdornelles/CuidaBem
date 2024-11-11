import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importações das telas
import LoginScreen from './src/pages/LoginScreen';
import SignUpScreen from './src/pages/SignUpScreen';
import HomeScreen from './src/pages/HomeScreen';
import SettingScreen from './src/pages/SettingScreen';
import UserSettings from './src/pages/UserSettings';
import UserScreen from './src/pages/UserScreen';
import AddUserScreen from './src/pages/AddUserScreen';
import MapScreen from './src/pages/MapScreen';
import NotificationScreen from './src/pages/NotificationScreen'; // Importação ajustada

// Criação do Stack Navigator
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }} // Esconde o header globalmente
      >
        {/* Rotas de Autenticação */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />

        {/* Rotas principais */}
        <Stack.Screen name="Home" component={HomeScreen} />

        {/* Rotas de Configuração */}
        <Stack.Screen name="Setting" component={SettingScreen} />
        <Stack.Screen name="UserSettings" component={UserSettings} />

        {/* Rotas de Usuário */}
        <Stack.Screen name="UserScreen" component={UserScreen} />
        <Stack.Screen name="AddUserScreen" component={AddUserScreen} />

        {/* Rota de Notificação */}
        <Stack.Screen name="NotificationScreen" component={NotificationScreen} />

        {/* Rota de Mapa */}
        <Stack.Screen name="MapScreen" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
