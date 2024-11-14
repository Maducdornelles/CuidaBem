import React, { useState } from 'react';
import { View, Image, Switch, Text, Alert } from 'react-native';
import InputComponent from '../components/InputComponent';
import PrimaryButton from '../components/PrimaryButton';
import TransparentButton from '../components/TransparentButton';
import styles from '../style/stylesignup';

const SignUpScreen = ({ navigation }) => {
  const [isChecked, setChecked] = useState(false);
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleSwitch = () => setChecked(previousState => !previousState);

  const handleCreateAccount = () => {
    if (!username || !phone || !email || !password || !confirmPassword) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    if (!isChecked) {
      Alert.alert("Erro", "Você precisa aceitar os termos de uso.");
      return;
    }

    console.log('Criar conta pressionado');
    navigation.navigate('Login');
  };

  const navigateToLogin = () => {
    if (!isChecked) {
      Alert.alert("Erro", "Você precisa aceitar os termos de uso.");
      return;
    }
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/icons/icon.png')} 
        style={styles.icon} 
      />
      
      <InputComponent 
        placeholder="Nome de Usuário" 
        value={username} 
        onChangeText={setUsername}
        style={{ marginBottom: 15 }}
        width={312} 
      />
      <InputComponent 
        placeholder="Telefone" 
        keyboardType="phone-pad" 
        value={phone} 
        onChangeText={setPhone}
        style={{ marginBottom: 15 }}
        width={312} 
      />
      <InputComponent 
        placeholder="E-mail" 
        keyboardType="email-address" 
        value={email} 
        onChangeText={setEmail}
        style={{ marginBottom: 15 }}
        width={312} 
      />
      <InputComponent 
        placeholder="Senha" 
        secureTextEntry={true} 
        value={password} 
        onChangeText={setPassword}
        style={{ marginBottom: 15 }}
        width={312} 
      />
      <InputComponent 
        placeholder="Confirme a senha" 
        secureTextEntry={true} 
        value={confirmPassword} 
        onChangeText={setConfirmPassword}
        style={{ marginBottom: 15 }}
        width={312} 
      />
      
      <View style={styles.switchContainer}>
        <Switch 
          value={isChecked} 
          onValueChange={toggleSwitch} 
          style={styles.switch} 
        />
        <Text style={styles.switchLabelText}>Eu aceito os termos de uso</Text>
      </View>
      
      <View style={styles.primaryButtonContainer}>
        <PrimaryButton 
          title="Confirmar" 
          onPress={handleCreateAccount}
        />
      </View>
      
      <View style={styles.transparentButtonContainer}>
        <TransparentButton 
          title="Já tenho uma conta" 
          onPress={navigateToLogin}
        />
      </View>
    </View>
  );
};

export default SignUpScreen;
