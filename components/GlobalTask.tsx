import React, { useCallback, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TacheCard from '../components/TacheCard';
import AddTaskBS from './AddTaskBS';
import {useCollection} from 'react-firebase-hooks/firestore';
import { collection, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase-config';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Colors, Drawer, FeatureHighlight } from 'react-native-ui-lib';
import BottomSheet, { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { Dropdown } from 'react-native-element-dropdown';
import ParticipantCard from './ParticipantCard';
import * as Haptics from 'expo-haptics';
import Edit from '../Icons/Edit.svg'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Arrow from '../Icons/Arrow.svg';

const windowHeight = Dimensions.get('window').height; 

//props est la colocID, on le récupère ici car 1 appel en moins(appel ds tache obligé)
// Besoin de colocID car Taches est subcollection de Colocs 

 const GlobalTask = (props) => {
  // const [allTasks, loading, error] = useCollection(collection(db, "Colocs/"+props.clcID+ "/Taches"));
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "Colocs/"+props.clcID +"/Taches/", id));
  }

const Empty=require('../Img/Empty.png');

const renderContent = () => {
  if(!(props.tasks ===undefined)){
  if(props.tasks.docs.length > 0){
    return(
      props.tasks.docs.map(t => {
        return(

          <View style={styles.Card} key = {t.id}>
          <Drawer 
            rightItems={[{text: 'Supprimer', background: Colors.red30, onPress: () => handleDelete(t.id)}]}
            leftItem={{text: 'Modifier', background: Colors.green30, onPress: () => buttonPressed()}}
            key = {t.id}>
              <TacheCard Tache={t.data().desc} key={t.id} clcID = {props.clcID} tacheID={t.id} day={t.data().day} month ={t.data().month} year={t.data().year}/>
          </Drawer>
          </View>

        )
  
      })
    )
  }}
  return (
   <View style={{alignItems: 'center', height: windowHeight / 1.9, justifyContent:'space-between', backgroundColor: 'red'}}>
      <ImageContainer image={Empty} /> 
      <Text style={styles.emptytext}>Oops, il n’y pas encore de {'\n'} liste de course</Text>
      <Arrow style={styles.arrow}/>
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

// ref
const bottomSheetRef = useRef<BottomSheetModal>(null);

const sheetRef = useRef<BottomSheet>(null);

const [isOpen, setIsOpen] = useState(false);

const buttonPressed = () => {
  bottomSheetRef.current?.present();
}

const handleAddTask = async () => {
  bottomSheetRef.current?.close();
};

const renderBackdrop = useCallback((props) => {
  return (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
    />
  );
}, []);

const [title, setTitle] = React.useState("");
const [value, setValue] = useState("");

const Recurrence = [
  { label: 'Aucune', value: '1' },
  { label: '1 jour', value: '2' },
  { label: '2 jours', value: '3' },
  { label: '3 jours', value: '4' },
  { label: '1 semaine', value: '5' },
  { label: '2 semaines', value: '6' },
  { label: '1 mois', value: '7' },
  { label: '2 mois', value: '8' },
];

const Notification = [
  { off: 'Oui', input: '2' },
  { off: 'Non', input: '1' },
];

const Rappel = [
  { rappel: 'Aucun', id: '1' },
  { rappel: '1 heures', id: '2' },
  { rappel: '2 heures', id: '3' },
  { rappel: '1 jour', id: '4' },
  { rappel: '1 semaine', id: '5' },
];

/* FIN SETUP DE LA BOTTOMSHEET MODIFIER*/

  return (   
          <View style={{flex: 1}}>


{/* DEBUT DE LA BOTTOMSHEET MODIFIER*/}

          <BottomSheetModal
              ref={bottomSheetRef}
              snapPoints={['90%']}
              index= {0}
              backdropComponent={renderBackdrop}
            >

        <View style={styles.contentContainer}>
         <ScrollView>
            <Text style={styles.Title}>Modifier la tâche ménagère</Text>
              <View style={styles.depenseTitle}>
                  <Text style={styles.subTitle}>Titre</Text>
                    <TextInput
                  style={styles.input}
                  onChangeText={setTitle}
                  value={title}
                  placeholder="Entrer le titre"
                  maxLength={30}
                    />
                </View>
          
                <View style={styles.depenseTitle}>
                  <Text style={styles.subTitle}>Date</Text>
                  <TouchableOpacity 
                  onPress={showDatePicker} 
                  style={styles.datepicker}
                  >
                    <Text style={styles.textdate}>Choisir une date</Text>
                    <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    cancelTextIOS='Annuler'
                    confirmTextIOS='Confirmer'
                  />
                  </TouchableOpacity>
                </View>
          
                <View style={styles.depenseTitle}>
                  <Text style={styles.subTitle}>Récurrence</Text>
                    <Dropdown
                        style={styles.dropdownRecurrence}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={Recurrence}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Choisir une récurrence"
                        value={value}
                        onChange={setValue}
                    />
                </View>
          
                <View style={styles.depenseTitle}>
                  <View style={styles.groupe} >
                      <View>
                          <Text style={styles.subTitle}>Notification</Text>
                            <Dropdown
                              style={styles.dropdownRappel}
                              placeholderStyle={styles.placeholderStyle}
                              selectedTextStyle={styles.selectedTextStyle}
                              data={Notification}
                              maxHeight={300}
                              labelField="off"
                              valueField="input"
                              placeholder="Oui"
                              value={value}
                              onChange={item => {
                                  setValue(item.value);
                              }}
                          />
                      </View>

                      <View >
                          <Text style={styles.subTitle}>Rappel</Text>
                            <View>
                              <TouchableOpacity 
                                onPress={showDatePicker} 
                                style={styles.datepickerRappel}
                                >
                                  <Text style={styles.textdate}>Choisir un rappel</Text>
                                  <DateTimePickerModal
                                  isVisible={isDatePickerVisible}
                                  onConfirm={handleConfirm}
                                  onCancel={hideDatePicker}
                                  mode="time"
                                  locale="en_GB"
                                  cancelTextIOS='Annuler'
                                  confirmTextIOS='Confirmer'
                                />
                              </TouchableOpacity>
                        
                            </View>
                      </View>
                  </View>
                </View>
          
                
                <View style={styles.depenseTitle}>
                  <Text style={styles.subTitle}>Participant</Text>
                      <View style={styles.participant}>
                          <ScrollView  
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{flexGrow: 1}}
                            keyboardShouldPersistTaps='handled'>
                                <ParticipantCard/>
                                <ParticipantCard/>
                                <ParticipantCard/>
                                <ParticipantCard/>
                                <ParticipantCard/>
                                <ParticipantCard/>
                          </ScrollView>
                      </View>
                </View>
          
            <TouchableOpacity style={styles.AddButton} onPress={() => { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); handleAddTask() }}> 
            <Edit/>
            <Text style={styles.buttonText}>Modifier la tâche ménagère</Text>
            </TouchableOpacity>
        
          </ScrollView>
        
 
      </View>

          </BottomSheetModal>
{/* FIN DE LA BOTTOMSHEET MODIFIER*/}
       
          <ScrollView showsVerticalScrollIndicator={false}>
      
        
          {
            renderContent()
          }

      
         
        </ScrollView>
            
        <AddTaskBS clcID={props.clcID}/>
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
      alignItems: 'center',
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

    dropdownRappel: {
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
      width: 160
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
      width: 160
    },

    textdate: {
      fontSize: 16,
      opacity: .3
    },

    emptytext: {
      textAlign: 'center',
      color: '#172ACE',
      fontWeight: '700',
      fontSize: 16,
      paddingBottom: windowHeight / 10,
    },

    ImageContainer: {
        height: '40%',
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    
    Image: {
        height: '100%',
        width: '100%',
        },

    arrow: {
      marginLeft: '40%',
      backgroundColor: 'green'
    }
})

export default GlobalTask;