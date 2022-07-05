import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Platform} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthStackParams, RootStackParams } from '../App';
import TopBackNavigationClear from '../components/TopBackNavigationClear';
import AvatarColum from '../components/AvatarColumn';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase-config';
import { doc, setDoc } from 'firebase/firestore';



type Props = NativeStackScreenProps<AuthStackParams, 'Avatar'>;


const dataAvatar = [
  '../Img/Avatars/Avatar1.png',
  '../Img/Avatars/Avatar2.png',
  '../Img/Avatars/Avatar4.png',
  '../Img/Avatars/Avatar5.png',
  '../Img/Avatars/Avatar6.png',
  '../Img/Avatars/Avatar7.png',
  '../Img/Avatars/Avatar3.png',
  '../Img/Avatars/Avatar8.png',
  '../Img/Avatars/Avatar9.png',
  '../Img/Avatars/Avatar10.png',
  '../Img/Avatars/Avatar11.png',
  '../Img/Avatars/Avatar12.png',
  '../Img/Avatars/Avatar13.png',
  '../Img/Avatars/Avatar14.png',
  '../Img/Avatars/Avatar15.png',
  '../Img/Avatars/Avatar16.png',
  '../Img/Avatars/Avatar17.png',
];


const AvatarCreationScreen = ({route, navigation}: Props) => {
  {/**variable dynamique de type Image pour changer l'appercu de l'avatar en cliquand dans la gallerie, on l'initialise avec une image*/}
  const [avatar, setAvatar] = useState(require('../Img/Avatars/Avatar1.png'))
  const [avatarUrl, setAvatarUrl] = useState(dataAvatar[0])
  
  const handleSignup = () => {
    if(route.params.username==""){
        alert("Rentre un nom d'utilisateur !");
        return
    }
    createUserWithEmailAndPassword(auth, route.params.email, route.params.password).then(function(userCred) {
        // get user data from the auth trigger
        const userUid = userCred.user.uid; // The UID of the user.
        // set account  doc  
        const entry = {
          nom: route.params.username,
          uuid: userUid,
          solde: 0,
          tache: "Rien de prévu!",
          avatarUrl: avatarUrl
        }
       setDoc(doc(db, 'Users', userUid),entry); 
      }).catch(error => alert(error.message));
    
}

  return (
    
    
<View style={styles.Body} >
    
  <View style={styles.first50}>

    <SafeAreaView>
        <TouchableOpacity
            onPress={() => {navigation.navigate("Login")}} >
          <Text style = {styles.DejaMembre}>Se connecter</Text>
        </TouchableOpacity>
    </SafeAreaView>

        <View style = {styles.Title}>
          <TopBackNavigationClear/>
          <Text style={styles.screenTitle}>Choisi ton Avatar</Text>
        </View>
  
    <Image source={avatar} style={styles.BigImage}/>


  </View>
    

  <ScrollView style={styles.AvatarGallerie}>  
  {/**Gallerie d'avatars */}
  <ScrollView  
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps='handled'
      >
      {/**component qui prend deux images (la deuxieme peut etre null si pas assez d'images) et qui renvoit une colonne de deux avatars cliquable */}                
      <AvatarColum image1={dataAvatar[0]} image2={dataAvatar[1]} setAvatar={setAvatar} avatar1={require('../Img/Avatars/Avatar1.png')} avatar2={require('../Img/Avatars/Avatar2.png')} setAvatarUrl={setAvatarUrl}/>
      <AvatarColum image1={dataAvatar[2]} image2={dataAvatar[3]} setAvatar={setAvatar} avatar1={require('../Img/Avatars/Avatar4.png')} avatar2={require('../Img/Avatars/Avatar5.png')} setAvatarUrl={setAvatarUrl}/>
      <AvatarColum image1={dataAvatar[4]} image2={dataAvatar[5]} setAvatar={setAvatar} avatar1={require('../Img/Avatars/Avatar6.png')} avatar2={require('../Img/Avatars/Avatar7.png')} setAvatarUrl={setAvatarUrl}/>
      <AvatarColum image1={dataAvatar[6]} image2={dataAvatar[7]} setAvatar={setAvatar} avatar1={require('../Img/Avatars/Avatar3.png')} avatar2={require('../Img/Avatars/Avatar8.png')} setAvatarUrl={setAvatarUrl}/>
      <AvatarColum image1={dataAvatar[8]} image2={dataAvatar[9]} setAvatar={setAvatar} avatar1={require('../Img/Avatars/Avatar9.png')} avatar2={require('../Img/Avatars/Avatar10.png')} setAvatarUrl={setAvatarUrl}/>
      <AvatarColum image1={dataAvatar[10]} image2={dataAvatar[11]} setAvatar={setAvatar} avatar1={require('../Img/Avatars/Avatar11.png')} avatar2={require('../Img/Avatars/Avatar12.png')} setAvatarUrl={setAvatarUrl}/>
      <AvatarColum image1={dataAvatar[12]} image2={dataAvatar[13]} setAvatar={setAvatar} avatar1={require('../Img/Avatars/Avatar13.png')} avatar2={require('../Img/Avatars/Avatar14.png')} setAvatarUrl={setAvatarUrl}/>
      <AvatarColum image1={dataAvatar[14]} image2={dataAvatar[15]} setAvatar={setAvatar} avatar1={require('../Img/Avatars/Avatar15.png')} avatar2={require('../Img/Avatars/Avatar16.png')} setAvatarUrl={setAvatarUrl}/>
      <AvatarColum image1={dataAvatar[16]} image2={null} setAvatar={setAvatar} avatar1={require('../Img/Avatars/Avatar17.png')} avatar2={null} setAvatarUrl={setAvatarUrl}/> 
  </ScrollView>
    

  
  <TouchableOpacity
  onPress={() => {handleSignup(); console.log(route.params.username, avatarUrl)}}
  >
    <View style={styles.CestPartiBouton}>
      <Text style={styles.CestPartiText}> C'est parti</Text>
    </View>
  </TouchableOpacity>
   
  </ScrollView>    
  </View>
   
  );
};



