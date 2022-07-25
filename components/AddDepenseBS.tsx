import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import {StyleSheet, View, Text, Button, Image, Alert, TextInput, ScrollView, TouchableOpacity} from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import ParticipantCard from './ParticipantCard';
import Plus from '../Icons/Plus.svg'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import AddButton from '../Icons/AddButton.svg'
import * as Haptics from 'expo-haptics';
import {v4 as uuid} from 'uuid';
import { updateDoc, serverTimestamp, addDoc, collection, getDoc, doc, where, query, getDocs, increment } from "firebase/firestore";
import {db} from '../firebase-config'
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { ReloadContext, UserContext, UserListContext } from '../Context/userContextFile';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';

//on met du delay le temps que la cloud function update les soldes (+pendant ce temps on affiche le loader)
//pr pvoir récupérer le solde updated de luser et mettre a jour le contexte
//a opti mais o moins ça marche
const delay = ms => new Promise(res => setTimeout(res, ms));

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


//ATTRIBUTS dans bdd : amount, giverID, receiversID array, desc
//props est userList pr trouver le chemin pr addDoc
const AddDepenseBS = (props) => {
const [userList, setUserList]= useState([]);
const nav = useNavigation()
const bottomSheetRef = useRef<BottomSheetModal>(null);

const[user, setUser] = useContext(UserContext); //pr update le usercontexte
const renderBackdrop = useCallback((props) => {
  

  return (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
    />
  );
}, []);


const [areConcerned, setAreConcerned] = useState([]);
  const buttonPressed = () => {
    bottomSheetRef.current?.present();
  }

//récupère les utilisateurs de la colocs (prbablement a entrer ds app.tsx)
useEffect( () => {
  const getUsers = async () => {
    const data = await getDoc(doc(db, "Colocs", user.colocID));
    const membersID = data.data().membersID;
    const q = query(collection(db, "Users"), where('uuid', 'in', membersID))
    const querySnapshot = await getDocs(q);
    setUserList(querySnapshot.docs.map((doc) => ({...doc.data()})));
  }
  getUsers();
}, [])

const [reload, setReload] = useContext(ReloadContext);

//pour indiquer si la personne est concernée ou non par la dépense
const putInOrPutOut = (id) => {
  if(areConcerned.includes(id)){
    setAreConcerned(areConcerned.filter(elt => !(elt==id)))
  }else {
  setAreConcerned([...areConcerned, id])
}}

//pr afficher les noms des membres ds le truc dropdown
const dropdownData = () => {
  const data = [];
  userList.forEach((user)=> {
    data.push({label: user.nom, value: user.uuid})
  })
  return data;
}

//pour afficher les cartes des membres
const renderUsers = () => {
  if(userList){
    if(userList.length > 0){
  return(
    userList.map((user)=> {
      
      return(
        <TouchableOpacity key ={user.uuid} onPress = {() => {putInOrPutOut(user.uuid)}}>
        <ParticipantCard key ={user.uuid} name={user.nom} avatar={user.avatarUrl}/>
        </TouchableOpacity>
      )
    })
  )}
}
  
  return (
    <View>
      {MyLoader()}
    </View>
  )
}
//pour checker qu'on envoit pas de la merde dans la bdd 
const isNumber = (str) => {
  if (str.trim() === '') {
    return false;
  }

  return !isNaN(str);
}
//pr ajouter dépense a db
  const handleAddDepense = async () => {
    if(!(isNumber(amount))){
      alert("Entre un nombre valide!")
      return
    }
    if(areConcerned.length==0){
      alert("Cette dépense concerne qui ?")
      return
    }
    if(payeur.length==0){
      alert("Qui a payé ?")
      return
    }
    if(title.length==0){
      alert("Ajoute une description à cette dépense !")
      return
    }
    if(title == "rbrsmnt"){
      alert("C'est quoi cette description mdrr ?")
      return
    }
    const allParticipant = [...areConcerned];
    allParticipant.push(payeur);//utile dans DepenseDiagramme pr rapidement check si luser est concerné par une transac (payeur ou receveur)
    await addDoc(collection(db, "Colocs/" +user.colocID+ "/Transactions"), {timestamp: serverTimestamp(), amount: Number(amount), giverID: payeur, receiversID: areConcerned, desc: title, concerned: allParticipant});
    //update du solde coté serveur
    setAmount("");
    setAreConcerned([]);
    setPayeur(null);
    setTitle("");
    bottomSheetRef.current?.close();
    setReload(true)
    await delay(3000);
    const refreshedData = await getDoc(doc(db, "Users", user.uuid))
    setUser({...user, solde: refreshedData.data().solde}) //update le contexte av le nouvo sold
    setReload(false);  
  };

// const updateSolde = async () => {
//   const length = areConcerned.length;
//   var payeurIsIn = false; //payeur a payé aussi pr lui
//   for(var i = 0; i<length; i++){
//     if(!(areConcerned[i]==payeur)){//si c pas le payeur
//       await updateDoc(doc(db, "Users", areConcerned[i]), {solde: increment(-Number(amount)/length)});
     
//     }else {// soit le payeur a payé pr lui aussi, soit que pr les autres
//         payeurIsIn=true;
//         await updateDoc(doc(db, "Users", areConcerned[i]), {solde: increment(Number(amount)-(Number(amount)/length))});
 
//     }
//   }
//   if(!payeurIsIn){
//     await updateDoc(doc(db, "Users", payeur), {solde: increment(Number(amount))});

//   }
  // const refreshedData = await getDoc(doc(db, "Users", user.uuid))
  // setUser({...user, solde: refreshedData.data().solde}) //update le contexte av le nouvo solde
// }

const [title, setTitle] = React.useState("");
const [amount, setAmount] = useState("");
const [payeur, setPayeur] = useState("");



return (

  

<View style={{flex: 1}}>


<TouchableOpacity onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); buttonPressed() }} style= {styles.OpenBS}>
  <AddButton /> 
</TouchableOpacity>


<BottomSheetModal
ref={bottomSheetRef}
snapPoints={['85%']}
index= {0}
backdropComponent={renderBackdrop}
>

<View style={styles.contentContainer}>
 
<Text style={styles.Title}>Nouvelle dépense</Text>
    <View style={styles.depenseTitle}>
        <Text style={styles.subTitle}>Titre</Text>
        <TextInput
                style={styles.input}
                onChangeText={(event) => {setTitle(event)}}
                value={title}
                placeholder="Entrer le titre"
                placeholderTextColor = "#A9A9A9"
            />
      </View>

      <View style={styles.depenseTitle}>
        <Text style={styles.subTitle}>Montant</Text>
        <TextInput
                style={styles.input}
                onChangeText={(event) => setAmount(event)}
                value={amount}
                placeholder="Entrer le montant"
                keyboardType='numeric'
                placeholderTextColor = "#A9A9A9"
            />
      </View>


      <View style={styles.depenseTitle}>
        <Text style={styles.subTitle}>Payé par :</Text>
            <View>
            <Dropdown
                style={styles.dropdownRecurrence}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={dropdownData()}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Qui a payé ?"
                value={payeur}
                onChange={item => {
                    setPayeur(item.value);
                }}
            />
            </View>
      </View>



     
      <View style={styles.depenseTitle}>
        <Text style={styles.subTitle}>Pour:</Text>
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

      <TouchableOpacity style={styles.AddButton} onPress={() => { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); handleAddDepense() }} > 
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