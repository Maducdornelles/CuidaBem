import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons, Feather } from '@expo/vector-icons';
import styles from '../style/stylemap';

const MapScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

  const pharmacies = [
    {
      name: 'Farmácia São João - São Cristóvão',
      coordinate: { latitude: -28.2629, longitude: -52.4064 },
      rating: 4.5,
      address: 'Avenida Presidente Vargas, 1020',
      cep: '99070-000',
      phone: '(54) 3317-7070',
    },
    {
      name: 'Farmácia Popular',
      coordinate: { latitude: -28.2635, longitude: -52.4080 },
      rating: 4.0,
      address: 'Rua XV de Novembro, 500',
      cep: '99070-100',
      phone: '(54) 3311-1155',
    },
    {
      name: 'Farmácia Droga Raia',
      coordinate: { latitude: -28.2605, longitude: -52.4020 },
      rating: 4.3,
      address: 'Rua dos Andradas, 1100',
      cep: '99010-000',
      phone: '(54) 3317-5500',
    },
    {
      name: 'Farmácia São João - Centro',
      coordinate: { latitude: -28.2610, longitude: -52.4015 },
      rating: 4.4,
      address: 'Rua General Osório, 600',
      cep: '99010-100',
      phone: '(54) 3317-7000',
    },
    {
      name: 'Farmácia Panvel',
      coordinate: { latitude: -28.2650, longitude: -52.4100 },
      rating: 4.6,
      address: 'Avenida Brasil, 500',
      cep: '99070-200',
      phone: '(54) 3311-2233',
    },
    {
      name: 'Farmácia São João - Boqueirão',
      coordinate: { latitude: -28.2690, longitude: -52.4100 },
      rating: 4.5,
      address: 'Rua Boqueirão, 300',
      cep: '99071-000',
      phone: '(54) 3311-4455',
    },
    {
      name: 'Farmácia Nacional',
      coordinate: { latitude: -28.2700, longitude: -52.4110 },
      rating: 4.1,
      address: 'Rua Marechal Floriano, 700',
      cep: '99071-100',
      phone: '(54) 3317-7788',
    },
    {
      name: 'Farmácia Lodi',
      coordinate: { latitude: -28.2670, longitude: -52.4050 },
      rating: 4.2,
      address: 'Rua Rio Branco, 400',
      cep: '99070-500',
      phone: '(54) 3317-3322',
    },
    {
      name: 'Farmácia Droga Raia - Bairro Petrópolis',
      coordinate: { latitude: -28.2685, longitude: -52.4095 },
      rating: 4.3,
      address: 'Rua Petropolis, 1000',
      cep: '99070-600',
      phone: '(54) 3317-2255',
    },
    {
      name: 'Farmácia Princesa',
      coordinate: { latitude: -28.2640, longitude: -52.4025 },
      rating: 4.0,
      address: 'Rua João Pessoa, 800',
      cep: '99010-200',
      phone: '(54) 3311-9900',
    },
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    const pharmacy = pharmacies.find((pharmacy) => pharmacy.name.toLowerCase().includes(text.toLowerCase()));
    setSelectedPharmacy(pharmacy || null);
  };

  const clearSearch = () => {
    setSearch('');
    setSelectedPharmacy(null); // Remove a farmácia selecionada ao limpar a pesquisa
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -28.2632,
          longitude: -52.4064,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation
        followsUserLocation
      >
        {/* Se houver farmácia selecionada, exibe apenas o marcador da farmácia pesquisada */}
        {selectedPharmacy ? (
          <Marker
            coordinate={selectedPharmacy.coordinate}
            pinColor="red"
          >
            <Callout>
              <Text>{selectedPharmacy.name}</Text>
            </Callout>
          </Marker>
        ) : (
          // Caso contrário, exibe todos os marcadores das farmácias
          pharmacies.map((pharmacy, index) => (
            <Marker
              key={index}
              coordinate={pharmacy.coordinate}
              pinColor="red"
              onPress={() => setSelectedPharmacy(pharmacy)} // Exibe as informações ao clicar no marcador
            >
              <Callout>
                <Text>{pharmacy.name}</Text>
              </Callout>
            </Marker>
          ))
        )}

        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            pinColor="blue"
          />
        )}
      </MapView>

      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Farmácias..."
          value={search}
          onChangeText={handleSearch}
        />
        {search ? (
          <TouchableOpacity onPress={clearSearch}>
            <Feather name="x" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => handleSearch(search)}>
            <Feather name="search" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>

      {selectedPharmacy && (
        <View style={styles.pharmacyInfo}>
          <Text style={styles.pharmacyName}>{selectedPharmacy.name}</Text>
          <Text>{selectedPharmacy.rating} ★</Text>
          <Text>{selectedPharmacy.address}</Text>
          <Text>CEP: {selectedPharmacy.cep}</Text>
          <Text>Telefone: {selectedPharmacy.phone}</Text>
        </View>
      )}
    </View>
  );
};

export default MapScreen;
