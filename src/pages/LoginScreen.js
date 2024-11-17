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

  useEffect(() => {
    const checkRememberMe = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('user');
        if (savedUser) {
          const { name, password } = JSON.parse(savedUser);
          setname(name);
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
    if (name.trim() === '' || password.trim() === '') {
      Alert.alert('Erro', 'Preencha todos os campos para continuar.');
      return;
    }
  
    console.log('Acessando a conta...');
    
    try {
      const response = await fetch('http://192.168.18.149:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: name,  // Certifique-se de que está enviando "email" e não "name"
          password: password,
        }),
      });
  
      // Verifique se a resposta da API não está vazia
      if (response.ok) {
        const token = await response.json(); 
        navigation.navigate('User', { token: token }); // Passe o token para a tela de perfil
        //console.log(token)
        // Salvar as credenciais no AsyncStorage se "lembrar" estiver ativado
        if (isRememberMe) {
          await AsyncStorage.setItem('user', JSON.stringify({ name, password }));
        } else {
          await AsyncStorage.removeItem('user');
        }
        
        //navigation.navigate('User');
      } else {
        const errorData = await response.text();  // Se o corpo da resposta não for JSON, trate como texto
        Alert.alert('Erro', errorData);
      }
    } catch (error) {
      console.error('Erro ao acessar a API:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar autenticar. Tente novamente.');
    }
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
