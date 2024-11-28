import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from '../../components/Card';
import styles from '../../style/styleuser';
import FooterNavigation from '../../components/FooterNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const UserScreen = ({ route }) => {
  const navigation = useNavigation();
  const { token } = route.params || {}; // Recebe apenas o token

  const [profiles, setProfiles] = useState([]); // Inicializa o estado vazio

  useFocusEffect(
    React.useCallback(() => {
      const fetchProfiles = async () => {
        const apiIp = await AsyncStorage.getItem('apiIp');
        try {
          const response = await fetch('http://' + apiIp + ':8080/profiles/select', {
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
              image: require('../../../assets/icons/Perfil.png'),
              bio: `Perfil de ${profile.name}`,
              medications: [],
            }));
            setProfiles(enrichedProfiles);
          } else {
            const errorMessage = await response.text();
            Alert.alert('Erro', `Erro ao buscar perfis: ${errorMessage}`);
          }
        } catch (error) {
          Alert.alert('Erro', 'Não foi possível carregar os perfis.');
        }
      };
  
      fetchProfiles();
    }, [token])
  );
  

  const selectProfile = async (profileId) => {
    const apiIp = await AsyncStorage.getItem('apiIp');
    try {
      const response = await fetch('http://' + apiIp + ':8080/profiles/select/' + (profileId.toString()), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem('profileId', profileId.toString());
        await AsyncStorage.setItem('name', data.name);

        navigation.navigate('Home', { token, profileId });
      } else {
        const errorMessage = await response.text();
        console.error('Erro ao selecionar o perfil:', errorMessage);
        Alert.alert('Erro', `Erro ao selecionar perfil: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Erro ao selecionar o perfil:', error);
      Alert.alert('Erro', 'Não foi possível selecionar o perfil.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
     
        </TouchableOpacity>
        <Text style={styles.headerText}>Perfil</Text>
      </View>

      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>Perfis</Text>
      </View>

      <ScrollView contentContainerStyle={styles.cardContainer}>
        {profiles.map((profile) => (
          <View style={styles.cardSpacing} key={profile.id}>
            <Card>
              <TouchableOpacity onPress={() => selectProfile(profile.id)}>
                <View style={styles.cardContent}>
                  <View style={styles.iconContainer}>
                    <Image style={styles.profileImage} source={profile.image} />
                    <Text style={styles.usernameText}>{profile.name}</Text>
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
