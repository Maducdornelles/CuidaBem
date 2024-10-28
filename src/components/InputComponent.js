import React from 'react';
import { TextInput } from 'react-native';
import styles from '../style/stylesingup'; 

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

export default InputComponent;