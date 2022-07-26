import React, { useContext, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Modal} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import Top from '../components/HeaderSettings';
import TopBackNavigation from '../components/TopBackNavigation';
import * as Haptics from 'expo-haptics';
import {auth} from '../firebase-config'
import {EmailAuthProvider, reauthenticateWithCredential, updatePassword} from 'firebase/auth'
import { UserContext } from '../Context/userContextFile';
import{useToast} from 'react-native-toast-notifications';
import Cross from '../Icons/Cross.svg'

type Props = NativeStackScreenProps<RootStackParams, 'SettingsPerso'>;

const SettingsMdp = ({route, navigation}: Props) => {
 
  const [user, setUser] = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(true);
  const [nom, setNom] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const [loginPwd, setLoginPwd] = React.useState('');
  const toast = useToast();
  const handleUserModif = async () => {
   if(pwd.length<6){
    toast.show("Le mot de passe doit faire plus de 6 caractères!");
    return;
   }
   updatePassword(auth.currentUser, pwd).then(() => {toast.show("Mot de passe modifié !"); navigation.navigate('SettingsPerso')}).catch((err) => {
  toast.show(err.code)
   })
  }


  const handleReLog = () => {
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      loginPwd
  )
  reauthenticateWithCredential(auth.currentUser, credential).then((d) => {if(d){setModalVisible(false); toast.show("Connexion réussie!")}}).catch((err) => {
    switch(err.code){
      case 'auth/wrong-password': toast.show("Mot de passe erroné"); return; break;
      default: toast.show("Erreur..."); return; break;
    }
  })
  }
  return (
    <View>
      < Top avatar={user.avatarUrl} name = {user.nom} clcName ={user.nomColoc}/>
    <View style={styles.container}>
    
    
        <View style={styles.Title}>
          <TopBackNavigation/>
          <Text style={styles.screenTitle}>Changer de mot de passe</Text>
        </View>

      {/* DEBUT DU MODAL */}
      
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.PopUpCentre}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() =>navigation.goBack()} style={styles.crossbutton}>
            <Cross/>
            </TouchableOpacity>
            <Text style={styles.ModalTitleMdp}>Mot de passe actuel</Text>
            <TextInput
                style={styles.inputModal}
                onChangeText={(event) => setLoginPwd(event)}
                value={loginPwd}
                placeholder="********"
                placeholderTextColor = "#A9A9A9"
                secureTextEntry={true}
            />
            <TouchableOpacity
              style={[styles.buttonClose]}
              onPress={() => handleReLog()}
            >
              <Text style={styles.textStyle}>Confirmer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

        {/* FIN DU MODAL */}

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
        },
        
        // STYLE DU MODAL
        PopUpCentre: {
          flex: 1,
          justifyContent: "center",
          backgroundColor:'rgba(0,0,0,0.2)'
        },

        crossbutton: {
          alignItems: 'flex-end',
          zIndex: 2
        },
      
        modalView: {
          margin: 20,
          backgroundColor: "white",
          borderRadius: 12,
          padding: 16,
         
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5
        },
      
        ModalTitle: {
          fontSize: 19,
          fontWeight: '600',
        },
        
        button: {
          borderRadius: 20,
          padding: 10,
          elevation: 2
        },
      
        buttonOpen: {
          backgroundColor: "#F194FF",
        },
      
        buttonClose: {
          backgroundColor: "#172ACE",
          height: 36,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 7
        },
        buttonCloseRetour: {
          backgroundColor: "#cc184b",
          height: 36,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 7
        },
        textStyle: {
          color: "white",
          fontWeight: "bold",
          textAlign: "center"
        },
      
        modalText: {
          marginBottom: 15,
          textAlign: "center"
        },
      
        Repetition: {
          marginBottom: 15
        },
      
        ProchainConcerne: {
          marginBottom: 15,
        },
      
        cardProchainconcerne: {
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10
        },
      
        avatarProchainConcerne: {
          width: 45,
          height: 45,
          borderRadius: 50,
          overflow: 'hidden',
        },
      
        textProchainParticipant: {
          fontSize: 15,
          fontWeight: '400',
          margin: 1
        },
      
        Rotation: {
          marginBottom: 15
        },
      
        ModalTitleMdp: {
          fontWeight: '600',
          fontSize: 19,
          marginBottom: 15,
          textAlign: 'center',
          marginTop: -20
        },

        inputModal:{
          height: 44,
          padding: 10,
          borderRadius: 14,
          backgroundColor: '#EDF0FA',
          marginBottom: 15
        }
})

export default SettingsMdp;