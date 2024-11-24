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

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Precisamos da permissão para acessar a galeria.');
      return;
    }

    setModalVisible(true);
  };

  const launchGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
    setModalVisible(false); // Fecha o modal
  };

  const launchCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Precisamos da permissão para acessar a câmera.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
    setModalVisible(false);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('profileId');
      Alert.alert('Logout', 'Você foi desconectado com sucesso.');
      navigation.navigate('Login'); // Redireciona para a tela de login
    } catch (error) {
      console.error('Erro ao realizar logout:', error);
      Alert.alert('Erro', 'Não foi possível realizar o logout.');
    }
  };

  useEffect(() => {}, [token, profileId]);

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
          <TouchableOpacity onPress={pickImage} style={styles.cameraContainer}>
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

          {/* Ícone de Logout */}
          <TouchableOpacity onPress={handleLogout} style={styles.logoutContainer}>
            <Feather name="log-out" size={24} color="#000" />
            <Text style={styles.logoutText}>Sair da Conta</Text>
          </TouchableOpacity>
        </View>
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
                <TouchableOpacity style={modalStyles.modalButton} onPress={launchCamera}>
                  <Text style={modalStyles.modalButtonText}>Câmera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={modalStyles.modalButton} onPress={launchGallery}>
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
