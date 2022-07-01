import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, FlatList, KeyboardAvoidingView, Platform} from 'react-native';
import { RootStackParams } from '../App';
import TopBackNavigation from '../components/TopBackNavigation';
import Top from '../components/HeaderDark';
import Food from '../components/Food';
import { ScrollView } from 'react-native-gesture-handler';
import { getDoc, doc, collection, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import AddFood from '../components/AddFood';
import { useHeaderHeight } from '@react-navigation/elements';

type Props = NativeStackScreenProps<RootStackParams, 'Course'>;

//dans la db course: Nom, boisson, fruits, maison, viandes, 
const CourseScreen = ({ route, navigation }: Props) => {
  //data est la liste de course
  const [data, loading, error] = useDocumentData(doc(db, "Colocs/"+route.params.clcID+ "/Courses", route.params.courseID))
  const renderFruits = () => {
    if(data && data.fruits){
      return (
          data.fruits.map((item)=> {
            return(
              <Food key= {item} name = {item} clcID= {route.params.clcID} courseID={route.params.courseID} itemType={"fruits"}></Food>
            )
          })
      )
    }
    return (
      <></>
    )
  }

  const renderViandes = () => {
    if(data && data.viandes){
      return (
          
          data.viandes.map((item)=> {
            return(
              <Food key= {item} name = {item} clcID= {route.params.clcID} courseID={route.params.courseID} itemType={"viandes"}></Food>
            )
          })
      )
    }
    return (
      <></>
    )
  }
  const renderBoissons = () => {
    if(data && data.boisson){
      return (
          
          data.boisson.map((item)=> {
            return(
              <Food key= {item} name = {item} clcID= {route.params.clcID} courseID={route.params.courseID} itemType={"boisson"}></Food>
            )
          })
      )
    }
    return (
      <></>
    )
  }
  const renderMaison = () => {
    if(data && data.maison){
      return (
          
          data.maison.map((item)=> {
            return(
              <Food key= {item} name = {item} clcID= {route.params.clcID} courseID={route.params.courseID} itemType={"maison"}></Food>
            )
          })
      )
    }
    return (
      <></>
    )
  }

  const headerHeight = useHeaderHeight();
  return (
    <View style={styles.container}>
     < Top  name={route.params.username} clcName={route.params.clcName}/>
    
      
      <View style = {styles.Title}>
        <TopBackNavigation/>
        <Text style={styles.screenTitle}>{route.params.name}</Text>
      </View>
      <KeyboardAvoidingView
        keyboardVerticalOffset={headerHeight}
        style={{flex:1}}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingBottom:10}}>
        <View style={styles.whiteBackGround}>
          <Text style={styles.Food_title}>Fruits & Légumes</Text>
          <View style = {styles.separator}></View>
          {renderFruits()}
          <AddFood clcID= {route.params.clcID} courseID={route.params.courseID} itemType={"fruits"}></AddFood>
          
          <Text style={styles.Food_title}>Viandes</Text>
          <View style = {styles.separator}></View>
          {renderViandes()}  
          <AddFood clcID= {route.params.clcID} courseID={route.params.courseID} itemType={"viandes"}></AddFood>
          <Text style={styles.Food_title}>Boissons</Text>
          <View style = {styles.separator}></View>
          {renderBoissons()}
          <AddFood clcID= {route.params.clcID} courseID={route.params.courseID} itemType={"boisson"}></AddFood>
          <Text style={styles.Food_title}>Maison</Text>
          <View style = {styles.separator}></View>
          {renderMaison()}
          <AddFood clcID= {route.params.clcID} courseID={route.params.courseID} itemType={"maison"}></AddFood>
        </View>
        </View>
      </ScrollView>
  </KeyboardAvoidingView>
        
    
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex:1,
    backgroundColor: '#EDF0FA',
    paddingLeft:15,
    paddingRight:15,
  },

  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    
  },

  Title: {
    flexDirection : 'row', 
    marginBottom : 15,
  },

  whiteBackGround:{ 
    backgroundColor:'white',
    borderRadius:10,
    height:'auto',
    paddingLeft:10,
    paddingRight:10,
    paddingBottom: 10
  },

  Food_title: {
    paddingLeft : 10,
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 15
  },

  separator: {
    height : 1,
    width : "100%",
    backgroundColor : "#172ACE",
    marginTop : 10,
    marginBottom : 10,
  },
});

export default CourseScreen;