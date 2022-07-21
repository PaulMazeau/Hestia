import React, { useContext, useState } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
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
import ContentLoader, { Circle, Facebook, Rect } from 'react-content-loader/native'

type Props = NativeStackScreenProps<RootStackParams, 'CoursesStack'>;

const CoursesScreen = ({route, navigation}: Props) => {
  
  const MyLoader = () => ( 
  <ContentLoader 
  viewBox="0 0 380 70"
  speed={1}
  backgroundColor={'white'}
  foregroundColor={'#DDD'}
  >

  <Circle cx="30" cy="30" r="30" />
  <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
  <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
  </ContentLoader>)



  const [user, setUser] = useContext(UserContext)
  const [allCourses] = useCollection(collection(db, "Colocs/"+user.colocID+ "/Courses"))
  const EmptyCourse=require('../Img/EmptyCourse.png');
  const renderContent = () =>{
    if(allCourses) {
      if(allCourses.docs.length > 0){
      return(
        allCourses.docs.map(c => {
          return(
            <View style={styles.card} key= {c.id}>
            <CourseCard image={c.data().Image} key= {c.id} name={c.data().Nom} courseID={c.id} clcID = {user.colocID} onPress = {(name) => navigation.navigate('Course', {name: name, courseID: c.id, clcID: user.colocID, username: user.nom, clcName: user.nomColoc})}/>
            </View>
          )
    
        })
      )
      
    } 
  else {
    return (
      <View style={styles.emptypage}>
        <ImageContainer image={EmptyCourse} /> 
        <Text style={styles.emptytext}>Oops, il n’y pas encore de {'\n'} liste de courses</Text>
     </View>
    )  
  }
  
  }
  
  return (
    <View>
    {MyLoader()}
   </View>
  )  
  }

  const ImageContainer = ({image}) => (
    <View style={styles.ImageContainer}>
        <Image source={image} style={styles.Image}/>
    </View>
  );


  return (
   
 <View style={styles.Body}>
   < Top  name={user.nom} clcName={user.nomColoc} avatar = {user.avatarUrl}/>
  
        <Text style={styles.screenTitle}>Listes de Courses</Text>
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
      marginTop: 10,
    },
    
    Body: {
      backgroundColor: '#EDF0FA',
      paddingLeft: 16,
      paddingRight: 16,
      flex: 1,
    },

    card: {
      marginBottom: 12
    },

    ImageContainer: {
      height: 175,
      width: 220,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
  },
  
  Image: {
      height: '100%',
      width: '100%',
      },

  emptytext: {
      textAlign: 'center',
      color: 'black',
      fontWeight: '700',
      fontSize: 16,
      marginTop: 10
  },

      emptypage: {
        alignItems: 'center',
        marginTop: 20
      }
})

export default CoursesScreen;