import { doc, getDoc, updateDoc } from '@firebase/firestore';
import { getDocs, query, where, collection, deleteDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Alert, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { db } from '../firebase-config';
import Horloge from '../Icons/Horloge.svg';
import Valider from '../Icons/Valider.svg'
import ParticipantCard from './ParticipantCard';

interface Props {
  Tache: string;
}
// et aussi recur la récurrence+ les user concernés pr affichange ds modal
//props est tache id + tout les attributs dune tache (nextone, desc, recur, date) et colocID et nextOne ID pr l'affichage de l'avatar url et le titre de la tache et la date UNIFORMISER LES NOMS !!!!!!!!
const TacheCard = (props) => {

  const [modalVisible, setModalVisible] = useState(false);
  
  const handleDone = async () => {
    if(props.recur == '0'){await deleteDoc(doc(db, "Colocs/" + props.clcID + "/Taches/" + props.id))}
    else{
    const data = await getDoc(doc(db, "Colocs/" + props.clcID + "/Taches/" + props.id))
     const justDid = data.data().concerned[0]
     const newConcerned = data.data().concerned
     newConcerned.splice(0, 1);
     newConcerned.push(justDid)
     const doneDate = data.data().date.toDate();
     const recur = data.data().recur
     doneDate.setDate(doneDate.getDate() + Number(recur))
     await updateDoc(doc(db, "Colocs/" + props.clcID + "/Taches/" + props.id), {concerned: newConcerned, date: doneDate, nextOne: newConcerned[0]})
  }}
  const [avatar, setAvatar] = useState("tg le warning");
  const [nextOneName, setNextOneName] = useState("");
  var [ isPress, setIsPress ] = useState(<Valider/>);
  useEffect(() => {
    const getData = async () => {
      const data = await getDoc(doc(db, "Users", props.nextOne));
      setAvatar(data.data().avatarUrl);
      setNextOneName(data.data().nom);     
    }
    getData();
  }, [])

  function handlePress() { 
      setIsPress(<TouchableOpacity onPress={() => {handleDone(); setIsPress(<Valider/>)}} style={styles.ButtonConfirm}><Text style={styles.confirmer}> Confirmer </Text></TouchableOpacity>);
  }
  const renderDate = (date) => {
    if(!date){return ""}
    else{
      const days = ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.']
      const dayIndex = date.toDate().getDay()
      return(days[dayIndex] + " " + date.toDate().getDate().toString())

    }
  }

  const renderRecur = () => {
    if(!props.recur){return ""}
    switch(props.recur){
      case '0': return "Aucune"; break;
      case '1': return "Tous les jours"; break;
      case '2': return "Tous les 2 jours"; break;
      case'3': return "Tous les 3 jours"; break;
      case '7': return "Une fois par semaine"; break;
      case '14': return "Une fois toutes les 2 semaines"; break;
      case '28': return "Une fois par mois"; break;
    }
  }
  //liste des data des concerned
const [concernedList, setConcernedList] = useState([]);
  const getConcernedData = async () => {
    if(props.concerned){
      const q = query(collection(db, "Users"), where('uuid', 'in', props.concerned))
      const querySnapshot = await getDocs(q);
      setConcernedList(querySnapshot.docs.map((doc) => ({...doc.data()})));
  }}
//affichange participantCard
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
//rendu contionnelle de la tache card en fction de si dans mes tasks ou non
  const renderContent =() => {
    if(props.displayButton){
      return(
        <View style={styles.global}>
      <TouchableOpacity onPress={() => {setModalVisible(true); getConcernedData()}}>
        <View style={styles.container}>
            <View style={styles.top}>
              <Text style={styles.titre}>{props.Tache}</Text>

              <View style={styles.dateContainer}>
                <Horloge width={17} height={17}/>
                <Text style={styles.date}>{renderDate(props.date)}</Text>
              </View>
            </View>

              <TouchableOpacity onPress={() => {handlePress()}} style={styles.Button}>
                {isPress}
              </TouchableOpacity>

        </View>
        </TouchableOpacity>
    </View>
      )
    }
    return (
      <View style={styles.global}>
        <TouchableOpacity onPress={() => {setModalVisible(true); getConcernedData()}}>
        <View style={styles.container}>
            <View style={styles.top}>
              <Text style={styles.titre}>{props.Tache}</Text>

              <View style={styles.dateContainer}>
                <Horloge width={17} height={17}/>
                <Text style={styles.date}>{renderDate(props.date)}</Text>
              </View>
            </View>

            <View style={styles.participants}>
              <Image style={styles.avatar1} source={{uri: avatar}}/>
            </View> 

        </View>
        </TouchableOpacity>
    
    </View>
    )
  }

  return (
    <View>
      {renderContent()}
      
     {/* début du MODAL donnant le detail des taches */}
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
            <Text style={styles.ModalTitleTache}>{props.Tache}</Text>

            <View style={styles.Repetition}>
              <Text style={styles.ModalTitle}>Fréquence: <Text style={{fontSize: 17, fontWeight: '400'}}>{renderRecur()}</Text></Text>
            </View>

            <View style={styles.ProchainConcerne}>
            
            
                <Text style={styles.ModalTitle}>Prochain concerné: </Text>
                <View style={styles.cardProchainconcerne}>                
                  <Image source={{uri: avatar}} style={styles.avatarProchainConcerne}/> 

                  <View>
                    <Text style={styles.textProchainParticipant}> {nextOneName} </Text>
                    <Text style={styles.textProchainParticipant}> {renderDate(props.date)} </Text>
                  </View>
                </View>
            </View>

            <View style={styles.Rotation}>
              <Text style={styles.ModalTitle}>Rotation:</Text>
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

    
    
  );
};

const styles = StyleSheet.create({
  global: {
    shadowColor: 'black',
    shadowOffset: {width: -2, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    backgroundColor:"white",
    elevation:2,
    borderRadius:10,    
  },
  
  container: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
  },
  
  top: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    },


  titre: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 5,
  },

  dateContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  date: {
    fontSize: 14,
    marginLeft: 5,
  },

  avatar1: {
    width: 45,
    height: 45,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'white',
    marginLeft: -17,
    zIndex: 1
  },
  
  avatar2: {
    width: 45,
    height: 45,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'white',
    marginLeft: -20,
  },

  participants: {
    flexDirection: 'row',
  },

  Button: {
    backgroundColor: 'blue',
    width: 52,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

  confirmer: {
    color: 'white',
    fontSize: 13,
    textAlign: 'center',
    padding: 5
  },

  ButtonConfirm: {
    backgroundColor: 'blue',
    width: 90,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginRight: 35
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

  ModalTitleTache: {
    fontWeight: '600',
    fontSize: 19,
    marginBottom: 15,
    textAlign: 'center'
  }

});

export default TacheCard;