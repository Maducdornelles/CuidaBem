import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from '../style/stylesingup';

const ButtonComponent = ({ onPress, title, buttonStyle, textStyle }) => {
  return (
    <TouchableOpacity 
      style={[styles.defaultButton, buttonStyle]} 
      onPress={onPress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text> 
    </TouchableOpacity>
  );
};

export default ButtonComponent;
