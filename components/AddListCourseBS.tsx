import React, { useCallback, useRef, useState, useEffect } from 'react';
import {StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, ImageSourcePropType} from 'react-native'
import ParticipantCard from './ParticipantCard';
import Plus from '../Icons/Plus.svg'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import AddButton from '../Icons/AddButton.svg';
import * as Haptics from 'expo-haptics';
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';
import {db, storage} from '../firebase-config'
import CategorieCard from './CourseCategorie';
import { getDownloadURL, list, ref } from 'firebase/storage';
//props est la clcID utilisé pr create un nv doc


const AddListeCourseBS = (props) => {

const [titre, setTitre] = React.useState("");
const [courseImage, setCourseImage] = React.useState(null);
const [emoji, setemoji] = React.useState(null);
const [color, setcolor] = React.useState(null);
const bottomSheetRef = useRef<BottomSheetModal>(null);
const emojisListRef = ref(storage, "Emojis/");
const [emojiURLS, setEmojiURLS] = useState([]);
useEffect(() => {
  list(emojisListRef).then((response) => {
    response.items.forEach((item) => {
      getDownloadURL(item).then((url) => {
        setEmojiURLS((prev) => [...prev, url]);
      })
    })
  });
  setEmojiURLS(emojiURLS.sort());
  
}, [])

const handleAddList = async () => {
  await addDoc(collection(db, 'Colocs/'+props.clcID+'/Courses'), {Nom: titre, Image:emoji, Color:color, fruits: [], boisson: [], viandes: [], maison: []}); 
  bottomSheetRef.current?.close();
  setTitre('')
};

const putInOrPutOut = (id) => {
  if(courseImage==id) {setCourseImage(null);return;}
  setCourseImage(id);
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

  const buttonPressed = () => {
    bottomSheetRef.current?.present();
  }

  
return (

<View style={{flex: 1}}>


  <TouchableOpacity onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); buttonPressed() }} style={styles.OpenBS}>
          <AddButton /> 
  </TouchableOpacity>



 <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={['60%']}
        index= {0}
        backdropComponent={renderBackdrop}
      >
        <View style={styles.contentContainer}>
      
  <ScrollView>
<Text style={styles.Title}>Nouvelle Liste de Course</Text>
    <View style={styles.depenseTitle}>
        <Text style={styles.subTitle}>Titre</Text>
        <TextInput
                style={styles.input}
                onChangeText={(event) => {setTitre(event);}}
                value={titre}
                placeholder="Entrer le titre"
                placeholderTextColor = "#A9A9A9"
            />
      </View>
     
      <View style={styles.depenseTitle}>
        <Text style={styles.subTitle}>Type</Text>
            <View style={styles.participant}>
                <ScrollView  
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{flexGrow: 1}}
                    keyboardShouldPersistTaps='handled'>
                        <TouchableOpacity onPress={() => {putInOrPutOut(1); setemoji({uri : emojiURLS[0]}); setcolor('#DDCFDD')}}>
                          <View style={[courseImage==1?styles.emoji_valid:styles.emoji_invalid]}>
                          <CategorieCard name='Repas' avatar={{uri : emojiURLS[0]}}/>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {putInOrPutOut(2); setemoji({uri : emojiURLS[1]}); setcolor('#F5C295')}}>
                          <View style={[courseImage==2?styles.emoji_valid:styles.emoji_invalid]}>
                          <CategorieCard name='Soirée' avatar={{uri : emojiURLS[1]}}/>
                          </View>
                        </TouchableOpacity> 
                        <TouchableOpacity onPress={() => {putInOrPutOut(3); setemoji({uri : emojiURLS[2]}); setcolor('papayawhip')}}>
                          <View style={[courseImage==3?styles.emoji_valid:styles.emoji_invalid]}>
                          <CategorieCard name='Végé' avatar={{uri : emojiURLS[2]}}/>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {putInOrPutOut(4); setemoji({uri : emojiURLS[3]}); setcolor('#C1DDE9')}}>
                          <View style={[courseImage==4?styles.emoji_valid:styles.emoji_invalid]}>
                          <CategorieCard name='Ménage' avatar={{uri : emojiURLS[3]}}/>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {putInOrPutOut(5); setemoji({uri : emojiURLS[4]}); setcolor('#CEFACB')}}>
                          <View style={[courseImage==5?styles.emoji_valid:styles.emoji_invalid]}>
                          <CategorieCard name='Divers' avatar={{uri : emojiURLS[4]}}/>
                          </View>
                        </TouchableOpacity>
                </ScrollView>
            </View>
      </View>

      <TouchableOpacity style={styles.AddButton} onPress={() => { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); handleAddList() }}> 
      <Plus/>
      <Text style={styles.buttonText}>Ajouter la nouvelle liste de courses</Text>
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
        marginBottom: 16,
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
      emoji_invalid : {
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: 'center',
        height: 80,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        width: 64,
        justifyContent: 'center',
        marginRight: 8,
        padding: 5
      },
      emoji_valid : {
        backgroundColor: 'rgba(237,240,250, .5)',
        borderRadius: 10,
        alignItems: 'center',
        height: 80,
        borderWidth: 1,
        borderColor: '#172ACE',
        width: 64,
        justifyContent: 'center',
        marginRight: 8,
        padding: 5
      },
})


export default AddListeCourseBS;