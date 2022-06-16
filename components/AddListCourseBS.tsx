import React, { useCallback, useRef, useState } from 'react';
import {StyleSheet, View, Text, Button, Image, Alert, TextInput, ScrollView, TouchableOpacity} from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import ParticipantCard from './ParticipantCard';
import Plus from '../Icons/Plus.svg'
import BottomSheet, { BottomSheetModal } from '@gorhom/bottom-sheet';

const AddListeCourseBS = () => {

const [title, onChangeTitre] = React.useState(null);

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