import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';


const Menu = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Navbar</Text>
      <TouchableOpacity
        onPress={() => {
          // go to 
        }}>
        <Text style={styles.link}>Accueil</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          // go to 
        }}>
        <Text style={styles.link}>Course</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          // go to 
        }}>
        <Text style={styles.link}>Tache</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          // go to 
        }}>
        <Text style={styles.link}>Depense</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#efefef',
    padding: 16,
    marginTop: 8,
  },
  link: {
    fontSize: 16,
    marginTop: 4,
    color: '#097ade',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
  },
});

export default Menu;