import React, { useState } from 'react';
import { View, Image, Text, Switch, Alert } from 'react-native';
import InputComponent from '../components/InputComponent';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import loginstyle from '../style/stylelogin';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const toggleRememberMe = () => setIsRememberMe((prev) => !prev);

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    console.log('Acessando a conta...');
    navigation.navigate('Home');
  };

  const handleCreateAccount = () => {
    navigation.navigate('SignUp');
  };

  const handleGuestAccess = () => {
    console.log('Entrar sem cadastro...');
    navigation.navigate('Home');
  };

  return (
    <View style={loginstyle.container}>
      <Image 
        source={require('../../assets/icons/icon.png')} 
        style={loginstyle.icon} 
      />

      <InputComponent 
        placeholder="Usuário, E-mail ou Telefone" 
        value={username} 
        onChangeText={setUsername} 
      />
      <InputComponent 
        placeholder="Senha" 
        secureTextEntry={true} 
        value={password} 
        onChangeText={setPassword} 
      />

      <View style={loginstyle.switchContainer}>
        <Switch 
          value={isRememberMe}
          onValueChange={toggleRememberMe}
          style={{ marginRight: 10 }} 
        />
        <Text style={loginstyle.switchLabelText}>Manter-me conectado</Text>
      </View>

      <PrimaryButton 
        title="Acessar" 
        onPress={handleLogin} 
        textStyle={loginstyle.primaryButtonText} 
      />

      <View style={loginstyle.footer}>
        <View style={loginstyle.secondaryButtonsContainer}>
          <SecondaryButton 
            title="Criar conta" 
            onPress={handleCreateAccount} 
            textStyle={loginstyle.secondaryButtonText} 
          />
          <SecondaryButton 
            title="Entrar sem cadastro" 
            onPress={handleGuestAccess} 
            textStyle={loginstyle.secondaryButtonText} 
          />
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
