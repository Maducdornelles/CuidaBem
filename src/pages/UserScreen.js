import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Card from '../components/Card';
import styles from '../style/styleuser';
import FooterNavigation from '../components/FooterNavigation';

const UserScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { token } = route.params; // Obtenha o token passado pela navegação
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      console.log(token)
      try {
        setLoading(true);
        const response = await fetch('http://192.168.18.149:8080/profiles/select', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Adicione o token no cabeçalho
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfiles(data); // Atualize a lista de perfis com os dados retornados
        } else {
          const errorMessage = await response.text();
          Alert.alert('Erro', `Erro ao buscar perfis: ${errorMessage}`);
        }
      } catch (error) {
        console.error('Erro ao buscar perfis:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao buscar os perfis.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [token]); // Dependência do token

  const openModal = (profile) => {
    setSelectedProfile(profile);
    setModalVisible(true);
  };

  const handleEditProfile = () => {
    const updatedProfiles = profiles.map((profile) =>
      profile.id === selectedProfile.id ? selectedProfile : profile
    );
    setProfiles(updatedProfiles);
    setModalVisible(false);
  };

  const handleDeleteProfile = () => {
    const updatedProfiles = profiles.filter((profile) => profile.id !== selectedProfile.id);
    setProfiles(updatedProfiles);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Perfil</Text>
      </View>

      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>Perfis</Text>
      </View>

      <ScrollView contentContainerStyle={styles.cardContainer}>
        {loading ? (
          <Text>Carregando perfis...</Text>
        ) : (
          profiles.map((profile) => (
            <View style={styles.cardSpacing} key={profile.id}>
              <Card>
                <TouchableOpacity onPress={() => openModal(profile)}>
                  <View style={styles.cardContent}>
                    <View style={styles.iconContainer}>
                      <Text style={styles.usernameText}>{profile.username}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Card>
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddUser')}
      >
        <Text style={styles.addButtonText}>Adicionar perfil</Text>
      </TouchableOpacity>

      <FooterNavigation />

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={handleDeleteProfile} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Editar Perfil</Text>

            <TextInput
              style={styles.textInput}
              value={selectedProfile?.username}
              onChangeText={(text) =>
                setSelectedProfile((prev) => ({ ...prev, username: text }))
              }
              placeholder="Nome de usuário"
            />

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleEditProfile}
            >
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UserScreen;
