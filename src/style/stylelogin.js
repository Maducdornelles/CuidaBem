import { StyleSheet } from 'react-native';

const loginstyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20, // Unificado
  },
  icon: {
    width: 150,
    height: 150,
    marginBottom: 40,
    resizeMode: 'contain',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10, // Unificado
    fontSize: 16,
    fontFamily: 'System',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  switchLabelText: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'System',
  },
  loginButton: {
    width: 286,
    height: 45,
    backgroundColor: '#62A4B0',
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'System',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
    paddingHorizontal: 20,
  },
  footerButton: {
    width: 132,
    height: 45,
    borderRadius: 10,
    borderColor: '#62A4B0',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 7.5,
  },
  footerButtonText: {
    color: '#62A4B0',
    fontSize: 14,
    fontFamily: 'System',
    textAlign: 'center',
  },
});

export default loginstyle;
