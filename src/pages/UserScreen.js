import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../components/Card';
import styles from '../style/styleuser';
import FooterNavigation from '../components/FooterNavigation';

const UserScreen = ({ route }) => {
  const navigation = useNavigation();
  const { token } = route.params || {};

  const [profiles, setProfiles] = useState([]);

  // Buscar perfis do servidor
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch('http://10.1.188.98:8080/profiles/select', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const enrichedProfiles = data.map((profile) => ({
            ...profile,
            image: require('../../assets/icons/capsula.png'),
            bio: `Perfil de ${profile.name}`,
            medications: profile.medications || [],
          }));
          setProfiles(enrichedProfiles);
        } else {
          const errorMessage = await response.text();
          console.error('Erro ao buscar perfis:', errorMessage);
          Alert.alert('Erro', `Erro ao buscar perfis: ${errorMessage}`);
        }
      } catch (error) {
        console.error('Erro ao buscar perfis:', error);
        Alert.alert('Erro', 'Não foi possível carregar os perfis.');
      }
    };

    if (token) fetchProfiles();
  }, [token]);

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
              <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                  <Image style={styles.profileImage} source={profile.image} />
                  <Text style={styles.usernameText}>{profile.name}</Text>
                </View>
                <Text style={styles.bioText}>{profile.bio}</Text>
              </View>
            </Card>
          </View>
        ))}
      </ScrollView>

      {/* Botão para adicionar perfil */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddUser', { token })}

      >
        <Text style={styles.addButtonText}>Adicionar perfil</Text>
      </TouchableOpacity>

      {/* Botão para editar perfil */}
      <TouchableOpacity
        style={styles.editProfileButton}
        onPress={() => navigation.navigate('EditProfileScreen', { token })}
      >
        <Text style={styles.editProfileButtonText}>Editar perfil</Text>
      </TouchableOpacity>

      <FooterNavigation />
    </View>
  );
};

export default UserScreen;
