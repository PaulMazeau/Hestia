import React, {  } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { ScrollView } from 'react-native-gesture-handler';
import CourseCard from '../components/CourseCard';
import { RootStackParams } from '../App';
import Top from '../components/HeaderDark';
import AddListeCourseBS from '../components/AddListCourseBS';

type Props = NativeStackScreenProps<RootStackParams, 'CoursesStack'>;


const CoursesScreen = ({navigation}: Props) => {

  return (
   
 <View style={styles.Body} >
    <Top/>
  
        <Text style={styles.screenTitle}>Listes de Course</Text>
        <ScrollView showsVerticalScrollIndicator={false} >
            <CourseCard name="Liste de Course 1" onPress={name => navigation.navigate('Course', {name})}/>
            <CourseCard name="Liste de Course 2" onPress={name => navigation.navigate('Course', {name})}/>
            <CourseCard name="Liste de Course 3" onPress={name => navigation.navigate('Course', {name})}/>
            <CourseCard name="Liste de Course 4" onPress={name => navigation.navigate('Course', {name})}/>
            <CourseCard name="Liste de Course 5" onPress={name => navigation.navigate('Course', {name})}/>
            <CourseCard name="Liste de Course 6" onPress={name => navigation.navigate('Course', {name})}/>
        </ScrollView>

        <AddListeCourseBS/>
        
    </View>
  );
};

const styles = StyleSheet.create({
    screenTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 15,
    },
    
    Body: {
      backgroundColor: '#EDF0FA',
      paddingLeft: 16,
      paddingRight: 16,
      flex: 1,
      overflow:'visible',
      clipToPadding:'false',
      
    },
})

export default CoursesScreen;