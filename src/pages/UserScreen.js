import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from '../components/Card';
import styles from '../style/styleuser';
import FooterNavigation from '../components/FooterNavigation';

const UserScreen = () => {
  const navigation = useNavigation(); // Use o hook de navegação

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Perfil</Text>
      </View>

      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>Perfis</Text>
      </View>

      <ScrollView contentContainerStyle={styles.cardContainer}>
        <View style={styles.cardSpacing}> 
          <Card>
            <View style={styles.cardContent}>
              <Image
                style={styles.profileImage} 
                source={require('../../assets/icons/capsula.png')}
              />
              <Text style={styles.bioText}>
                33 anos, mãe, esposa e empresária. A dedicação é essencial.
              </Text>
            </View>
            <View style={styles.medicationContainer}>
              <Text style={styles.medicationText}>Quetiapina</Text>
              <Text style={styles.medicationText}>Sertralina</Text>
              <Text style={styles.medicationText}>Omeprazol</Text>
              <Text style={styles.medicationText}>Microvlar</Text>
            </View>
          </Card>
        </View>

        <View style={styles.cardSpacing}> 
          <Card>
            <View style={styles.cardContent}>
              <Image
                style={styles.profileImage} 
                source={require('../../assets/icons/capsula.png')}
              />
              <Text style={styles.bioText}>
                12 anos, estudante atípico. Neurodivergente em tratamento das comorbidades.
              </Text>
            </View>
            <View style={styles.medicationContainer}>
              <Text style={styles.medicationText}>Aripiprazol</Text>
              <Text style={styles.medicationText}>Lítio</Text>
              <Text style={styles.medicationText}>Ziprasidona</Text>
            </View>
          </Card>
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('AddUserScreen')} // Adicione a navegação
      >
        <Text style={styles.addButtonText}>Adicionar perfil</Text>
      </TouchableOpacity>

      <FooterNavigation />
    </View>
  );
};

export default UserScreen;