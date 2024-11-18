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
  const [name, setname] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Para gerenciar o estado de carregamento durante o login
  
  // Verifica se há um token armazenado e redireciona
  useEffect(() => {
    const checkRememberMe = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('');
        if (storedToken != null) {
          console.log('Token encontrado no AsyncStorage:', storedToken);
          // Se o token está armazenado, navegue para o perfil
          navigation.navigate('User', { token: storedToken });
        }
      } catch (error) {
        console.error('Erro ao buscar dados de login:', error);
      }
    };
    checkRememberMe();
  }, [navigation]);
  

  const toggleRememberMe = () => setIsRememberMe((prev) => !prev);

  const handleLogin = async () => {
    if (name.trim() === '' || password.trim() === '') {
      Alert.alert('Erro', 'Preencha todos os campos para continuar.');
      return;
    }
    
    setLoading(true); // Começa o carregamento
    
    try {
      const response = await fetch('http://192.168.220.233:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: name,
          password: password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
  
        // Armazena o token no AsyncStorage
        await AsyncStorage.setItem('token', data.token);

        navigation.navigate('User', { token: data.token});
  
        if (isRememberMe) {
          await AsyncStorage.setItem('user', JSON.stringify({ name, password }));
        } else {
          await AsyncStorage.removeItem('user');
        }
      } else {
        const errorData = await response.text();
        Alert.alert('Erro', errorData);
      }
    } catch (error) {
      console.error('Erro ao acessar a API:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar autenticar. Tente novamente.');
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate('SignUp');
  };

  const handleGuestAccess = () => {
    console.log('Entrar sem cadastro...');
    navigation.navigate('Home');
  };

  const handleLogout = async () => {
    try {
      // Remove os dados do AsyncStorage
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('profileId');
      await AsyncStorage.removeItem('user');
      
      // Redireciona para a tela de login
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao realizar logout:', error);
      Alert.alert('Erro', 'Não foi possível realizar o logout.');
    }
  };
  

  return (
    <View style={loginstyle.container}>
      <Image source={require('../../assets/icons/icon.png')} style={loginstyle.icon} />

      <InputComponent 
        placeholder="Usuário, E-mail ou Telefone" 
        value={name} 
        onChangeText={setname} 
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
        title={loading ? "Acessando..." : "Acessar"} 
        onPress={handleLogin} 
        textStyle={loginstyle.primaryButtonText} 
        disabled={loading} // Desabilita o botão enquanto carrega
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
