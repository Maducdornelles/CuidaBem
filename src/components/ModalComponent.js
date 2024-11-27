import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, Switch, TouchableWithoutFeedback, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useFocusEffect } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModalComponent = ({ visible, medication, onClose, navigation, onDelete, route }) => {
  const [isAlarmEnabled, setIsAlarmEnabled] = useState(false);
  const [alarms, setAlarms] = useState([]);
  const [medicationDetails, setMedicationDetails] = useState(null);
  const [token, setToken] = useState(null);
  const [profileId, setProfileId] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const getTokenAndProfileId = async () => {
        try {
          const storedToken = await AsyncStorage.getItem('token');
          const storedProfileId = await AsyncStorage.getItem('profileId');
          if (storedToken && storedProfileId) {
            setToken(storedToken);
            setProfileId(storedProfileId);
          }
        } catch (error) {
          console.error('Erro ao buscar dados do AsyncStorage:', error);
        }
      };

      // Verifica parâmetros da navegação
      if (route?.params) {
        const { token: navToken, profileId: navProfileId } = route.params;
        setToken(navToken);
        setProfileId(navProfileId);
      } else {
        // Caso não haja parâmetros, busca do AsyncStorage
        getTokenAndProfileId();
      }
    }, [route?.params])
  );

  const fetchMedicationDetails = async (medId) => {
    
    try {
      const response = await fetch(`http://10.1.241.222:8080/medicamento/getbyid/${medId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Active-Profile': profileId, 
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMedicationDetails(data);
      }

    } catch (error) {
      console.error('Erro ao buscar os detalhes do medicamento:', error.message);
      Alert.alert('Erro', 'Não foi possível carregar os detalhes do medicamento.');
    }
  };
  

  useEffect(() => {
    if (visible && medication) {
      fetchMedicationDetails(medication.id); // Usando o id do medicamento
    }
  }, [visible, medication]);

  const toggleAlarm = async (enabled) => {
    setIsAlarmEnabled(enabled);
    if (enabled) {
      try {
        const scheduledAlarms = await scheduleAlarms(new Date(), 6, medication.name);
        setAlarms(scheduledAlarms);
        Alert.alert('Alarme Ativado', 'O alarme foi configurado com sucesso!');
      } catch (error) {
        console.error('Erro ao agendar alarme:', error);
        Alert.alert('Erro', 'Não foi possível configurar o alarme.');
        setIsAlarmEnabled(false);
      }
    } else {
      try {
        await Notifications.cancelAllScheduledNotificationsAsync();
        setAlarms([]);
        Alert.alert('Alarme Desativado', 'Os alarmes foram cancelados com sucesso.');
      } catch (error) {
        console.error('Erro ao cancelar alarmes:', error);
        Alert.alert('Erro', 'Não foi possível cancelar os alarmes.');
      }
    }
  };

  const deleteMedication = async (medId) => {
    try {
      const response = await fetch(`http://10.1.241.222:8080/medicamento/deletebyid/${medId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Active-Profile': profileId,
        },
      });
  
      if (response.ok) {
        Alert.alert('Sucesso', 'Medicamento excluído com sucesso.');
        onClose(); // Fecha o modal após exclusão
      } else {
        Alert.alert('Erro', 'Não foi possível excluir o medicamento.');
      }
    } catch (error) {
      console.error('Erro ao excluir o medicamento:', error.message);
      Alert.alert('Erro', 'Não foi possível excluir o medicamento.');
    }
  };
  

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{medication?.name}</Text>
              <Text style={styles.modalDescription}>{medication?.description}</Text>

              {/* Exibe os detalhes do medicamento se disponíveis */}
                {medicationDetails ? (
                  <>
                    {/* Nome do medicamento */}
                    <Text style={styles.modalDetails}>
                      <Text style={styles.highlight}>{medicationDetails.nome}</Text>
                    </Text>

                    {/* Quantidade */}
                    <Text style={styles.modalDetails}>
                      Quantidade: <Text style={styles.highlight}>{medicationDetails.quantidade}</Text>
                    </Text>

                    {/* Descrição */}
                    <Text style={styles.modalDetails}>
                      Descrição: <Text style={styles.highlight}>{medicationDetails.descricao}</Text>
                    </Text>
                  </>
                ) : (
                  <Text>Carregando detalhes do medicamento...</Text> 
                )}

                {/* Exibe os alarmes */}
                {alarms.length > 0 ? (
                  alarms.map((time, index) => (
                    <Text key={index} style={styles.modalSchedule}>{time}</Text> 
                  ))
                ) : (
                  <Text style={styles.modalSchedule}>Nenhum alarme configurado</Text> 
                )};
                


              <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Habilitar Alarme</Text>
                <Switch
                  value={isAlarmEnabled}
                  onValueChange={toggleAlarm}
                  thumbColor={isAlarmEnabled ? '#00d8c1' : '#f4f3f4'}
                  trackColor={{ false: '#767577', true: '#b8f2ee' }}
                />
              </View>

              <View style={styles.centerContent}>
                <Text style={styles.modalSchedule}>Horários por dia:</Text>
                {alarms.length > 0 ? (
                  alarms.map((time, index) => (
                    <Text key={index} style={styles.modalSchedule}>{time}</Text>
                  ))
                ) : (
                  <Text style={styles.modalSchedule}>Nenhum alarme configurado</Text>
                )}

                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={() => navigation.navigate('AddMedScreen')}
                >
                  <Text style={styles.primaryButtonText}>Adicionar mais</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={() =>
                    Alert.alert(
                      'Confirmar exclusão',
                      'Tem certeza que deseja excluir este medicamento?',
                      [
                        { text: 'Cancelar', style: 'cancel' },
                        { text: 'Excluir', style: 'destructive', onPress: () => deleteMedication(medication.id) },
                      ]
                    )
                  }
                >
                  <Text style={styles.secondaryButtonText}>Excluir</Text>
                </TouchableOpacity>;
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = {
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    color: '#000',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  modalDetails: {
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#C25B8C',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  switchLabel: {
    fontSize: 16,
    color: '#666',
  },
  centerContent: {
    alignItems: 'center',
    marginBottom: 10,
  },
  modalSchedule: {
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
  },
  primaryButton: {
    width: 187,
    height: 45,
    backgroundColor: '#62A4B0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 20,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    width: 187,
    height: 45,
    borderWidth: 1,
    borderColor: '#62A4B0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  secondaryButtonText: {
    color: '#62A4B0',
    fontSize: 16,
    fontWeight: 'bold',
  },
};

export default ModalComponent;
