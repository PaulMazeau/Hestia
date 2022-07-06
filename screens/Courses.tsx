import React, { useContext } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { ScrollView } from 'react-native-gesture-handler';
import CourseCard from '../components/CourseCard';
import { RootStackParams } from '../App';
import Top from '../components/HeaderDark';
import AddListeCourseBS from '../components/AddListCourseBS';
import { collection  } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useCollection } from 'react-firebase-hooks/firestore';
import { UserContext } from '../Context/userContextFile';
type Props = NativeStackScreenProps<RootStackParams, 'CoursesStack'>;

const CoursesScreen = ({route, navigation}: Props) => {
  const [user, setUser] = useContext(UserContext)
  const [allCourses] = useCollection(collection(db, "Colocs/"+user.colocID+ "/Courses"))
  const renderContent = () =>{
  if(allCourses){
    return(
      allCourses.docs.map(c => {
        return(
          
          <CourseCard key= {c.id} name={c.data().Nom} courseID={c.id} clcID = {user.colocID} onPress = {(name) => navigation.navigate('Course', {name: name, courseID: c.id, clcID: user.colocID, username: user.nom, clcName: user.nomColoc})}/>
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
   < Top  name={user.nom} clcName={user.nomColoc} avatar = {user.avatarUrl}/>
  
        <Text style={styles.screenTitle}>Listes de Course</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
        
          {renderContent()}

        </ScrollView>

        <AddListeCourseBS clcID= {user.colocID}/>
        
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