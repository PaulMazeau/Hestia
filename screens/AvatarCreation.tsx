import React, { useContext, useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Platform, ImageBackground} from 'react-native';
import {NativeStackNavigationProp, NativeStackScreenProps} from '@react-navigation/native-stack';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthStackParams, NoColocStackParams, RootStackParams } from '../App';
import TopBackNavigationClear from '../components/TopBackNavigationClear';
import AvatarColum from '../components/AvatarColumn';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db, storage } from '../firebase-config';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, list, ref } from 'firebase/storage';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../Context/userContextFile';



type Props = NativeStackScreenProps<AuthStackParams, 'Avatar'>;
const image = require('../Img/homepage_bg.png');


const AvatarCreationScreen = ({route, navigation}: Props) => {
  {/**variable dynamique de type Image pour changer l'appercu de l'avatar en cliquand dans la gallerie, on l'initialise avec une image*/}
  // const [avatar, setAvatar] = useState(null) //pr affichage
  const [avatarUrl, setAvatarUrl] = useState(null) //a passer dans db
  const [avatarURLS, setAvatarURLS] = useState([]); //liste des urls de tt les avatars de la db
  const avatarListRef = ref(storage, "AvatarsCompress/");
  //PARTIE A OPTIMISER EST INTERACTION AVEC AVATARCOLUMN (on passe une url o component qui la dl qui passe l'url o screen qui la dl c nul)
  //on remplit la liste des urls de tt les avatars de la db
  const[user, setUser] = useContext(UserContext);
  useEffect(() => {
    list(avatarListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setAvatarURLS((prev) => [...prev, url]);
        })
      })
    })
    console.log(avatarURLS)
  }, [])
  const navigation2 = useNavigation<NativeStackNavigationProp<NoColocStackParams>>();

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
          colocID: "0",
          avatarUrl: avatarUrl
        }
        navigation.navigate('NoColoc')
        setUser(entry); //update du contexte
       setDoc(doc(db, 'Users', userUid),entry); 
      }).catch((error) => {
        switch(error.code){
          case 'auth/email-already-in-use': alert('Cette adresse mail est déjà utilisée !'); navigation.navigate('Signup');
          break;
          case 'auth/invalid-email': alert('Rentre une adresse mail valide !'); navigation.navigate('Signup')
          break;
        }
      });
    
}

//affiche tout les avatars du storage 
const renderContent = () => {
  var render = [] //liste des avatars columns
  for(var i= 0; i<avatarURLS.length; i+=2){
    if(!(i == avatarURLS.length)){
      //push dans rener les avatar columns
      render.push(<AvatarColum imageUrl1={avatarURLS[i]} imageUrl2={avatarURLS[i+1]}  setAvatarUrl={setAvatarUrl} key = {avatarURLS[i]}/>)
    }else{render.push(<AvatarColum imageUrl1={avatarURLS[i]} imageUrl2={null}  setAvatarUrl={setAvatarUrl} key = {avatarURLS[i]}/>)}
  }
  return render;
}

  return (
    
    
<View style={styles.Body} >
    
<ImageBackground source={image} resizeMode="cover" style={styles.first50} imageStyle={{borderBottomRightRadius: 20, borderBottomLeftRadius: 20}}>


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
  
    <Image source={{uri: avatarUrl}} style={styles.BigImage}/>


  </ImageBackground>
    

  <ScrollView style={styles.AvatarGallerie}>  
  {/**Gallerie d'avatars */}
  <ScrollView  
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps='handled'
      >
        {renderContent()}
      {/**component qui prend deux images (la deuxieme peut etre null si pas assez d'images) et qui renvoit une colonne de deux avatars cliquable */}                
      {/* <AvatarColum imageUrl1={avatarURLS[0]} imageUrl2={avatarURLS[1]}  setAvatarUrl={setAvatarUrl}/> */}
      {/* <AvatarColum image1={data[2]} image2={data[3]}  setAvatarUrl={setAvatarUrl}/>
      <AvatarColum image1={data[4]} image2={data[5]}  setAvatarUrl={setAvatarUrl}/>
      <AvatarColum image1={data[6]} image2={data[7]}  setAvatarUrl={setAvatarUrl}/>
      <AvatarColum image1={data[8]} image2={data[9]}  setAvatarUrl={setAvatarUrl}/>
      <AvatarColum image1={data[10]} image2={data[11]}  setAvatarUrl={setAvatarUrl}/>
      <AvatarColum image1={data[12]} image2={data[13]}  setAvatarUrl={setAvatarUrl}/>
      <AvatarColum image1={data[14]} image2={data[15]}  setAvatarUrl={setAvatarUrl}/>
      <AvatarColum image1={data[16]} image2={null} setAvatarUrl={setAvatarUrl}/> */}
  </ScrollView>
    

  
  <TouchableOpacity
  onPress={() => {handleSignup()}}
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