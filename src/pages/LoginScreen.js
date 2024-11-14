import React, { useState, useEffect } from 'react';
import { View, Image, Text, Switch, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

  useEffect(() => {
    const checkRememberMe = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('user');
        if (savedUser) {
          const { username, password } = JSON.parse(savedUser);
          setUsername(username);
          setPassword(password);
          navigation.navigate('User'); 
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    checkRememberMe();
  }, []);

  const toggleRememberMe = () => setIsRememberMe((prev) => !prev);

  const handleLogin = async () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Erro', 'Preencha todos os campos para continuar.');
      return;
    }

    console.log('Acessando a conta...');
    
    if (isRememberMe) {
      try {
        await AsyncStorage.setItem('user', JSON.stringify({ username, password }));
      } catch (error) {
        console.error('Erro ao salvar dados do usuário:', error);
      }
    } else {
      await AsyncStorage.removeItem('user'); 
    }

    navigation.navigate('User');
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
        style={{ width: 312, height: 47, marginBottom: 15 }} 
      />
      <InputComponent 
        placeholder="Senha" 
        secureTextEntry={true} 
        value={password} 
        onChangeText={setPassword} 
        style={{ width: 312, height: 47, marginBottom: 9 }} 
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
