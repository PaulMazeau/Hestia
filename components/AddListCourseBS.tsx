import React, { useCallback, useRef, useState } from 'react';
import {StyleSheet, View, Text, Button, Image, Alert, TextInput, ScrollView, TouchableOpacity} from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import ParticipantCard from './ParticipantCard';
import Plus from '../Icons/Plus.svg'
import BottomSheet, { BottomSheetModal } from '@gorhom/bottom-sheet';


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




const AddListeCourseBS = () => {


const [title, onChangeTitre] = React.useState(null);
const [value, setValue] = useState(null);
const [day, Day] = React.useState(null);
const [month, Month] = React.useState(null);
const [year, Year] = React.useState(null);

const sheetRef = useRef<BottomSheet>(null);

const [isOpen, setIsOpen] = useState(false);

const bottomSheetRef = useRef<BottomSheetModal>(null);

const AddTask = () => {
  bottomSheetRef.current?.close();
};


return (

<View style={{flex: 1}}>
  <ScrollView>
<Text style={styles.Title}>Nouvelle Liste de Course</Text>
    <View style={styles.depenseTitle}>
        <Text style={styles.subTitle}>Titre</Text>
        <TextInput
                style={styles.input}
                onChangeText={onChangeTitre}
                value={title}
                placeholder="Entrer le titre"
                
            />
      </View>
     
      <View style={styles.depenseTitle}>
        <Text style={styles.subTitle}>Participants</Text>
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

      <TouchableOpacity style={styles.AddButton} onPress={AddTask}> 
      <Plus/>
      <Text style={styles.buttonText}>Ajouter la tâche ménagère</Text>
      </TouchableOpacity>

      </ScrollView>
</View>

)


}

const styles = StyleSheet.create({
    input: {
        height: 44,
        marginTop: 13,
        marginLeft: 13,
        marginRight: 13,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        padding: 10,
        borderRadius: 14,
      },

      inputDate: {
        height: 44,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        padding: 10,
        borderRadius: 14,
        width: 100,
      },

      date: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 13,
      marginLeft: 13,
      marginRight: 13,
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
      
      groupe: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        width: 145,
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
      }
})


export default AddListeCourseBS;