import { getDoc, doc, query, where, getDocs, collection } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Modal, ScrollView} from 'react-native';
import {db} from '../firebase-config'
import ParticipantCard from './ParticipantCard';

const ProfilImage=require('../Img/avatarHeader.png');



//Props est giverID, receiverID, amount et date et concerned, et desc

//si desc esr rbrsmnt alors c un remboursement

const Transaction  = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [whoPaidName, setWhoPaidName] = useState("");
  const [whoPaidAvatar, setWhoPaidAvatar] = useState("not an empty string lol"); //pr se débarasser du warning 
  const [concernedList, setConcernedList] = useState([]);
  const [whoGotRemboursed, setWhoGotRemboursed] = useState('')
 
  useEffect( () => {
    let isCanceled = false;
    getDoc(doc(db, "Users", props.giverID)).then((d) => {if(!isCanceled){
      setWhoPaidAvatar(d.data().avatarUrl); setWhoPaidName(d.data().nom)}});
    return () => {isCanceled = true}
  }, [])
  const renderDate = (date) => {
    if(!date){return ""}
    else{
      const days = ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.']
      const months = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aout', 'Sept', 'Oct', 'Nov', 'Dec']
      const monthIndex = date.toDate().getMonth()
      const dayIndex = date.toDate().getDay()
      return(days[dayIndex] + " " + date.toDate().getDate().toString() + " " + months[monthIndex])

    }
  }
  const getConcernedData = async () => {
    if(props.concerned){
      const q = query(collection(db, "Users"), where('uuid', 'in', props.concerned))
      const querySnapshot = await getDocs(q);
      setConcernedList(querySnapshot.docs.map((doc) => ({...doc.data()})));
  }}

  const renderUsers = () => {
    if(concernedList){
    return(
      concernedList.map((user)=> {
        
        return(
          <ParticipantCard key ={user.uuid} name={user.nom} avatar={user.avatarUrl}/>

        )
      })
    )
  }}

  const renderContent =  () => {
    if(props.desc == "rbrsmnt"){
      return(
        <View style={styles.Text}>
          <View style={styles.Left}>
            <Text style={styles.titre}>{whoPaidName}</Text>

            <View style={styles.payeurContainer}>
              <Text style={styles.date}>a remboursé </Text>
            </View>
          </View>

          <View style={styles.Right}>
              <Text style={styles.titre}>{props.amount.toFixed(1)}€</Text>
          </View>
        </View>
      )
    }else{
      return(
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
      )
    }
  }
  return (
  <View>
    <View style={styles.global}>
      <TouchableOpacity onPress={() => {setModalVisible(true); getConcernedData()}}>
      <View style={styles.container}>
                
                
        <View style={styles.ImageContainer}>
        <Image source={{uri: whoPaidAvatar}} style={styles.Image}/>
        </View>  
        {renderContent()}
      </View>
      </TouchableOpacity>
    </View>
  <View>
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
    <Text style={styles.ModalTitleTache}>{props.desc}</Text>

    <View style={styles.Date}>
      <Text style={styles.ModalTitle}>Payé le: {renderDate(props.date)}</Text>
    </View>

    <View style={styles.Montant}>
        <Text style={styles.ModalTitle}>Montant: {props.amount}€</Text>
    </View>

        <View style={styles.Payeur}>                     
            <Text style={styles.ModalTitle}>Payeur: {whoPaidName}</Text>
        </View>
    

    <View style={styles.Participant}>
      <Text style={styles.ModalTitle}>Pour:</Text>
      <View style={{flexDirection: 'row'}}>
      <ScrollView  
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps='handled'>
              {renderUsers()}
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
    elevation: 2,
    backgroundColor:'white',
    borderRadius:10,
    shadowColor: 'black',
    shadowOffset: {width: -2, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3
  },
  
  container: {
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
    backgroundColor:'rgba(0,0,0,0.25)'
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
    fontWeight: '600'
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

function setConcernedList(arg0: any[]) {
  throw new Error('Function not implemented.');
}
