import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from '../components/Card';
import styles from '../style/styleuser';
import FooterNavigation from '../components/FooterNavigation';

const UserScreen = () => {
  const navigation = useNavigation();

  
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      username: 'Maria Souza',
      image: require('../../assets/icons/capsula.png'),
      bio: '33 anos, mãe, esposa e empresária. A dedicação é essencial.',
      medications: ['Quetiapina', 'Sertralina', 'Omeprazol', 'Microvlar'],
    },
    {
      id: 2,
      username: 'João Pereira',
      image: require('../../assets/icons/capsula.png'),
      bio: '12 anos, estudante atípico. Neurodivergente em tratamento das comorbidades.',
      medications: ['Aripiprazol', 'Lítio', 'Ziprasidona'],
    },
  ]);

  // Estado para controlar a visibilidade do modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  // Função para abrir o modal e preencher com as informações do perfil
  const openModal = (profile) => {
    setSelectedProfile(profile);
    setModalVisible(true);
  };

  // Função para editar o perfil
  const handleEditProfile = () => {
    const updatedProfiles = profiles.map((profile) =>
      profile.id === selectedProfile.id ? selectedProfile : profile
    );
    setProfiles(updatedProfiles);
    setModalVisible(false);
  };

  // Função para excluir o perfil
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
        {profiles.map((profile) => (
          <View style={styles.cardSpacing} key={profile.id}>
            <Card>
              <TouchableOpacity onPress={() => openModal(profile)}>
                <View style={styles.cardContent}>
                  <View style={styles.iconContainer}>
                    <Image style={styles.profileImage} source={profile.image} />
                    <Text style={styles.usernameText}>{profile.username}</Text>
                  </View>
                  <Text style={styles.bioText}>{profile.bio}</Text>
                </View>
                <View style={styles.medicationContainer}>
                  {profile.medications.map((medication, index) => (
                    <Text style={styles.medicationText} key={index}>
                      {medication}
                    </Text>
                  ))}
                </View>
              </TouchableOpacity>
            </Card>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddUser')}
      >
        <Text style={styles.addButtonText}>Adicionar perfil</Text>
      </TouchableOpacity>

      <FooterNavigation />

      {/* Modal para editar ou excluir o perfil */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Botão X para excluir */}
            <TouchableOpacity onPress={handleDeleteProfile} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Editar Perfil</Text>

            <TextInput
              style={styles.textInput}
              value={selectedProfile?.username}
              onChangeText={(text) => setSelectedProfile({ ...selectedProfile, username: text })}
              placeholder="Nome de usuário"
            />

            <TextInput
              style={styles.textInput}
              value={selectedProfile?.bio}
              onChangeText={(text) => setSelectedProfile({ ...selectedProfile, bio: text })}
              placeholder="Edit Bio"
            />

            <Text style={styles.medicationLabel}>Medicações:</Text>
            {selectedProfile?.medications.map((medication, index) => (
              <TextInput
                key={index}
                style={styles.textInput}
                value={medication}
                onChangeText={(text) => {
                  const updatedMedications = [...selectedProfile.medications];
                  updatedMedications[index] = text;
                  setSelectedProfile({ ...selectedProfile, medications: updatedMedications });
                }}
                placeholder={`Medicação ${index + 1}`}
              />
            ))}

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
