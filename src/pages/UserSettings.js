import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputComponent from '../components/InputComponent';
import styles from '../style/styleusersettings';

const UserSettings = ({ navigation, route }) => {
  const { token, profileId } = route.params;

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Função para solicitar permissões e abrir a galeria ou câmera
  const requestPermissionAndLaunch = async (type) => {
    try {
      const permission =
        type === 'camera'
          ? await ImagePicker.requestCameraPermissionsAsync()
          : await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permission.status !== 'granted') {
        Alert.alert('Permissão negada', 'É necessário conceder permissão para continuar.');
        return;
      }

      const result =
        type === 'camera'
          ? await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            })
          : await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });

      if (!result.cancelled) {
        setImage(result.uri);
      }
      setModalVisible(false);
    } catch (error) {
      console.error('Erro ao abrir a câmera ou galeria:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar acessar a câmera ou galeria.');
    }
  };

  // Função para deletar a conta do usuário
  const deleteUser = async () => {
    try {
      const response = await fetch('http://192.168.18.149:8080/auth/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar usuário');
      }

      // Limpeza de dados locais
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('profileId');

      // Exibir mensagem de sucesso e navegar
      Alert.alert('Sucesso', 'Sua conta foi deletada com sucesso.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('SignUp'), // Redirecionar para SignUp
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível deletar sua conta.');
    }
  };

  // Confirmação para deletar a conta
  const handleDeleteAccount = () => {
    Alert.alert(
      'Confirmação',
      'Você deseja realmente deletar sua conta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => deleteUser(),
        },
      ],
      { cancelable: true }
    );
  };

  // Função para fazer logout
  const handleLogout = async () => {
    Alert.alert(
      'Confirmação',
      'Você deseja realmente sair da conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await AsyncStorage.multiRemove(['token', 'profileId']);
              navigation.navigate('Login'); // Redireciona para a tela de login
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível realizar o logout.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  // ComponentDidMount emula comportamento do token e profileId
  useEffect(() => {}, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Configuração de usuário</Text>
        </View>

        <View style={styles.card}>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.cameraContainer}>
            {image ? (
              <Image source={{ uri: image }} style={styles.imagePreview} />
            ) : (
              <FontAwesome name="camera" size={60} color="#60A2AE" />
            )}
          </TouchableOpacity>

          <Text style={styles.label}>Email</Text>
          <InputComponent placeholder="Digite seu email" keyboardType="email-address" width={290} />
          <TouchableOpacity style={styles.changeButton}>
            <Text style={styles.buttonText}>Trocar</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Senha</Text>
          <View style={styles.passwordContainer}>
            <InputComponent
              placeholder="Digite sua senha"
              secureTextEntry={!passwordVisible}
              width={290}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={styles.eyeIcon}
            >
              <Feather name={passwordVisible ? 'eye' : 'eye-off'} size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.changeButton}>
            <Text style={styles.buttonText}>Trocar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDeleteAccount} style={styles.deleteContainer}>
            <Feather name="delete" size={24} color="#000" />
            <Text style={styles.deleteText}>Deletar Conta</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutContainer}>
          <Feather name="log-out" size={54} color="#000" />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomBar}></View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={modalStyles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={modalStyles.modalContent}>
                <Text style={modalStyles.modalTitle}>Escolha uma opção</Text>
                <TouchableOpacity
                  style={modalStyles.modalButton}
                  onPress={() => requestPermissionAndLaunch('camera')}
                >
                  <Text style={modalStyles.modalButtonText}>Câmera</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={modalStyles.modalButton}
                  onPress={() => requestPermissionAndLaunch('gallery')}
                >
                  <Text style={modalStyles.modalButtonText}>Galeria</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  modalButton: {
    backgroundColor: '#60A2AE',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default UserSettings;
