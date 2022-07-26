import { addDoc, collection, getDoc, serverTimestamp, doc } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import {View, Text, StyleSheet, Image, Modal, ScrollView, TouchableOpacity, Alert} from 'react-native';
import { ReloadContext, UserContext } from '../Context/userContextFile';
import Cross from '../Icons/Cross.svg'
import {db} from '../firebase-config'
import {useToast} from 'react-native-toast-notifications';
//props est amount, deveur, receveur;
const delay = ms => new Promise(res => setTimeout(res, ms));
const Dette  = (props) => {
  const [reload, setReload] = useContext(ReloadContext);
  const [user, setUser] = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const toast = useToast();
  const handleRemboursement = async () => {
    try{
    await addDoc(collection(db, "Colocs/" + user.colocID + "/Transactions"), {timestamp: serverTimestamp(), amount: props.amount, giverID: props.deveur.uuid, receiversID: [props.receveur.uuid], desc: "rbrsmnt", concerned: [props.deveur.uuid, props.receveur.uuid]})
    toast.show(props.receveur.nom + " te remercie!", {
      type: "success",})
    }catch(err){
      toast.show("Erreur lors de la connection au serveur", {
        type: "danger",})
    }
    setReload(true)
    if(props.receveur.uuid == user.uuid || props.deveur.uuid == user.uuid){
    const refreshedData = await getDoc(doc(db, "Users", user.uuid))
    setUser({...user, solde: refreshedData.data().solde})} //update le contexte av le nouvo solde 
    await delay(3000);
    setReload(false);
  }
  if(props.amount != 0){
  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {setModalVisible(true)}} style={styles.ImagePlusText}>
          <View style={styles.ImageContainer}>
          <Image source={{uri: props.deveur.avatarUrl}} style={styles.Image}/>
          </View>

          <View style={styles.Text}>
              <View style={styles.Left}>
                  <Text style={styles.titre}>{props.deveur.nom} doit</Text>

                  <View style={styles.dateContainer}>
                      <Text style={styles.date}>à {props.receveur.nom}</Text>
                  </View>
              </View>

              <View style={styles.Right}>
                  <Text style={styles.amout}>{props.amount.toFixed(1)}€</Text>
              </View>

          </View>
          </TouchableOpacity>
        </View>
      {/* début du pop up donnant le detail des taches */}
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
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.crossbutton}>
            <Cross/>
            </TouchableOpacity>
            <Text style={styles.ModalTitleRemboursement}>Remboursement</Text>


           <View style={styles.contentModal}>
             <View style={styles.profilcard}>
              <Image source={{uri: props.deveur.avatarUrl}} style={styles.ImageModal}/>
              <Text style={{fontWeight: '600'}}>{props.deveur.nom}</Text>
            </View>
              <Image source={require('../Img/animationRemboursement.gif')} style={styles.AnimationModal}/>
            <View style={styles.profilcard}>
              <Image source={{uri: props.receveur.avatarUrl}} style={styles.ImageModal}/>
              <Text style={{fontWeight: '600'}}>{props.receveur.nom}</Text>
            </View>
           </View>


            <TouchableOpacity
              style={[styles.buttonClose]}
              onPress={() => {setModalVisible(!modalVisible); handleRemboursement()}}
            >
              <Text style={styles.textButtonStyle}>Enregistrer le remboursement des {props.amount.toFixed(1).toString()} €</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )};
  return(
    <View><Text>C'est carrée</Text></View>
  )
};



const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    height: 70,
    marginBottom: 15,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: {width: -2, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  
  Left: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: 10
    },

  Right: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
    alignItems: 'center'
  },

  titre: {
    fontWeight: '600',
    fontSize: 19,
  },

  dateContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },

  date: {
    fontSize: 14,
  },

  avatar: {
    width: 40,
    height: 40,
  },

  ImageContainer: {
    height: 40,
    width: 40,
    overflow: 'hidden',
    borderRadius: 7,
},
    Image: {
        height: '100%',
        width: '100%',
    },

  Text:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:'100%'
  },
  
  amout: {
    fontWeight: '600',
    fontSize: 23,
  },

  // Style du modal

  PopUpCentre: {
    flex: 1,
    justifyContent: "center",
    backgroundColor:'rgba(0,0,0,0.2)'
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

  crossbutton: {
    alignItems: 'flex-end',
    zIndex: 2
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

  textButtonStyle: {
    color: 'white',
  },

  ModalTitleRemboursement: {
    fontWeight: '600',
    fontSize: 19,
    marginBottom: 15,
    textAlign: 'center',
    marginTop: -20
  },

  contentModal: {
  flexDirection: 'row',
  justifyContent:'space-between',
  alignItems: 'center'
  },

  ImageModal: {
    width: 75,
    height: 75,
    marginBottom: 7,
    borderRadius: 50
  },

  AnimationModal:{
    width: 120,
    height: 120,
    transform: [{ rotate: '270deg'}]
  },

  profilcard: {
    alignItems: 'center'
  },

  ImagePlusText:{
    width:'100%', 
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'center', 
    paddingLeft:20, 
    paddingRight:20
  }
  
});

export default Dette;