const styles = StyleSheet.create({

    Body: {
      backgroundColor: 'white',
      flex: 1,
      overflow:'visible',
      clipToPadding:'false',
      flexDirection:'column',
      justifyContent:'space-evenly',  
          
    },
    
    first50:{
      backgroundColor: '#172ACE',
      borderBottomRightRadius: 30,
      borderBottomLeftRadius: 30,
      flex: 1.2,
      paddingLeft: 16,
      paddingRight: 16,
    },

    AvatarGallerie:{
      flex:3,
      marginTop:10,
      marginLeft: 10
    },
    
    SeConnecter:{
      color: 'white',
      textAlign: 'right',
      fontSize: 15,
      fontWeight: '500',
      marginTop: 10
    },

    ChoisiTonAvatar:{
      color: 'white',
      textAlign: 'left',
      fontSize: 25,
      fontWeight: '500',
      margin:15,
      marginTop:50,
      marginBottom:30,
    },

    BigImage: {
      aspectRatio:1/1, 
      height: '55%',
      width: '55%',
      borderRadius: 30,
      marginLeft:'auto',
      marginRight:'auto',
      marginTop: '10%'
    },
    
    CestPartiBouton:{
      margin:20,
      marginTop:10,
      marginBottom:10,
      padding:10,
      backgroundColor:'#172ACE',
      borderRadius:10,
    },

    CestPartiText:{
      textAlign:'center',
      fontSize:20,
      color:'white',
    },

    DejaMembre: {
      color: 'white',
      textAlign: 'right',
      fontSize: 15,
      fontWeight: '500',
      marginTop: 10
  },

  Title: {
      flexDirection : 'row', 
      alignItems: 'center',
      marginTop: '10%'
    },

    screenTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white'
    },
})

export default AvatarCreationScreen;