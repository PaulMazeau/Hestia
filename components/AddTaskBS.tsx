import React, { useCallback, useRef, useState } from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import {ScrollView} from 'react-native-gesture-handler'
import ParticipantCard from './ParticipantCard';
import Plus from '../Icons/Plus.svg'
import BottomSheet, { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import AddButton from '../Icons/AddButton.svg';
import * as Haptics from 'expo-haptics';
import { addDoc, collection } from 'firebase/firestore';
import {db} from '../firebase-config'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';
import {useToast} from 'react-native-toast-notifications';

const MyLoader = () => ( 
  <ContentLoader 
  speed={1}
  backgroundColor={'white'}
  foregroundColor={'#DDD'}
  height={70}
  width={500}
  >
  <Rect x="0" y="0" rx="10" ry="10" width="64" height="70" />
  <Rect x="70" y="0" rx="10" ry="10" width="64" height="70" />
  <Rect x="140" y="0" rx="10" ry="10" width="64" height="70" />
  <Rect x="210" y="0" rx="10" ry="10" width="64" height="70" />
  </ContentLoader>)

const today = new Date();

const Frequence = [
    { label: 'Aucune', value: '0' },
    { label: '1 jour', value: '1' },
    { label: '2 jours', value: '2' },
    { label: '3 jours', value: '3' },
    { label: '1 semaine', value: '7' },
    { label: '2 semaines', value: '14' },
    { label: '1 mois', value: '28' },
  ];

//props est clcID necessaire pr add un doc à la subcollction tache + la userList pr les participants cards

const AddTaskBS = (props) => {
  //liste des users de la coloc et list des users slectionné pr la tache (ID)

  const [areConcerned, setAreConcerned] = useState([]); //pr savoir qui est concerné par la tache
const toast = useToast();
//pour indiquer si la personne est concernée ou non par la tache
const putInOrPutOut = (id) => {
  if(areConcerned.includes(id)){
    setAreConcerned(areConcerned.filter(elt => !(elt==id)))
  }else {
  setAreConcerned([...areConcerned, id])
}}
//rend les cartes des participants ds la scrollview horizontale
const renderUsers = () => {
  if (props.userList) {
  if (props.userList.length > 0) {
    return(
      props.userList.map((user)=> {
        
        return(
          <TouchableOpacity key ={user.uuid} onPress = {() => {putInOrPutOut(user.uuid)}}>
          <ParticipantCard key ={user.uuid} name={user.nom} avatar={user.avatarUrl}/>
          </TouchableOpacity>
        )
      })
    )
  }}
  return (
    <View>
      {MyLoader()}
    </View>
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
  if(recur == "") {alert("Sélectionne une récurrence pour ta tâche !"); return}
  if(date== today) {alert ("Quand doit être effectuée la tâche ?"); return}
  if(title == "") {alert("Rentre un titre pour cette tâche !"); return}
  if(rappel == ""){alert("A quelle heure souhaiterais-tu recevoir un rappel ?"); return}
  if(areConcerned.length == 0) {alert("Qui est concerné par cette tâche ?"); return}
  bottomSheetRef.current?.close();
  try{
  await addDoc(collection(db, 'Colocs/'+props.clcID+'/Taches'), {desc: title, colocID: props.clcID, date: date, rappel: rappel, concerned: areConcerned, recur: recur, nextOne: areConcerned[0]});
  toast.show('Nouvelle tâche ajoutée !', {
    type: "success",})
  }catch(err){
    toast.show('Impossible de créer la tâche', {
      type: "danger",})
  }
  setTitle("");
  setAreConcerned([]);
  setDate(today);
  setRecur("");
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
  setRappel(date.toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'}).slice(0, 5))
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
                placeholderTextColor = "#A9A9A9"
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
                showSoftInputOnFocus={false}
                placeholderTextColor = "#A9A9A9"
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
        <Text style={styles.subTitle}>Fréquence</Text>
            <View>
            <Dropdown
                style={styles.dropdownFrequence}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={Frequence}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Choisir une fréquence"
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
                      value={rappel.slice(0,5)}
                      placeholder="Entrer le rappel"
                      onPressIn={showRappelPicker}
                      showSoftInputOnFocus={false} 
                      placeholderTextColor = "#A9A9A9"
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

      dropdownFrequence: {
        marginTop: 13,
        marginLeft: 13,
        marginRight: 13,
        height: 44,
        backgroundColor: 'white',
        borderRadius: 14,
        padding: 12,
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
        marginRight: 10
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