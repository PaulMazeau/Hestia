import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TacheCard from '../components/TacheCard';
import AddTaskBS from './AddTaskBS';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import { collection, getDoc, doc, query, where, getDocs } from 'firebase/firestore'
import { db, auth } from '../firebase-config';
import { render } from 'react-dom';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


//props est la colocID, on le récupère ici car 1 appel en moins(appel ds tache obligé)
// Besoin de colocID car Taches est subcollection de Colocs 

 const GlobalTask = (props) => {
 
const renderContent = () => {
  if(props.clcID){
  const [allTasks] = useCollectionData(collection(db, "Colocs/"+props.clcID+ "/Taches"));
  if(allTasks){
    return(
      allTasks.map(t => {
        console.log(t.id)
        return(
          
          <TacheCard Tache={t.desc} key={t.id}/>
        )
  
      })
    )
  }}
  return (
    <SkeletonPlaceholder
    backgroundColor='rgb(255,255,255,.62)'
    speed= {900}
    >
    <TacheCard Tache='loading....' key='load'/>
    </SkeletonPlaceholder>
  )

}
  return (   
          <View style={{flex: 1}}>
          
          <ScrollView showsVerticalScrollIndicator={false}>
      
        <Text style={styles.CategorieRecurrente}>Récurrente</Text>
        {
          renderContent()
      }


        <Text style={styles.CategoriePeriode}>Cette semaine</Text>
          <TacheCard Tache='jten supplie' key='jts'/>
          <TacheCard Tache='jten supplie'key='jts2'/>
          <TacheCard Tache='jten supplie'key = 'jts3'/>
          <TacheCard Tache='jten supplie' key='jts4'/>
        </ScrollView>
            
        <AddTaskBS/>
            </View>
  );
};

const styles = StyleSheet.create({

    CategoriePeriode:{
      fontSize: 19,
      fontWeight: 'bold',
      marginTop: 24,
    },

    CategorieRecurrente:{
      fontSize: 19,
      fontWeight: 'bold',
    },
    
})

export default GlobalTask;