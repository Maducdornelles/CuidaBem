import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const TransparentButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 286,
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#62A4B0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: '#62A4B0',
    fontSize: 14,
    fontFamily: 'System',
  },
});

export default TransparentButton;
