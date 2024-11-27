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
  const [image, setImage] = useState(null); // Define o estado da imagem
  const [modalVisible, setModalVisible] = useState(false);

  const getProfileImage = async (userId) => {
    try {
      const response = await fetch(`http://10.1.241.222:8080/auth/${userId}/profile-image`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Active-Profile': profileId,
        },
      });

      if (response.ok) {
        const imageUrl = await response.text();
        setImage(imageUrl);
      } else {
        const errorMessage = await response.text();
        Alert.alert('Erro', `Erro ao carregar a imagem do perfil: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Erro ao buscar a imagem do perfil:', error);
      Alert.alert('Erro', 'Não foi possível carregar a imagem do perfil.');
    }
  };

  useEffect(() => {
    const fetchUserProfileImage = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        await getProfileImage(userId);
      }
    };

    fetchUserProfileImage();
  }, [token]);

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

  

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch('http://10.1.241.222:8080/auth/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'Active-Profile': profileId,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar usuário');
      }

      const result = await response.json();
      Alert.alert('Sucesso', 'Usuário deletado com sucesso.');
      navigation.navigate('Login'); // Redireciona para a tela de login após excluir o usuário
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

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
              navigation.navigate('Login');
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível realizar o logout.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

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
          <InputComponent placeholder="carlos@gmail.com" keyboardType="email-address" width={290} />
          

          <Text style={styles.label}>Senha</Text>
          <View style={styles.passwordContainer}>
            <InputComponent
              placeholder="Senha123@"
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
