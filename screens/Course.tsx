import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { RootStackParams } from '../App';
import CourseCard from '../components/CourseCard';
import TopBackNavigation from '../components/TopBackNavigation';

type Props = NativeStackScreenProps<RootStackParams, 'Course'>;

const CourseScreen = ({ route, navigation }: Props) => {
  return (
    <View style={styles.container}>
        <TopBackNavigation />
        <Text style={styles.screenTitle}>{route.params.name}</Text>
        <Text> Related restaurants</Text>
        <CourseCard name = "Liste de Course 1" onPress={() => {navigation.push("Course", { name: "Liste de Course 1"})} }/>
        <CourseCard name = "Liste de Course 2"onPress={() => {navigation.push("Course", { name: "Liste de Course 2"})} }/>
        <CourseCard name = "Liste de Course 3"onPress={() => {navigation.push("Course", { name: "Liste de Course 3"})} }/>
        <CourseCard name = "Liste de Course 4"onPress={() => {navigation.push("Course", { name: "Liste de Course 4"})} }/>
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
  },
});

export default CourseScreen;