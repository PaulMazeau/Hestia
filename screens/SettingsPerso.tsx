import React, { useContext } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, TextInput} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import Top from '../components/HeaderSettings';
import TopBackNavigation from '../components/TopBackNavigation';
import * as Haptics from 'expo-haptics';
import {auth} from '../firebase-config'
import {signOut} from 'firebase/auth'
import { UserContext } from '../Context/userContextFile';

type Props = NativeStackScreenProps<RootStackParams, 'SettingsPerso'>;



const SettingsPerso = ({route, navigation}: Props) => {
 
  

  // useFocusEffect(
  //   React.useCallback(() => {

      

  //     return () => {

  //      if(nav.canGoBack()){
  //       nav.goBack();
  //      }
  //       // Useful for cleanup functions

  //     };
  //   }, [])
  // );

  const [user, setUser] = useContext(UserContext);

  const [title, onChangeTitre] = React.useState(null);
  const [email, changeemail] = React.useState(null);
  const [motdepasse, resetmotdepasse] = React.useState(null);


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
                onChangeText={onChangeTitre}
                value={title}
                placeholder="Paul"
                
            />
      </View>

      <View style={styles.ChampSettings}>
        <Text style={styles.subTitle}>Adresse Email</Text>
        <TextInput
                style={styles.input}
                onChangeText={changeemail}
                value={email}
                placeholder="pol.mzeau@gmail.com"
                
            />
      </View>

      <View style={styles.ChampSettings}>
        <Text style={styles.subTitle}>Mot de passe</Text>
        <TextInput
                style={styles.input}
                onChangeText={resetmotdepasse}
                value={motdepasse}
                placeholder="********"
                
            />
      </View> 
      <View style={styles.Button}>
          <TouchableOpacity onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); navigation.goBack() }} style={styles.ModifierButton}>
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