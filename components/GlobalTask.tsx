import React, {useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TacheCard from '../components/TacheCard';
import AddTaskBS from './AddTaskBS';
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase-config';
import { Colors, Drawer } from 'react-native-ui-lib';
import ContentLoader, { Rect } from 'react-content-loader/native';

const MyLoader = () => ( 
  <ContentLoader 
  speed={1}
  backgroundColor={'white'}
  foregroundColor={'#DDD'}
  height={210}
  >
  <Rect x="0" y="10" rx="10" ry="10" width="100%" height="60" />
  <Rect x="0" y="80" rx="10" ry="10" width="100%" height="60" />
  <Rect x="0" y="150" rx="10" ry="10" width="100%" height="60" />
  </ContentLoader>)
//props est la colocID, on le récupère ici car 1 appel en moins(appel ds tache obligé)
// Besoin de colocID car Taches est subcollection de Colocs 
//props est userList a passer dnas la bs et dans le popup de tachecard
 const GlobalTask = (props) => {
  // const [allTasks, loading, error] = useCollection(collection(db, "Colocs/"+props.clcID+ "/Taches"));
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "Colocs/"+props.clcID +"/Taches/", id));
  }

const Empty=require('../Img/Empty.png');
//rendu d taches cards
const renderContent = () => {
  if(!(props.tasks ===undefined)){
  if(props.tasks.docs.length > 0){
    return(
      props.tasks.docs.map(t => {
        return( 
          <View style={styles.Card} key = {t.id}>
          <Drawer 
            rightItems={[{text: 'Supprimer', background: Colors.red30, onPress: () => handleDelete(t.id)}]}
            // leftItem={[{text: 'Supprimer', background: Colors.green30, onPress: () => handleDelete(t.id)}]}
            key = {t.id}
            style={{borderRadius: 10}}>
              <TacheCard Tache={t.data().desc} key={t.id} nextOne = {t.data().nextOne} date ={t.data().date} concerned={t.data().concerned} recur={t.data().recur}/>
          </Drawer>
          </View>

        )
  
      })
    )
  }else {
    return(
   <View style={styles.emptypage}>
      <ImageContainer image={Empty} /> 
      <Text style={styles.emptytext}>Oops, il n’y pas encore de {'\n'} tâches à faire</Text>
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

/* SETUP DE LA BOTTOMSHEET MODIFIER */

const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    hideDatePicker();
  };

const Recurrence = [
  { label: 'Aucune', value: '0' },
  { label: '1 jour', value: '1' },
  { label: '2 jours', value: '2' },
  { label: '3 jours', value: '3' },
  { label: '1 semaine', value: '7' },
  { label: '2 semaines', value: '14' },
  { label: '1 mois', value: '28' },
];


/* FIN SETUP DE LA BOTTOMSHEET MODIFIER*/

  return (   
          <View style={{flex: 1}}>

         
      
          <Text style={styles.Categorie}>Toutes les tâches</Text>
          

        <ScrollView showsVerticalScrollIndicator={false}>
          {
            renderContent()
          }
        </ScrollView>
            
        <AddTaskBS clcID={props.clcID} userList={props.userList}/>
            </View>
  );
};

const styles = StyleSheet.create({


    CategorieRecurrente:{
      fontSize: 19,
      fontWeight: 'bold',
    },

    Card: {
      marginBottom: 12,
      elevation: 2,
      shadowColor: 'black',
      shadowOffset: {width: -2, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 3,
      backgroundColor: 'white',
      borderRadius: 10,
      marginLeft: 16,
      marginRight: 16, 
    },

    emptytext: {
      textAlign: 'center',
      color: 'black',
      fontWeight: '600',
      fontSize: 16,
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

    Categorie:{
      fontSize: 19,
      fontWeight: 'bold',
      marginLeft: 16,
      marginRight: 16,
      marginBottom: 12
    },

    emptypage: {
      alignItems: 'center',
    }
})

export default GlobalTask;