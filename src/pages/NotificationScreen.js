import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, Alert, Modal, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from '../style/notificationstyle';

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([
    { time: '13:00', medication: 'Paracetamol', user: 'João', dosage: '50mg', form: 'comprimido' },
    { time: '14:00', medication: 'Vitamina C', user: 'Julia', dosage: '10mg', form: 'comprimido' },
    { time: '01:00', medication: 'Paracetamol', user: 'João', dosage: '50mg', form: 'comprimido' },
  ]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const toggleSwitch = () => setIsEnabled((prev) => !prev);

  const handleDelete = () => {
    setNotifications((prev) => prev.filter((_, i) => i !== selectedIndex));
    setModalVisible(false);
  };

  const handleOpenModal = (index) => {
    setSelectedIndex(index);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Configuração de Notificações</Text>
      </View>

   
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.nextAlarmText}>Próximo Alarme às:</Text>
        {notifications.map((notification, index) => (
          <TouchableOpacity
            key={index}
            style={styles.notificationCard}
            onPress={() => handleOpenModal(index)}
          >
            <Text style={styles.cardText}>
              {`${notification.time} - ${notification.medication} - ${notification.user}\n${notification.dosage} - ${notification.form}`}
            </Text>
          </TouchableOpacity>
        ))}

        
        <View style={styles.switchSection}>
          <Text style={styles.switchText}>Permitir Notificação</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#b8f2ee" }}
            thumbColor={isEnabled ? "#00d8c1" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </ScrollView>

     
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalContent}>
            <Text style={modalStyles.modalTitle}>Escolha uma opção</Text>
            <TouchableOpacity style={modalStyles.modalButton} onPress={handleDelete}>
              <Text style={modalStyles.modalButtonText}>Excluir</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={modalStyles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={modalStyles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
    
  );

};

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  modalButton: {
    backgroundColor: '#60A2AE',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default NotificationScreen;
