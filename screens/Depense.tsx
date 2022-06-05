import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Menu from '../components/Menu';
import {NativeStackScreenProps} from '@react-navigation/native-stack';




const DepenseScreen = () => {
  return (
  <View style={styles.container}>
      <Text style={styles.screenTitle}>Gestion des dépenses</Text>

      <Text>Paul doit 16 euros</Text>
      <TouchableOpacity><Text>Ajouter une dépense</Text></TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginTop: 24,
    },
    screenTitle: {
        fontSize: 24,
        marginTop: 8,
        fontWeight: 'bold',
    }
})

export default DepenseScreen;