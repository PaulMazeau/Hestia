import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { ScrollView } from 'react-native-gesture-handler';
import CourseCard from '../components/CourseCard';
import { RootStackParams } from '../App';


type Props = NativeStackScreenProps<RootStackParams, 'CoursesStack'>;

const CoursesScreen = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
        <Text style={styles.screenTitle}>Listes de Course</Text>
        <ScrollView>
            <CourseCard name="Liste de Course 1" onPress={name => navigation.navigate('Course', {name})}/>
            <CourseCard name="Liste de Course 2" onPress={name => navigation.navigate('Course', {name})}/>
            <CourseCard name="Liste de Course 3" onPress={name => navigation.navigate('Course', {name})}/>
            <CourseCard name="Liste de Course 4" onPress={name => navigation.navigate('Course', {name})}/>
            <CourseCard name="Liste de Course 5" onPress={name => navigation.navigate('Course', {name})}/>
            <CourseCard name="Liste de Course 6" onPress={name => navigation.navigate('Course', {name})}/>
        </ScrollView>
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

export default CoursesScreen;