import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Switch } from 'react-native';
import { Feather } from 'react-native-vector-icons';
import InputComponent from '../components/InputComponent';
import TransparentButton from '../components/TransparentButton';
import FooterNavigation from '../components/FooterNavigation';
import styles from '../style/styleaddmed';

const AddMedScreen = ({ navigation }) => {
  const [alarmEnabled, setAlarmEnabled] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState('');
  const [openTypeModal, setOpenTypeModal] = useState(false);
  const [selectedType, setSelectedType] = useState('');

  const renderModalContent = (type) => (
    <View style={modalStyles.modalCard}>
      <Text style={modalStyles.modalTitle}>
        {type === 'profile' ? 'Escolha o Perfil' : 'Escolha o Tipo'}
      </Text>
      {type === 'profile' ? (
        <>
          <TouchableOpacity onPress={() => { setSelectedProfile('Perfil 1'); setOpenProfileModal(false); }}>
            <Text style={modalStyles.modalOption}>Perfil 1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setSelectedProfile('Perfil 2'); setOpenProfileModal(false); }}>
            <Text style={modalStyles.modalOption}>Perfil 2</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={() => { setSelectedType('Comprimido'); setOpenTypeModal(false); }}>
            <Text style={modalStyles.modalOption}>Comprimido</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setSelectedType('Ml'); setOpenTypeModal(false); }}>
            <Text style={modalStyles.modalOption}>Ml</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setSelectedType('Gotas'); setOpenTypeModal(false); }}>
            <Text style={modalStyles.modalOption}>Gotas</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setSelectedType('Injeção'); setOpenTypeModal(false); }}>
            <Text style={modalStyles.modalOption}>Injeção</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity
        style={modalStyles.modalButton}
        onPress={() => {
          if (type === 'profile') setSelectedProfile('');
          else setSelectedType('');
          type === 'profile' ? setOpenProfileModal(false) : setOpenTypeModal(false);
        }}
      >
        <Text style={modalStyles.modalButtonText}>Limpar Seleção</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ height: 30 }} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
          <Feather name="x" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Cadastro de Medicamento</Text>
      </View>

      {/* Formulário */}
      <View style={{ marginBottom: 10 }}>
        <InputComponent placeholder="Nome do medicamento" style={styles.input} />
        <InputComponent placeholder="Descrição" multiline={true} style={[styles.input, { height: 80 }]} />
        <InputComponent placeholder="Quantidade" style={styles.input} />

        <Text style={{ color: '#999', marginBottom: 5 ,}}>Perfil</Text>
        <TouchableOpacity
          style={[styles.picker, { width: 312, height: 47, alignSelf: 'center' }]} // Centralizado
          onPress={() => setOpenProfileModal(true)}
        >
          <Text style={{ color: selectedProfile ? '#333' : '#999' }}>
            {selectedProfile || 'Selecione o Perfil'}
          </Text>
          <Feather name="chevron-down" size={20} color="#999" />
        </TouchableOpacity>

        <Text style={{ color: '#999', marginBottom: 5 }}>Tipo</Text>
        <TouchableOpacity
          style={[styles.picker, { width: 312, height: 47, alignSelf: 'center' }]} // Centralizado
          onPress={() => setOpenTypeModal(true)}
        >
          <Text style={{ color: selectedType ? '#333' : '#999' }}>
            {selectedType || 'Selecione o Tipo'}
          </Text>
          <Feather name="chevron-down" size={20} color="#999" />
        </TouchableOpacity>

        {/* Botão Frequência */}
        <TouchableOpacity
          style={styles.frequencyButton}
          onPress={() => {
            console.log('Botão Frequência clicado!');
          }}
        >
          <Text style={styles.buttonText}>Frequência</Text>
          <Feather name="clock" size={20} color="#fff" style={styles.frequencyIcon} />
        </TouchableOpacity>

        {/* Switch Alarme */}
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Habilitar Alarme</Text>
          <Switch value={alarmEnabled} onValueChange={(value) => setAlarmEnabled(value)} />
        </View>

        {/* Botão Cadastrar */}
        <View style={[footerStyles.footer, { marginTop: 10 }]}>
          <View style={footerStyles.secondaryButtonsContainer}>
            <TransparentButton title="Cadastrar" onPress={() => { }} />
          </View>
        </View>
      </View>

      <FooterNavigation />

      {/* Modal para Perfil */}
      <Modal
        transparent
        visible={openProfileModal}
        animationType="fade"
        onRequestClose={() => setOpenProfileModal(false)}
      >
        <View style={modalStyles.modalContainer}>
          {renderModalContent('profile')}
        </View>
      </Modal>

      {/* Modal para Tipo */}
      <Modal
        transparent
        visible={openTypeModal}
        animationType="fade"
        onRequestClose={() => setOpenTypeModal(false)}
      >
        <View style={modalStyles.modalContainer}>
          {renderModalContent('type')}
        </View>
      </Modal>
    </View>
  );
};

const footerStyles = StyleSheet.create({
  footer: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  secondaryButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 5,
  },
});

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalCard: {
    width: 330,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    maxHeight: 400,
    overflow: 'scroll',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalOption: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 5,
  },
  modalButton: {
    backgroundColor: '#60A2AE',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default AddMedScreen;
