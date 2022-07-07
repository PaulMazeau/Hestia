import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, SafeAreaView, FlatList } from 'react-native';
import TacheCard from '../components/TacheCard';
import { ScrollView } from 'react-native-gesture-handler';
import Top from '../components/HeaderDark';
import AddTaskBS from './AddTaskBS';
import { auth, db } from '../firebase-config';
import { render } from 'react-dom';
import { Colors, Drawer } from 'react-native-ui-lib';
import { updateDoc, doc, getDoc } from 'firebase/firestore';

//props est toute les tasks + clcID
 const MesTask = (props) => {
  //check quelles taches corespont a luser
  const checkTasks = () => {
    var isIn = []
    var toDo = []
    if(props.tasks){
     if(props.tasks.docs.length > 0 ){
        for(var i =0; i<props.tasks.docs.length; i++){
          if(props.tasks.docs[i].data().concerned.includes(auth.currentUser.uid)){
            isIn.push(props.tasks.docs[i]);
            if(props.tasks.docs[i].data().concerned[0] == auth.currentUser.uid){
              toDo.push(props.tasks.docs[i])
            }
          }
        }
     }
    }
    return {isIn, toDo};
  }

  //concerned est l'array des gens qui sont concerné par la tache, l'odre de cet array détermine lordre de faisage de la tache
  //qd 1 mec fait une tache, on le place dc a la fin de cet array
  //calcule aussi la prochaine date ou la tâche doit être effectuée
  const handleDone = async (id) => {
    const data = await getDoc(doc(db, "Colocs/" + props.clcID + "/Taches/" + id))
    const justDid = data.data().concerned[0]
    const newConcerned = data.data().concerned
    newConcerned.splice(0, 1);
    newConcerned.push(justDid)
    const doneDate = data.data().date.toDate();
    const recur = data.data().recur
    doneDate.setDate(doneDate.getDate() + Number(recur))
    //next one utile pr dans Acceuil qd on ve get la prochaine tache du frérot
    await updateDoc(doc(db, "Colocs/" + props.clcID + "/Taches/" + id), {concerned: newConcerned, date: doneDate, nextOne: newConcerned[0]})
  }
  //rendu des taches corespondant a luser partie a opti mais ca me clc
  const renderConcernedTasks = () => {
     const tasks = checkTasks().isIn;
      return(
        tasks.map(t => {
          return(
            
         
            <TacheCard Tache = {t.data().desc} key = {t.id}/>
          )
          
        })
        
      )
  }
  const renderNextUpTasks = () => {
    const tasks = checkTasks().toDo;
     return(
       tasks.map(t => {
         return(
           
           <Drawer 
             rightItems={[{text: 'Done', background: Colors.green30, onPress: () => handleDone(t.id)}]}
             key = {t.id}>
           <TacheCard Tache = {t.data().desc} key = {t.id}/>
           </Drawer>
         )
         
       })
       
     )
 }
  
  return (
   
    <View style={{flex: 1}}>
          
    <ScrollView showsVerticalScrollIndicator={false}>
    <Text>Tu est le prochain à faire ces taches</Text>
    {renderNextUpTasks()}
    <Text>Tu es concerné par ces Taches</Text>
    {renderConcernedTasks()}

    

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