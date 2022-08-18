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
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';

const MyLoader = () => ( 
  <ContentLoader 
  speed={1}
  backgroundColor={'white'}
  foregroundColor={'#DDD'}
  height={490}
  >
  <Rect x="0" y="0" rx="10" ry="10" width="100%" height="60" />
  <Rect x="0" y="70" rx="10" ry="10" width="100%" height="60" />
  <Rect x="0" y="140" rx="10" ry="10" width="100%" height="60" />
  <Rect x="0" y="210" rx="10" ry="10" width="100%" height="60" />
  <Rect x="0" y="280" rx="10" ry="10" width="100%" height="60" />
  <Rect x="0" y="350" rx="10" ry="10" width="100%" height="60" />
  <Rect x="0" y="420" rx="10" ry="10" width="100%" height="60" />
  </ContentLoader>)

type Props = NativeStackScreenProps<RootStackParams, 'CoursesStack'>;

const CoursesScreen = ({route, navigation}: Props) => {

  const [user, setUser] = useContext(UserContext)
  const [allCourses, loading] = useCollection(collection(db, "Colocs/"+user.colocID+ "/Courses"))
  const EmptyCourse=require('../Img/EmptyCourse.png');
  const renderContent = () =>{
  
    if (loading) {
      return(
        <View>
          {MyLoader()}
        </View>
      )
    }

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
        <Text style={styles.emptytext}>Oops, il n’y a pas encore de {'\n'} liste de courses</Text>
     </View>
    )  
  }
  
  }

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
      marginLeft: 16,
      marginRight: 16
    },
    
    Body: {
      backgroundColor: '#EDF0FA',
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