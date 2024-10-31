// loginstyle.js
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
    marginTop: 10, // Aumenta o espaço entre o PrimaryButton e os SecondaryButtons
    width: '100%',
    alignItems: 'center',
  },
  secondaryButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 30, // Ajuste de padding para os SecondaryButtons ficarem nas bordas
    paddingVertical: 5,   // Espaço vertical entre os SecondaryButtons e o PrimaryButton
  },
});

export default loginstyle;
