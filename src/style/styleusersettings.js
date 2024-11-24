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
    bottom: 50, 
  },
});

export default styles;
