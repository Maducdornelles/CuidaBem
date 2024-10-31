import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const InputComponent = ({ placeholder, secureTextEntry, keyboardType }) => {
  return (
    <TextInput 
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#000"
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: 312,
    height: 47,
    backgroundColor: '#F3F3F3',
    borderRadius: 100, 
    paddingHorizontal: 20,
    marginVertical: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    color: '#000',
  },
});

export default InputComponent;
