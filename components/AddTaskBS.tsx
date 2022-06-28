import React, { useCallback, useRef, useState } from 'react';
import {StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity} from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import ParticipantCard from './ParticipantCard';
import Plus from '../Icons/Plus.svg'
import BottomSheet, { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import AddButton from '../Icons/AddButton.svg';
import * as Haptics from 'expo-haptics';
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';
import {db} from '../firebase-config'
import DateTimePickerModal from "react-native-modal-datetime-picker";



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



//props est clcID necessaire pr add un doc à la subcollction tache

const AddTaskBS = (props) => {




// ref
const bottomSheetRef = useRef<BottomSheetModal>(null);

const [title, setTitle] = React.useState("");
const [value, setValue] = useState("");
const [date, setDate] = useState("")
const [rappel, setRappel] = useState("")

const sheetRef = useRef<BottomSheet>(null);

const [isOpen, setIsOpen] = useState(false);

const handleAddTask = async () => {
  bottomSheetRef.current?.close();
//.then pr que le nvo doc aie comme id le nom généré par firestore
  await addDoc(collection(db, 'Colocs/'+props.clcID+'/Taches'), {desc: title, colocID: props.clcID, date: date}); 
};

const buttonPressed = () => {
  bottomSheetRef.current?.present();
}

const renderBackdrop = useCallback((props) => {
  return (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
    />
  );
}, []);

const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
const optionsDate = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };

const showDatePicker = () => {
  setDatePickerVisibility(true);
};

const hideDatePicker = () => {
  setDatePickerVisibility(false);
};

const handleConfirmDate = (date) => {
  setDate(date.toLocaleDateString('fr-FR', optionsDate));
  console.log("A date has been picked: ", date);
  hideDatePicker();
};

const [isRappelPickerVisible, setRappelPickerVisibility] = useState(false);
const optionsRappel = { weekday: 'short', month: 'short', day: 'numeric', hour:'numeric', minute:'numeric' };

const showRappelPicker = () => {
  setRappelPickerVisibility(true);
};

const hideRappelPicker = () => {
  setRappelPickerVisibility(false);
};

const handleConfirmRappel = (date) => {
  setRappel(date.toLocaleDateString('fr-FR', optionsRappel));
  console.log("A date has been picked: ", date);
  hideRappelPicker();
};

return (

<View style={{flex: 1}}>

<TouchableOpacity onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); buttonPressed() }} style= {styles.OpenBS}>
                <AddButton /> 
  </TouchableOpacity> 

        

          <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={['90%']}
        index= {0}
        backdropComponent={renderBackdrop}
      >
        <View style={styles.contentContainer}>
         

        <ScrollView>
<Text style={styles.Title}>Nouvelle tâche ménagère</Text>
    <View style={styles.depenseTitle}>
        <Text style={styles.subTitle}>Titre</Text>
        <TextInput
                style={styles.input}
                onChangeText={(event) => {setTitle(event);}}
                value={title}
                placeholder="Entrer le titre"
                maxLength={30}
                
            />
      </View>

      <View style={styles.depenseTitle}>
        <Text style={styles.subTitle}>Date</Text>
              <TextInput 
                style={styles.datepicker}
                onChangeText={(event) => {setDate(event);}}
                value={date}
                placeholder="Choisir la date"
                onPressIn={showDatePicker} 
              />
                    
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmDate}
                onCancel={hideDatePicker}
                cancelTextIOS='Annuler'
                confirmTextIOS='Confirmer'
              />
      </View>

      <View style={styles.depenseTitle}>
        <Text style={styles.subTitle}>Récurrence</Text>
            <View>
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
                onChange={item => {
                    setValue(item.value);
                }}
            />
            </View>
      </View>

      <View style={styles.depenseTitle}>
        <View style={styles.groupe}>
            <View>
                <Text style={styles.subTitle}>Notification</Text>
                    <View>
                    <Dropdown
                            style={styles.dropdownNotif}
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
            </View>
            <View >
                <Text style={styles.subTitle}>Rappel</Text>
                  
                      <TextInput 
                      style={styles.datepickerRappel}
                      onChangeText={(event) => {setRappel(event);}}
                      value={rappel}
                      placeholder="Entrer le rappel"
                      onPressIn={showRappelPicker} 
                      />
                     
                      <DateTimePickerModal
                      isVisible={isRappelPickerVisible}
                      onConfirm={handleConfirmRappel}
                      onCancel={handleConfirmRappel}
                      cancelTextIOS='Annuler'
                      confirmTextIOS='Confirmer'
                      locale="fr_FR"
                      mode="datetime"
                    />

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
      <Plus/>
      <Text style={styles.buttonText}>Ajouter la tâche ménagère</Text>
      </TouchableOpacity>

      </ScrollView>


        </View>
      </BottomSheetModal>
  
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

      dropdownNotif: {
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

      contentContainer: {
        flex: 1,
        alignItems: 'center',
        zIndex: 2,
      },

      OpenBS: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flex: 1,
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
        width: 160,
        fontSize: 16
      },
  
      textdate: {
        fontSize: 16,
        opacity: .3
      }
})


export default AddTaskBS;