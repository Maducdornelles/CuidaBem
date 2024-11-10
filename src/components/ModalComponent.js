import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Switch, TouchableWithoutFeedback } from 'react-native';

const ModalComponent = ({ visible, medication, onClose }) => {
  const [isAlarmEnabled, setIsAlarmEnabled] = useState(false);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* Fechar o modal ao tocar fora */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              {/* Informações do medicamento */}
              <Text style={styles.modalTitle}>{medication.name}</Text>
              <Text style={styles.modalDescription}>{medication.description}</Text>
              <Text style={styles.modalDetails}>{medication.details}</Text>

              {/* Switch para Habilitar Alarme */}
              <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Habilitar Alarme</Text>
                <Switch
                  value={isAlarmEnabled}
                  onValueChange={(value) => setIsAlarmEnabled(value)}
                  thumbColor={isAlarmEnabled ? '#00d8c1' : '#f4f3f4'}
                  trackColor={{ false: '#767577', true: '#b8f2ee'  }} 
                />
              </View>

              {/* Horários e Botões centralizados */}
              <View style={styles.centerContent}>
                <Text style={styles.modalDetails}>Horários por dia:</Text>
                <Text style={styles.modalDetails}>✓ 01:00</Text>
                <Text style={styles.modalDetails}>07:00</Text>
                <Text style={styles.modalDetails}>13:00</Text>
                <Text style={styles.modalDetails}>19:00</Text>

                {/* Botão "Adicionar mais" */}
                <TouchableOpacity style={styles.primaryButton}>
                  <Text style={styles.primaryButtonText}>Adicionar mais</Text>
                </TouchableOpacity>

                {/* Botões "Editar" e "Excluir" */}
                <TouchableOpacity style={styles.secondaryButton}>
                  <Text style={styles.secondaryButtonText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryButton}>
                  <Text style={styles.secondaryButtonText}>Excluir</Text>
                </TouchableOpacity>
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    color: '#000',
    marginBottom: 15,
  },
  modalDetails: {
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
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
