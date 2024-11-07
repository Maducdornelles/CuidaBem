import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import Card from '../components/Card';
import stylehome from '../style/stylehome';
import FooterNavigation from '../components/FooterNavigation';

const HomeScreen = () => {
  return (
    <View style={stylehome.container}>
      <View style={{ height: 30 }} />
      <View style={stylehome.header}>
        <Text style={stylehome.headerText}>Medicamentos</Text>
      </View>

      <ScrollView contentContainerStyle={stylehome.scrollContent}>
        
        <View style={stylehome.cardSpacing}>
          <Card>
            <View style={stylehome.cardContent}>
              <Image source={require('../../assets/icons/capsula.png')} style={stylehome.cardImage} />
              <View style={stylehome.cardTextContainer}>
                <Text style={stylehome.cardTitle}>Quetiapina</Text>
                <Text style={stylehome.cardDescription}>• 25mg</Text>
                <Text style={stylehome.cardDescription}>• Antipsicótico atípico</Text>
                <Text style={stylehome.cardDescription}>• Iniciado à 2m e 10d.</Text>
              </View>
            </View>
            <Text style={stylehome.cardDetails}>
              • Restam <Text style={stylehome.highlight}>7 cápsulas</Text>.
            </Text>
            <Text style={stylehome.cardDetails}>
              Comprar novamente em <Text style={stylehome.highlight}>6 dias</Text>.
            </Text>
          </Card>
        </View>

     
        <View style={stylehome.cardSpacing}>
          <Card>
            <View style={stylehome.cardContent}>
              <Image source={require('../../assets/icons/capsula.png')} style={stylehome.cardImage} />
              <View style={stylehome.cardTextContainer}>
                <Text style={stylehome.cardTitle}>Paracetamol</Text>
                <Text style={stylehome.cardDescription}>• 500mg</Text>
                <Text style={stylehome.cardDescription}>• Analgésico</Text>
                <Text style={stylehome.cardDescription}>• Iniciado à 1m e 15d.</Text>
              </View>
            </View>
            <Text style={stylehome.cardDetails}>
              • Restam <Text style={stylehome.highlight}>5 comprimidos</Text>.
            </Text>
            <Text style={stylehome.cardDetails}>
              Comprar novamente em <Text style={stylehome.highlight}>3 dias</Text>.
            </Text>
          </Card>
        </View>

      
        <View style={stylehome.cardSpacing}>
          <Card>
            <View style={stylehome.cardContent}>
              <Image source={require('../../assets/icons/capsula.png')} style={stylehome.cardImage} />
              <View style={stylehome.cardTextContainer}>
                <Text style={stylehome.cardTitle}>Ibuprofeno</Text>
                <Text style={stylehome.cardDescription}>• 200mg</Text>
                <Text style={stylehome.cardDescription}>• Anti-inflamatório</Text>
                <Text style={stylehome.cardDescription}>• Iniciado à 3m e 7d.</Text>
              </View>
            </View>
            <Text style={stylehome.cardDetails}>
              • Restam <Text style={stylehome.highlight}>10 comprimidos</Text>.
            </Text>
            <Text style={stylehome.cardDetails}>
              Comprar novamente em <Text style={stylehome.highlight}>8 dias</Text>.
            </Text>
          </Card>
        </View>

      
        <View style={stylehome.cardSpacing}>
          <Card>
            <View style={stylehome.cardContent}>
              <Image source={require('../../assets/icons/capsula.png')} style={stylehome.cardImage} />
              <View style={stylehome.cardTextContainer}>
                <Text style={stylehome.cardTitle}>Amoxicilina</Text>
                <Text style={stylehome.cardDescription}>• 500mg</Text>
                <Text style={stylehome.cardDescription}>• Antibiótico</Text>
                <Text style={stylehome.cardDescription}>• Iniciado à 1m e 20d.</Text>
              </View>
            </View>
            <Text style={stylehome.cardDetails}>
              • Restam <Text style={stylehome.highlight}>12 cápsulas</Text>.
            </Text>
            <Text style={stylehome.cardDetails}>
              Comprar novamente em <Text style={stylehome.highlight}>5 dias</Text>.
            </Text>
          </Card>
        </View>
      </ScrollView>

      <FooterNavigation />
    </View>
  );
};

export default HomeScreen;
