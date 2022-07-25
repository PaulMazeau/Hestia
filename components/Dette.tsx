import React, { useState } from 'react';
import {View, Text, StyleSheet, Image, Modal, ScrollView, TouchableOpacity, Alert} from 'react-native';
import Cross from '../Icons/Cross.svg'

const ProfilImage=require('../Img/test2.png');
//props est amount, deveur, receveur;
const Dette  = (props) => {

  const [modalVisible, setModalVisible] = useState(false);
  
  if(props.amount != 0){
  return (
    <View>
      <TouchableOpacity onPress={() => {setModalVisible(true)}}>
        <View style={styles.container}>
                
                <View style={styles.ImageContainer}>
        <Image source={{uri: props.deveur.avatarUrl}} style={styles.Image}/>
    </View>

          <View style={styles.Text}>
              <View style={styles.Left}>
                  <Text style={styles.titre}>{props.deveur.nom} doit</Text>

                  <View style={styles.dateContainer}>
                      <Text style={styles.date}>à {props.receveur}</Text>
                  </View>
              </View>

              <View style={styles.Right}>
                  <Text style={styles.amout}>{props.amount.toFixed(1)}€</Text>
              </View>

            </View>
            
        </View>
        </TouchableOpacity>
      {/* début du pop up donnant le detail des taches */}
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
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
              <Text style={{fontWeight: '600'}}>{props.receveur}</Text>
            </View>
           </View>


            <TouchableOpacity
              style={[styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textButtonStyle}>Rembourser</Text>
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
    flexDirection: 'row',
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
    flex: 1,
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
  }
  
});

export default Dette;