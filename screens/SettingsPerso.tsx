import React, { useContext } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, TextInput} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import Top from '../components/HeaderSettings';
import TopBackNavigation from '../components/TopBackNavigation';
import * as Haptics from 'expo-haptics';
import {auth, db} from '../firebase-config'
import {signOut, updatePassword} from 'firebase/auth'
import { UserContext } from '../Context/userContextFile';
import { updateDoc, doc } from 'firebase/firestore';

type Props = NativeStackScreenProps<RootStackParams, 'SettingsPerso'>;



const SettingsPerso = ({route, navigation}: Props) => {
 
  const [user, setUser] = useContext(UserContext);

  const [nom, setNom] = React.useState('');
  const [pwd, setPwd] = React.useState('');

  const handleUserModif = async () => {
    if(pwd.length == 0 && nom.length !=0){
      if(nom.length <= 2){alert("Ton nom d'utilisateur doit faire plus de 3 caractères !"); return}
      else{
        await updateDoc(doc(db, "Users", user.uuid), {nom: nom})
        setUser({...user, nom: nom});
        alert('Nom changé !')
        navigation.goBack()
      }
    }
    if(pwd.length != 0 && nom.length==0){

    } 
  }
  return (
    <View>
      < Top avatar={user.avatarUrl} name = {user.nom} clcName ={user.nomColoc}/>
    <View style={styles.container}>
    
    
        <View style={styles.Title}>
          <TopBackNavigation/>
          <Text style={styles.screenTitle}>Paramètres</Text>
        </View>

   <View style={styles.ChampSettings}>
        <Text style={styles.subTitle}>Nom</Text>
        <TextInput
                style={styles.input}
                onChangeText={(event) => setNom(event)}
                value={nom}
                placeholder={user.nom}
                placeholderTextColor = "#A9A9A9"
            />
      </View>
      <View style={styles.ChampSettings}>
        <Text style={styles.subTitle}>Mot de passe</Text>
        <TextInput
                style={styles.input}
                onChangeText={(event) => setPwd(event)}
                value={pwd}
                placeholder="********"
                placeholderTextColor = "#A9A9A9"
                secureTextEntry={true}
            />
      </View> 
      <View style={styles.Button}>
          <TouchableOpacity onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); handleUserModif() }} style={styles.ModifierButton}>
            <Text style={styles.Modifier}>Sauvegarder</Text>
          </TouchableOpacity>
        </View>
     </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
    
        container: {
          paddingBottom: 16,
          backgroundColor: '#EDF0FA',
          height: '100%',
          paddingLeft: 16,
          paddingRight: 16,
        },

        screenTitle: {
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 15,
          marginTop: 10,
        },

        input: {
          height: 44,
          marginTop: 13,
          padding: 10,
          borderRadius: 14,
          backgroundColor: 'white'
        },

        ChampSettings: {
          marginBottom: 15
      },

      subTitle: {
        fontSize: 16,
        fontWeight: '500'
      },
      
        Title: {
          flexDirection : 'row', 
          marginBottom : 10,
        },

        name:{
          fontWeight: '700'
        },

        ModifierButton: {
          height: 40,
          borderRadius: 5,
          backgroundColor: '#172ACE',
          width: 154,
          justifyContent: 'center',
        },

        Modifier: {
          fontSize: 16,
          fontWeight: '600',
          color: 'white',
          textAlign: 'center',
        },

        Button: {
            alignItems: 'flex-end'
        }
        
})

export default SettingsPerso;