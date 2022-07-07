import React, { useContext, useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Platform} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthStackParams, RootStackParams } from '../App';
import TopBackNavigationClear from '../components/TopBackNavigationClear';
import AvatarColum from '../components/AvatarColumn';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db, storage } from '../firebase-config';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, list, ref } from 'firebase/storage';
import { UserContext } from '../Context/userContextFile';



type Props = NativeStackScreenProps<RootStackParams, 'Avatarm'>;


const AvatarModificationScreen = ({route, navigation}: Props) => {
  const [avatarUrl, setAvatarUrl] = useState(null) //a passer dans db
  const [avatarURLS, setAvatarURLS] = useState([]); //liste des urls de tt les avatars de la db
  const avatarListRef = ref(storage, "Avatars/");
  const [user, setUser] = useContext(UserContext);
  //PARTIE A OPTIMISER EST INTERACTION AVEC AVATARCOLUMN (on passe une url o component qui va la dl puis passe l'url o screen qui va la dl :c nul)
  //on remplit la liste des urls de tt les avatars de la db
  useEffect(() => {
    list(avatarListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setAvatarURLS((prev) => [...prev, url]);
        })
      })
    })
  }, [])



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

const handleUpdate = async () => {
    await updateDoc(doc(db, "Users", user.uuid), {avatarUrl: avatarUrl});
    const refreshedData = await getDoc(doc(db, "Users", user.uuid)); //update le contexte av la nouvelle pfp
    setUser({...user, avatarUrl: refreshedData.data().avatarUrl});
}


  return (
    
    
<View style={styles.Body} >
    
  <View style={styles.first50}>

        <View style = {styles.Title}>
          <TopBackNavigationClear/>
          <Text style={styles.screenTitle}>Choisi ton Avatar</Text>
        </View>
  
    <Image source={{uri: avatarUrl}} style={styles.BigImage}/>


  </View>
    

  <ScrollView style={styles.AvatarGallerie}>  
  {/**Gallerie d'avatars */}
  <ScrollView  
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps='handled'
      >
        {renderContent()}
     
  </ScrollView>
    

  
  <TouchableOpacity
  onPress={() => {handleUpdate(); navigation.goBack()}}
  >
    <View style={styles.CestPartiBouton}>
      <Text style={styles.CestPartiText}> Selectionner cet avatar</Text>
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

export default AvatarModificationScreen;