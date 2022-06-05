import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { RootStackParams } from '../App';
import CourseCard from '../components/CourseCard';

type Props = NativeStackScreenProps<RootStackParams, 'CoursesStack'>;

const TacheScreen = ({navigation}: Props) => {
  return (
  <View style={styles.container}>
      <Text style={styles.screenTitle}>Tâche à faire</Text>

      <CourseCard name="Tache 1" onPress={name => navigation.navigate('Course', {name})}/>
      <CourseCard name="Tache 2" onPress={name => navigation.navigate('Course', {name})}/>
      <CourseCard name="Tache 3" onPress={name => navigation.navigate('Course', {name})}/>
      <CourseCard name="Tache 4" onPress={name => navigation.navigate('Course', {name})}/>
      <CourseCard name="Tache 5" onPress={name => navigation.navigate('Course', {name})}/>

      <TouchableOpacity><Text>Ajouter une Tache</Text></TouchableOpacity>
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

export default TacheScreen;