import React, { useState } from 'react';
import { View, Image, Text, Switch } from 'react-native';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import styles from '../style/stylelogin';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation(); 
  const [isRememberMe, setIsRememberMe] = useState(false);

  const toggleRememberMe = () => setIsRememberMe((prev) => !prev);

  const handleLogin = () => {
    console.log('Acessando a conta...');
   
    navigation.navigate('SignUp'); // Mude para a tela home
  };

  const handleCreateAccount = () => {
    navigation.navigate('SignUp'); // Navega para a tela de cadastro
  };

  const handleGuestAccess = () => {
    console.log('Entrar sem cadastro...');
  
    navigation.navigate('SignUp'); // Mude para a tela home 
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/icons/icon.png')} 
        style={styles.icon} 
      />

      <InputComponent placeholder="Usuário/ E-mail/ Telefone" />
      <InputComponent placeholder="Senha" secureTextEntry={true} />

      <View style={styles.switchContainer}>
        <Switch 
          value={isRememberMe}
          onValueChange={toggleRememberMe}
        />
        <Text style={styles.switchLabelText}>Manter-me conectado</Text>
      </View>

      <ButtonComponent 
        title="Acessar" 
        buttonStyle={styles.loginButton}
        onPress={handleLogin} 
      />

      <View style={styles.footer}>
        <View style={styles.footerButton}>
          <Text style={styles.footerButtonText} onPress={handleCreateAccount}>
            Criar conta
          </Text>
        </View>
        <View style={styles.footerButton}>
          <Text style={styles.footerButtonText} onPress={handleGuestAccess}>
            Entrar sem cadastro
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
