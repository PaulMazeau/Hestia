import { getDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Modal, Alert, ScrollView} from 'react-native';
import {db} from '../firebase-config'
import ParticipantCard from './ParticipantCard';

const ProfilImage=require('../Img/avatarHeader.png');



//Props est giverID, receiverID, amount et

const Transaction  = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [whoPaidName, setWhoPaidName] = useState("");
  const [whoPaidAvatar, setWhoPaidAvatar] = useState("not an empty string lol"); //pr se débarasser du warning 
  useEffect(() => {
    const getWhoPaid = async () =>{
      const data = await getDoc(doc(db, "Users", props.giverID));
      setWhoPaidName(data.data().nom);
      setWhoPaidAvatar(data.data().avatarUrl)
    }
    getWhoPaid();
  }, [])

  return (
    <View>
    <View style={styles.global}>
      <TouchableOpacity onPress={() => {setModalVisible(true)}}>
        <View style={styles.container}>
                
        <View style={styles.ImageContainer}>
        <Image source={{uri: whoPaidAvatar}} style={styles.Image}/>
    </View>  

          <View style={styles.Text}>
              <View style={styles.Left}>
                  <Text style={styles.titre}>{props.desc}</Text>

                  <View style={styles.payeurContainer}>
                      <Text style={styles.date}>Payé par {whoPaidName}</Text>
                  </View>
              </View>

              <View style={styles.Right}>
                  <Text style={styles.titre}>{props.amount}€</Text>
              </View>

            </View>
        </View>
        </TouchableOpacity>
    </View>
<View>
<Modal
animationType="slide"
transparent={true}
visible={modalVisible}
onRequestClose={() => {
  Alert.alert("Modal has been closed.");
  setModalVisible(!modalVisible);
}}
>
<View style={styles.PopUpCentre}>
  <View style={styles.modalView}>
    <Text style={styles.ModalTitleTache}>{props.desc}</Text>

    <View style={styles.Date}>
      <Text style={styles.ModalTitle}>Payé le: 22/22/22</Text>
    </View>

    <View style={styles.Montant}>
        <Text style={styles.ModalTitle}>Montant: {props.amount}€</Text>
    </View>

        <View style={styles.Payeur}>                     
            <Text style={styles.ModalTitle}>Payeur: {whoPaidName}</Text>
        </View>
    

    <View style={styles.Participant}>
      <Text style={styles.ModalTitle}>Pour qui:</Text>
      <View style={{flexDirection: 'row'}}>
      <ScrollView  
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps='handled'>
              <ParticipantCard/>
              <ParticipantCard/>
              <ParticipantCard/>
              <ParticipantCard/>
      </ScrollView>
      </View>
    </View>

    <TouchableOpacity
      style={[styles.buttonClose]}
      onPress={() => setModalVisible(!modalVisible)}
    >
      <Text style={styles.textStyle}>Confirmer</Text>
    </TouchableOpacity>
  </View>
</View>
</Modal>
</View>
    </View>
  );
};



const styles = StyleSheet.create({
  global: {
    backgroundColor:'white',
    shadowColor: 'black',
    shadowOffset: {width: -2, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  
  container: {
    elevation: 2,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
  },
  
  Left: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: 10
    },

  Right: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: 10,
    alignItems: 'center',
    
  },

  titre: {
    fontWeight: '600',
    fontSize: 19,

  },

  dateContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  payeurContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
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
    flex: 1,
  },

  //STYLE DU MODAL

  PopUpCentre: {
    flex: 1,
    justifyContent: "center",
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

  buttonClose: {
    backgroundColor: "#172ACE",
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

  Date: {
    marginBottom: 15
  },

  Montant: {
    marginBottom: 15,
  },

  Payeur: {
    marginBottom: 15,
  },

  Participant: {
    marginBottom: 15
  },

  ModalTitleTache: {
    fontWeight: '600',
    fontSize: 19,
    marginBottom: 15,
    textAlign: 'center'
  }
});

export default Transaction;