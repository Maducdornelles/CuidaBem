import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import stylehome from '../style/stylehome'; 
import Card from '../components/Card'; 
import FooterNavigation from '../components/FooterNavigation'; 
import ModalComponent from '../components/ModalComponent'; 

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [medications, setMedications] = useState([
    {
      id: '1',
      name: 'Quetiapina',
      description: '• 25mg\n• Antipsicótico atípico\n• Iniciado à 2m e 10d.',
      details: '• Restam 7 cápsulas.\n• Comprar novamente em 6 dias.',
    },
    {
      id: '2',
      name: 'Paracetamol',
      description: '• 500mg\n• Analgésico\n• Iniciado à 1m e 15d.',
      details: '• Restam 5 comprimidos.\n• Comprar novamente em 3 dias.',
    },
    {
      id: '3',
      name: 'Ibuprofeno',
      description: '• 200mg\n• Anti-inflamatório\n• Iniciado à 3m e 7d.',
      details: '• Restam 10 comprimidos.\n• Comprar novamente em 8 dias.',
    },
    {
      id: '4',
      name: 'Amoxicilina',
      description: '• 500mg\n• Antibiótico\n• Iniciado à 1m e 20d.',
      details: '• Restam 12 cápsulas.\n• Comprar novamente em 5 dias.',
    },
  ]);

  const handleDelete = (id) => {
    // Filtra os medicamentos para remover o medicamento com o id 
    setMedications(prevMedications => prevMedications.filter(med => med.id !== id));
    setModalVisible(false); 
  };

  return (
    <View style={stylehome.container}>
      <View style={{ height: 30 }} />
      <View style={stylehome.header}>
        <Text style={stylehome.headerText}>Medicamentos</Text>
      </View>

      <ScrollView contentContainerStyle={stylehome.scrollContent}>
        {medications.map((medication) => (
          <Card key={medication.id} onPress={() => {
            setSelectedMedication(medication);
            setModalVisible(true);
          }}>
            <View style={stylehome.cardContent}>
              <Image
                source={require('../../assets/icons/capsula.png')}
                style={stylehome.cardImage}
              />
              <View style={stylehome.cardTextContainer}>
                <Text style={stylehome.cardTitle}>{medication.name}</Text>
                <Text style={stylehome.cardDescription}>
                  {medication.description}
                </Text>
              </View>
            </View>

            <Text style={stylehome.cardDetails}>
              • Restam <Text style={stylehome.highlight}>{medication.details.split('• Restam ')[1].split('.')[0]}</Text>.
            </Text>
            <Text style={stylehome.cardDetails}>
              • Comprar novamente em <Text style={stylehome.highlight}>{medication.details.split('Comprar novamente em ')[1].split('.')[0]}</Text>.
            </Text>
          </Card>
        ))}
      </ScrollView>

      <FooterNavigation />

      {selectedMedication && (
        <ModalComponent
          visible={modalVisible}
          medication={selectedMedication}
          onClose={() => setModalVisible(false)}
          navigation={navigation}
          onDelete={handleDelete} 
        />
      )}
    </View>
  );
};

export default HomeScreen;
