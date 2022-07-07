import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TacheCard from '../components/TacheCard';
import { ScrollView } from 'react-native-gesture-handler';
import { auth, db } from '../firebase-config';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { UserContext } from '../Context/userContextFile';



//props est toute les tasks + clcID
 const MesTask = (props) => {
  //check quelles taches corespont a luser
  const [user, setUser] = useContext(UserContext);
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

  //Permet d'afficher ou non le bouton bleu sur ta derniere tache a faire


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
    await updateDoc(doc(db, "Colocs/" + props.clcID + "/Taches/" + id), {concerned: newConcerned, date: doneDate})
  }
  //rendu des taches corespondant a luser partie a opti mais ca me clc
  const renderConcernedTasks = () => {
     const tasks = checkTasks().isIn;
      return(
        tasks.map(t => {
          return(
            
         
            <TacheCard Tache = {t.data().desc} key = {t.id} id = {t.id} />
          )
          
        })
        
      )
  }
  const renderNextUpTasks = () => {
    const tasks = checkTasks().toDo;
     return(
       tasks.map(t => {
         return(
           
           <TacheCard Tache = {t.data().desc} key = {t.id} displayButton = {true} clcID={props.clcID} id={t.id}/>
           
         )
         
       })
       
     )
 }
  
  return (
   
    <View style={{flex: 1, marginTop: 5}}>
    <ScrollView showsVerticalScrollIndicator={false}>
    <Text style={styles.Categorie}>Ta prochaine tache</Text>
    {renderNextUpTasks()}
    <Text style={styles.Categorie}>Toute tes tâches</Text>
    {renderConcernedTasks()}

  </ScrollView>

      </View>
  );
};

const styles = StyleSheet.create({
    Categorie:{
      fontSize: 19,
      fontWeight: 'bold',
      marginBottom: 10,
    },

    Button: {
      backgroundColor: 'blue',
     
      
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
  
    confirmer: {
      color: 'white',
      fontSize: 13,
      textAlign: 'center',
      padding: 5
    }
    

})

export default MesTask;