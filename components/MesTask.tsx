import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, SafeAreaView, FlatList } from 'react-native';
import TacheCard from '../components/TacheCard';
import { ScrollView } from 'react-native-gesture-handler';
import Top from '../components/HeaderDark';
import AddTaskBS from './AddTaskBS';
import { auth } from '../firebase-config';
import { render } from 'react-dom';

//props est toute les tasks
 const MesTask = (props) => {
  //check quelles taches corespont a luser
  const checkTasks = () => {
    var res = []
    if(props.tasks){
     if(props.tasks.docs.length > 0 ){
        for(var i =0; i<props.tasks.docs.length; i++){
          if(props.tasks.docs[i].data().concerned.includes(auth.currentUser.uid)){
            res.push(props.tasks.docs[i].data());
          }
        }
     }
    }
    return res;
  }
  //rendu des taches corespondant a luser
  const renderTasks = () => {
     const tasks = checkTasks();
      return(
        tasks.map(t => {
          return(
            <TacheCard Tache = {t.desc} key = {t.desc}/>
          )
        })
      )
  }
  return (
   
    <View style={{flex: 1}}>
          
    <ScrollView showsVerticalScrollIndicator={false}>



    {renderTasks()}

    

  </ScrollView>

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

export default MesTask;