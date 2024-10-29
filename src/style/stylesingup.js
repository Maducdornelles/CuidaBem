import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20, 
  },
  icon: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  input: {
    width: 312,
    height: 47,
    backgroundColor: '#F3F3F3',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginVertical: 7, 
    fontFamily: 'System',
    color: '#000',
  },
  switchContainer: { 
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10, 
  },
  switch: { // Estilo para o switch, se necessário
    marginRight: 10,
  },
  switchLabelText: { // Estilo para o texto do switch
    color: '#000',
    fontFamily: 'System',
    fontSize: 14,
  },
  createButton: {
    width: 286,
    height: 45,
    backgroundColor: '#62A4B0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  createButtonText: {
    color: '#FFF',
    fontFamily: 'System',
    fontSize: 16,
  },
  loginButton: {
    width: 286,
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#62A4B0',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#62A4B0',
    fontFamily: 'System',
    fontSize: 16,
  },
});

export default styles;
