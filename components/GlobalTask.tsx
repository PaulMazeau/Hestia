import React, { useCallback, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TacheCard from '../components/TacheCard';
import AddTaskBS from './AddTaskBS';
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase-config';
import { Colors, Drawer } from 'react-native-ui-lib';
import BottomSheet, { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { Dropdown } from 'react-native-element-dropdown';
import ParticipantCard from './ParticipantCard';
import * as Haptics from 'expo-haptics';
import Edit from '../Icons/Edit.svg'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';

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

          <ScrollView showsVerticalScrollIndicator={false}>
      
          <Text style={styles.Categorie}>Toutes les tâches</Text>
          {
            renderContent()
          }

      
         
        </ScrollView>
            
        <AddTaskBS clcID={props.clcID} userList={props.userList}/>
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

    Card: {
      marginTop: 12,
    },

    //style de la bottom sheet

    contentContainer: {
      flex: 1,
    },

    Title: {
      textAlign: 'center',
      fontSize: 19,
      fontWeight: '600',
      marginBottom: 10
    },

    subTitle: {
      marginLeft: 16,
      fontSize: 16,
      fontWeight: '500'
    },

    depenseTitle: {
        marginTop: 15
    },
    
    input: {
      height: 44,
      marginTop: 13,
      marginLeft: 13,
      marginRight: 13,
      borderWidth: 1,
      borderColor: '#DDDDDD',
      padding: 10,
      borderRadius: 14,
      fontSize: 16
    },

    groupe: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    dropdownRecurrence: {
      marginTop: 13,
      marginLeft: 13,
      marginRight: 13,
      height: 44,
      backgroundColor: 'white',
      borderRadius: 14,
      padding: 12,
      elevation: 2,
      borderWidth: 1,
      borderColor: '#DDDDDD',
    },

    placeholderStyle: {
      fontSize: 16,
    },

    selectedTextStyle: {
      fontSize: 16,
    },

    participant: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 13,
      marginRight: 13,
  },

    AddButton: {
      backgroundColor: '#172ACE',
      height: 56,
      borderRadius: 13,
      marginTop: 20,
      marginLeft: 13,
      marginRight: 13,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      marginBottom: 15,
    },

    buttonText: {
      color: 'white',
      marginLeft: 15,
    },

    datepicker: {
      height: 44,
      marginTop: 13,
      marginLeft: 13,
      marginRight: 13,
      borderWidth: 1,
      borderColor: '#DDDDDD',
      padding: 10,
      borderRadius: 14,
    },

    datepickerRappel: {
      height: 44,
      marginTop: 13,
      marginLeft: 13,
      marginRight: 13,
      borderWidth: 1,
      borderColor: '#DDDDDD',
      padding: 10,
      borderRadius: 14,
    },

    textdate: {
      fontSize: 16,
      opacity: .3
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
    },

    emptypage: {
      alignItems: 'center',
    }
})

export default GlobalTask;