import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import InputComponent from '../components/InputComponent';
import styles from '../style/styleadduser';

const AddUserScreen = ({ route, navigation }) => {
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [imageModalVisible, setImageModalVisible] = useState(false);

  const { token } = route.params || {}; // Recebe o token da rota anterior.

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Precisamos da permissão para acessar a galeria.');
        return;
      }
      setImageModalVisible(true);
    } catch (error) {
      console.error('Erro ao solicitar permissão de galeria:', error);
    }
  };

  const launchGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
      setImageModalVisible(false);
    } catch (error) {
      console.error('Erro ao abrir a galeria:', error);
    }
  };

  const launchCamera = async () => {
    try {
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
      setImageModalVisible(false);
    } catch (error) {
      console.error('Erro ao abrir a câmera:', error);
    }
  };

  const saveProfile = async () => {
    if (username.trim() === '' || bio.trim() === '') {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha o nome de usuário e a bio.');
      return;
    }

    try {
      const response = await fetch('http://10.1.188.98:8080/profiles/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: username,
          bio: bio,
          image: image, // Pode ser convertido para base64 se necessário.
        }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Perfil adicionado com sucesso!');
        navigation.goBack(); // Voltar para a tela anterior após salvar.
      } else {
        const errorMessage = await response.text();
        console.error('Erro ao adicionar perfil:', errorMessage);
        Alert.alert('Erro', `Erro ao adicionar perfil: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      Alert.alert('Erro', 'Não foi possível salvar o perfil.');
    }
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
          <Text style={styles.headerText}>Adicionar perfil</Text>
        </View>

        <View style={styles.card}>
          <TouchableOpacity onPress={pickImage} style={styles.cameraContainer}>
            {image ? (
              <Image source={{ uri: image }} style={styles.imagePreview} />
            ) : (
              <FontAwesome name="camera" size={60} color="#60A2AE" />
            )}
          </TouchableOpacity>

          <InputComponent
            value={username}
            onChangeText={setUsername}
            placeholder="Nome de usuário"
            width={300}
            height={47}
            marginVertical={10}
          />

          <InputComponent
            value={bio}
            onChangeText={setBio}
            placeholder="Bio..."
            width={300}
            height={100}
            marginVertical={10}
            multiline
            textAlignVertical="top"
          />

          <TouchableOpacity onPress={saveProfile} style={styles.addButton}>
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>

        {/* Modal para selecionar imagem */}
        <Modal visible={imageModalVisible} transparent>
          <TouchableWithoutFeedback onPress={() => setImageModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Escolher uma opção</Text>
                <TouchableOpacity onPress={launchGallery} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Escolher da galeria</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={launchCamera} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Tirar foto</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddUserScreen;
