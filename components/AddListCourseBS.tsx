import React, { useCallback, useEffect, useRef } from 'react';
import {StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity} from 'react-native'
import Plus from '../Icons/Plus.svg'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import AddButton from '../Icons/AddButton.svg';
import * as Haptics from 'expo-haptics';
import { addDoc, collection } from 'firebase/firestore';
import {db, storage} from '../firebase-config'
import CategorieCard from './CourseCategorie';
import {useToast} from 'react-native-toast-notifications';
import { getDownloadURL, list, ref } from 'firebase/storage';
  
//props est la clcID utilisé pr create un nv doc


const AddListeCourseBS = (props) => {

const emojiURLS = [
  "https://firebasestorage.googleapis.com/v0/b/hestiadev-813bc.appspot.com/o/Emojis%2F0-min.png?alt=media&token=b341911a-d6cf-4166-9829-e2aaca8f4752",
  "https://firebasestorage.googleapis.com/v0/b/hestiadev-813bc.appspot.com/o/Emojis%2F1-min.png?alt=media&token=a1778ed6-6c44-46b0-8593-33c22d2bdba3",
  "https://firebasestorage.googleapis.com/v0/b/hestiadev-813bc.appspot.com/o/Emojis%2F2-min.png?alt=media&token=a0bc831d-4454-4c0a-9778-8249fb018a3a",
  "https://firebasestorage.googleapis.com/v0/b/hestiadev-813bc.appspot.com/o/Emojis%2F3-min.png?alt=media&token=e04e2c6b-2c8f-4c63-a70b-b3c1e3aa91dc",
  "https://firebasestorage.googleapis.com/v0/b/hestiadev-813bc.appspot.com/o/Emojis%2F4-min.png?alt=media&token=b444f9cb-f3a5-4b2e-8c46-175a1b05c561",
    
]
const [titre, setTitre] = React.useState("");
const [courseImage, setCourseImage] = React.useState(null);
const [emoji, setemoji] = React.useState(emojiURLS[4]);
const bottomSheetRef = useRef<BottomSheetModal>(null);

const toast = useToast();

const handleAddList = async () => {
  try{
  await addDoc(collection(db, 'Colocs/'+props.clcID+'/Courses'), {Nom: titre, Image:{uri :emoji}, divers: []/*, boisson: [], viandes: [], maison: [], produitsfrais: [], surgeles: [], conserves: [], goute: []*/}); 
  toast.show('Nouvelle liste de courses créée ! ', {
    type: "success",})
  }catch(err){
    toast.show('Impossible de créer la liste de course', {
      type: "danger",})
  }
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
        <Text style={styles.subTitle2}>Catégorie</Text>
            <View style={styles.participant}>
              
                <ScrollView  
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{flexGrow: 1}}
                    keyboardShouldPersistTaps='handled'>
                        <TouchableOpacity onPress={() => {putInOrPutOut(1); setemoji(emojiURLS[0])}}>
                          <View style={[courseImage==1?styles.emoji_valid:styles.emoji_invalid]}>
                          <CategorieCard name='Repas' avatar={{uri : emojiURLS[0]}}/>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {putInOrPutOut(2); setemoji(emojiURLS[1])}}>
                          <View style={[courseImage==2?styles.emoji_valid:styles.emoji_invalid]}>
                          <CategorieCard name='Soirée' avatar={{uri : emojiURLS[1]}}/>
                          </View>
                        </TouchableOpacity> 
                        <TouchableOpacity onPress={() => {putInOrPutOut(3); setemoji(emojiURLS[2])}}>
                          <View style={[courseImage==3?styles.emoji_valid:styles.emoji_invalid]}>
                          <CategorieCard name='Végé' avatar={{uri : emojiURLS[2]}}/>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {putInOrPutOut(4); setemoji(emojiURLS[3])}}>
                          <View style={[courseImage==4?styles.emoji_valid:styles.emoji_invalid]}>
                          <CategorieCard name='Ménage' avatar={{uri : emojiURLS[3]}}/>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {putInOrPutOut(5); setemoji(emojiURLS[4])}}>
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

      subTitle2: {
        marginLeft: 16,
        marginBottom: 13,
        fontSize: 16,
        fontWeight: '500'
      },

      depenseTitle: {
          marginTop: 15
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

function setAvatarURLS(arg0: (prev: any) => any[]) {
  throw new Error('Function not implemented.');
}
