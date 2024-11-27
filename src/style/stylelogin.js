import { StyleSheet } from 'react-native';

const loginstyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    width: 150,
    height: 150,
    marginBottom: 40,
    resizeMode: 'contain',
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
  footer: {
    marginTop: 10, 
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center', 
  },
<<<<<<< HEAD
  secondaryButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '55%',
    paddingHorizontal: 30, 
    paddingVertical: 5,   
=======
  TransparentButtonContainer: {
    alignItems: 'center', 
    justifyContent: 'center', 
    width: '100%', 
    paddingVertical: 5, 
>>>>>>> 74b946e (refactor: update styles and reorganize folder structure)
  },
});

export default loginstyle;
