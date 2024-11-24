import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    width: '100%',
    height: 57,
    backgroundColor: '#60A2AE',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 30,
  },
  headerText: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'System',
  },
  card: {
    width: 316,
    backgroundColor: '#F3F3F3',
    alignSelf: 'center',
    marginTop: 80,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    alignItems: 'flex-start',
  },
  cameraContainer: {
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  imagePreview: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
    fontFamily: 'System',
  },
  changeButton: {
    width: 136,
    height: 41,
    backgroundColor: '#62A4B0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
  bottomBar: {
    width: '100%',
    height: 57,
    backgroundColor: '#afd0d6',
    position: 'absolute',
    bottom: 0,  // Fixa a barra no final da tela
  },
  logoutContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    left: 30, // Alinha o botão à esquerda
    bottom: 70, // Distância da parte inferior (ajustado para visibilidade)
    backgroundColor: 'transparent', // Fundo transparente
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  logoutText: {
    color: '#000', // Cor do texto em preto
    fontSize: 20,
    marginLeft: 10, // Espaço entre o ícone e o texto
  },
});

export default styles;
