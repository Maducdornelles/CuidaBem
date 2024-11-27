import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InputComponent from '../components/InputComponent';
import { AntDesign } from 'react-native-vector-icons';
import styles from '../style/styleEditProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'; // Biblioteca para selecionar imagens
import { Platform } from 'react-native';

const handleUploadImage = async () => {
  try {
    // Solicitar permissão para acessar as imagens
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'É necessário permitir o acesso à galeria para continuar.');
      return;
    }

    // Abrir o seletor de imagens
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];

      // Obter token e userId do AsyncStorage
      const token = await AsyncStorage.getItem('token');
      const profileId = await AsyncStorage.getItem('profileId');
      const userId = await AsyncStorage.getItem('userId');

      if (!token || !profileId) {
        Alert.alert('Erro', 'Não foi possível obter as credenciais para upload.');
        return;
      }

      // Criar o objeto FormData
      const formData = new FormData();
      formData.append('file', {
        uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
        type: 'image/jpeg', // Certifique-se de usar o tipo correto
        name: `profile_${profileId}.jpg`,
      });

      // Fazer a requisição de upload
      const response = await fetch(`http://10.1.241.222:8080/auth/${userId}/upload-image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Active-Profile': profileId 
        },
        body: formData, // Enviar o formData diretamente
      });

      if (response.ok) {
        const message = await response.text();
        Alert.alert('Sucesso', message);
      } else {
        const errorMessage = await response.text();
        Alert.alert('Erro', `Falha no upload: ${errorMessage}`);
      }
    }
  } catch (error) {
    console.error('Erro no upload de imagem:', error);
    Alert.alert('Erro', 'Não foi possível carregar a imagem.');
  }
};


const EditProfileScreen = ({ route }) => {
  const { profile } = route.params;
  const navigation = useNavigation();

  const [editedProfile, setEditedProfile] = useState(
    profile || { username: '', bio: '', medications: [], id: null }
  );

  // Função para salvar alterações no perfil
  const handleSave = () => {
    Alert.alert('Sucesso', 'Perfil salvo com sucesso!');
    navigation.goBack();
  };

  // Função para cancelar edições no perfil
  const handleCancel = () => {
    Alert.alert(
      'Cancelar',
      'Tem certeza de que deseja cancelar as alterações?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => navigation.goBack() },
      ]
    );
  };

  // Função para excluir o perfil
  const handleDelete = async () => {
    try {
      // Obtém o token e profileId do AsyncStorage
      const token = await AsyncStorage.getItem('token');
      const profileId = await AsyncStorage.getItem('profileId');
  
      if (!token || !profileId) {
        Alert.alert('Erro', 'Não foi possível localizar as informações do perfil ou autenticação.');
        return;
      }
  
      Alert.alert(
        'Excluir',
        'Tem certeza de que deseja excluir este perfil?',
        [
          { text: 'Não', style: 'cancel' },
          {
            text: 'Sim',
            onPress: async () => {
              try {
                const response = await fetch(`http://10.1.241.222:8080/profiles/delete/${profileId}`, {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                  },
                });
  
                if (response.ok) {
                  Alert.alert('Sucesso', 'Perfil excluído com sucesso!');
                  navigation.goBack(); // Retorna à tela anterior
                } else {
                  const errorMessage = await response.text();
                  Alert.alert('Erro', `Erro ao excluir o perfil: ${errorMessage}`);
                }
              } catch (error) {
                console.error('Erro ao excluir o perfil:', error);
                Alert.alert('Erro', 'Não foi possível excluir o perfil.');
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error('Erro ao acessar informações do AsyncStorage:', error);
      Alert.alert('Erro', 'Falha ao acessar informações locais.');
    }
  };
  
  

  return (
    <View style={styles.container}>
      {/* Cabeçalho com botão de voltar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Editar Perfil</Text>
      </View>

      {/* Card centralizado para edição do perfil */}
      <View style={styles.card}>
        <View style={styles.formContainer}>
          {/* Input para o nome de usuário */}
          <InputComponent
            style={styles.input}
            value={editedProfile.username}
            onChangeText={(text) =>
              setEditedProfile({ ...editedProfile, username: text })
            }
            placeholder="Nome de usuário"
          />

          {/* Input para a bio */}
          <InputComponent
            style={styles.input}
            value={editedProfile.bio}
            onChangeText={(text) =>
              setEditedProfile({ ...editedProfile, bio: text })
            }
            placeholder="Bio"
          />

          <TouchableOpacity style={styles.uploadButton} onPress={handleUploadImage}>
            <Text style={styles.uploadButtonText}>Carregar Imagem</Text>
          </TouchableOpacity>


          {/* Botões de ação */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Botão Excluir Perfil fora do card */}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Excluir Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfileScreen;
