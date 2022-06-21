import React, { useCallback, useEffect, useRef, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { ScrollView } from 'react-native-gesture-handler';
import CourseCard from '../components/CourseCard';
import { RootStackParams } from '../App';
import Top from '../components/HeaderDark';
import AddButton from '../Icons/AddButton.svg';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import AddListCourseBS from '../components/AddListCourseBS';
import AddListeCourseBS from '../components/AddListCourseBS';
import { getDoc, doc  } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
type Props = NativeStackScreenProps<RootStackParams, 'CoursesStack'>;

const CoursesScreen = ({navigation}: Props) => {
  const [username, setUsername] = useState("");
  useEffect( () => {
    const getData = async () => {
      const data = await getDoc(doc(db, "Users", auth.currentUser.uid));
      setUsername(data.data().nom)
    }
    getData();
  }, [])
  return (
   
 <View style={styles.Body}>
    <Top name={username}/>
  
        <Text style={styles.screenTitle}>Listes de Course</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
        
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
    },
})

export default CoursesScreen;