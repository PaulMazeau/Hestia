import React, { useCallback, useEffect, useRef, useState } from 'react';
import {StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity} from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import ParticipantCard from './ParticipantCard';
import Plus from '../Icons/Plus.svg'
import BottomSheet, { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import AddButton from '../Icons/AddButton.svg';
import * as Haptics from 'expo-haptics';
import { addDoc, collection, updateDoc, doc, getDoc, getDocs, where, query } from 'firebase/firestore';
import {db} from '../firebase-config'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Timestamp } from 'react-native-reanimated/lib/types/lib/reanimated2/commonTypes';
import { FadeOutToBottomAndroidSpec } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionSpecs';

const today = new Date();

const Recurrence = [
    { label: 'Aucune', value: '0' },
    { label: '1 jour', value: '1' },
    { label: '2 jours', value: '2' },
    { label: '3 jours', value: '3' },
    { label: '1 semaine', value: '7' },
    { label: '2 semaines', value: '14' },
    { label: '1 mois', value: '28' },
  ];

  const Notification = [
    { off: 'Oui', input: '2' },
    { off: 'Non', input: '1' },
  ];





//props est clcID necessaire pr add un doc à la subcollction tache

const AddTaskBS = (props) => {
  //liste des users de la coloc et list des users slectionné pr la tache (ID)
  const [userList, setUserList] = useState([]) 
  const [areConcerned, setAreConcerned] = useState([]); //pr savoir qui est concerné par la tache

  //récupère les utilisateurs de la colocs (prbablement a entrer ds app.tsx)
useEffect( () => {
  const getUsers = async () => {
    const data = await getDoc(doc(db, "Colocs", props.clcID));
    const membersID = data.data().membersID;
    const q = query(collection(db, "Users"), where('uuid', 'in', membersID))
    const querySnapshot = await getDocs(q);
    setUserList(querySnapshot.docs.map((doc) => ({...doc.data()})));
  }
  getUsers();
}, [])

//pour indiquer si la personne est concernée ou non par la dépense
const putInOrPutOut = (id) => {
  if(areConcerned.includes(id)){
    setAreConcerned(areConcerned.filter(elt => !(elt==id)))
  }else {
  setAreConcerned([...areConcerned, id])
}}
//rend les cartes des participants ds la scrollview horizontale
const renderUsers = () => {
  return(
    userList.map((user)=> {
      
      return(
        <TouchableOpacity key ={user.uuid} onPress = {() => {putInOrPutOut(user.uuid)}}>
        <ParticipantCard key ={user.uuid} name={user.nom} avatar={user.avatarUrl}/>
        </TouchableOpacity>
      )
    })
  )
}

// ref
const bottomSheetRef = useRef<BottomSheetModal>(null);

const [title, setTitle] = useState("");
const [value, setValue] = useState("");
const [dateString, setDateString] = useState("") // pr l'affichage ds la bs
const [rappel, setRappel] = useState(today.toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'}))//pr lheure du rappel
const [date, setDate] = useState(today); //pr foutre un timestamp dans la db
const [recur, setRecur] = useState(""); //string du nb de jour entre chaque itération de la tache

const sheetRef = useRef<BottomSheet>(null);

const [isOpen, setIsOpen] = useState(false);

const handleAddTask = async () => {
  bottomSheetRef.current?.close();
  await addDoc(collection(db, 'Colocs/'+props.clcID+'/Taches'), {desc: title, colocID: props.clcID, date: date, rappel: rappel, concerned: areConcerned, recur: recur, nextOne: areConcerned[0]}); 
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


//SETUP DATE PICKER
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
const optionsDate = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };

const showDatePicker = () => {
  setDatePickerVisibility(true);
};

const hideDatePicker = () => {
  setDatePickerVisibility(false);
};

const handleConfirmDate = (date) => {
  setDateString(date.toLocaleDateString('fr-FR', optionsDate));
  setDate(date);
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
  // setRappel(date.toLocaleDateString('fr-FR', optionsRappel));
  setRappel(date.toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'}))
  hideRappelPicker();
};
//FIN SETUP DATE PICKER

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
                // onChangeText={(event) => {setDateString(event);}}
                value={dateString}
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
                value={recur}
                onChange={item => {
                    setRecur(item.value);
                }}
            />
            </View>
      </View>

      <View style={styles.depenseTitle}>
                <Text style={styles.subTitle}>Rappel</Text>
                  
                      <TextInput 
                      style={styles.datepickerRappel}
                      // onChangeText={(event) => {setRappel(event);}} g comment pcq cette ligne sert à rien sauf a fausser la data quon rentre dans la db
                      value={rappel}
                      placeholder="Entrer le rappel"
                      onPressIn={showRappelPicker} 
                      />
                     
                      <DateTimePickerModal
                      isVisible={isRappelPickerVisible}
                      onConfirm={handleConfirmRappel}
                      onCancel={hideRappelPicker}
                      cancelTextIOS='Annuler'
                      confirmTextIOS='Confirmer'
                      locale="fr_FR"
                      mode="time"
                    />
      </View>

     
      <View style={styles.depenseTitle}>
        <Text style={styles.subTitle}>Participant</Text>
            <View style={styles.participant}>
                <ScrollView  
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{flexGrow: 1}}
                    keyboardShouldPersistTaps='handled'>
                        {renderUsers()}
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
        fontSize: 16
      },
  
      textdate: {
        fontSize: 16,
        opacity: .3
      }
})


export default AddTaskBS;