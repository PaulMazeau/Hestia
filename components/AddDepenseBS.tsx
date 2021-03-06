import React, { useCallback, useRef, useState } from 'react';
import {StyleSheet, View, Text, Button, Image, Alert, TextInput, TouchableOpacity} from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import ParticipantCard from './ParticipantCard';
import Plus from '../Icons/Plus.svg'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import AddButton from '../Icons/AddButton.svg'
import * as Haptics from 'expo-haptics';
import { ScrollView } from 'react-native-gesture-handler';


const Recurrence = [
    { label: 'Tout le monde', value: '1' },
    { label: 'Colocataire 1', value: '2' },
    { label: 'Colocataire 2', value: '3' },
    { label: 'Colocataire 3', value: '4' },
    { label: 'Colocataire 4', value: '5' },
    { label: 'Colocataire 5', value: '6' },
  ];


const AddDepenseBS = () => {

const bottomSheetRef = useRef<BottomSheetModal>(null);

const renderBackdrop = useCallback((props) => {
  return (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
    />
  );
}, []);

  const buttonPressed = () => {
    bottomSheetRef.current?.present();
  }

  const AddDepense = () => {
    bottomSheetRef.current?.close();
  };


const [title, onChangeTitre] = React.useState(null);
const [value, setValue] = useState(null);
const [day, Day] = React.useState(null);
const [month, Month] = React.useState(null);
const [year, Year] = React.useState(null);



return (

  

<View style={{flex: 1}}>


<TouchableOpacity onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); buttonPressed() }} style= {styles.OpenBS}>
  <AddButton /> 
</TouchableOpacity>


<BottomSheetModal
ref={bottomSheetRef}
snapPoints={['80%']}
index= {0}
backdropComponent={renderBackdrop}
>

<View style={styles.contentContainer}>
 
<Text style={styles.Title}>Nouvelle dépense</Text>
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
        <Text style={styles.subTitle}>Montant</Text>
        <TextInput
                style={styles.input}
                onChangeText={setValue}
                value={value}
                placeholder="Entrer le montant"
                
            />
      </View>

      <View style={styles.depenseTitle}>
        <Text style={styles.subTitle}>Payé par :</Text>
            <View>
            <Dropdown
                style={styles.dropdownRecurrence}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={Recurrence}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Choisir le payeur"
                value={value}
                onChange={item => {
                    setValue(item.value);
                }}
            />
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

      <TouchableOpacity style={styles.AddButton} onPress={() => { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); AddDepense() }} > 
      <Plus/>
      <Text style={styles.buttonText}>Ajouter la dépense</Text>
      </TouchableOpacity>


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
      },

      buttonText: {
        color: 'white',
        marginLeft: 15,
      },

      contentContainer: {
        flex: 1,
        zIndex: 2,
      },

      OpenBS: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flex: 1,
      },
})


export default AddDepenseBS;