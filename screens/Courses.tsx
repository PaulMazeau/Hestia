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
import { getDoc, doc, collection  } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';
import { RotateInUpLeft } from 'react-native-reanimated';
type Props = NativeStackScreenProps<RootStackParams, 'CoursesStack'>;

const CoursesScreen = ({route, navigation}: Props) => {

  const [allCourses] = useCollection(collection(db, "Colocs/"+route.params.clcID+ "/Courses"))
  const renderContent = () =>{
  if(allCourses){
    return(
      allCourses.docs.map(c => {
        return(
          
          <CourseCard key= {c.id} name={c.data().Nom} courseID={c.id} clcID = {route.params.clcID} onPress = {(name) => navigation.navigate('Course', {name: name, courseID: c.id, clcID: route.params.clcID, username: route.params.username, clcName: route.params.clcName})}/>
        )
  
      })
    )
    return (
      <Text>Loading........</Text>
    )
  } 

  }
  return (
   
 <View style={styles.Body}>
   < Top  name={route.params.username} clcName={route.params.clcName}/>
  
        <Text style={styles.screenTitle}>Listes de Course</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
        
          {renderContent()}

        </ScrollView>

        <AddListeCourseBS clcID= {route.params.clcID}/>
        
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