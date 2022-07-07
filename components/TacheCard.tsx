import { deleteDoc, doc, getDoc, updateDoc } from '@firebase/firestore';
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import { db } from '../firebase-config';
import Horloge from '../Icons/Horloge.svg';
import Valider from '../Icons/Valider.svg'
import { UserContext } from '../Context/userContextFile';

interface Props {
  Tache: string;
}

//props est tache id et colocID et le titre de la tache et la date UNIFORMISER LES NOMS !!!!!!!!
const TacheCard = (props) => {
  const handleDone = async (tacheID, clcID) => {
    const data = await getDoc(doc(db, "Colocs/" + clcID + "/Taches/" + tacheID))
     const justDid = data.data().concerned[0]
     const newConcerned = data.data().concerned
     newConcerned.splice(0, 1);
     newConcerned.push(justDid)
     const doneDate = data.data().date.toDate();
     const recur = data.data().recur
     doneDate.setDate(doneDate.getDate() + Number(recur))
     await updateDoc(doc(db, "Colocs/" + props.clcID + "/Taches/" + props.id), {concerned: newConcerned, date: doneDate})
  }

  var [ isPress, setIsPress ] = useState(<Valider/>);
  

  function handlePress(tacheID, clcID) { 
      setIsPress(<TouchableOpacity onPress={() => handleDone(tacheID, clcID)} style={styles.ButtonConfirm}><Text style={styles.confirmer}> Confirmer ?</Text></TouchableOpacity>);
  }
  
  const renderContent =() => {
    if(props.displayButton){
      return(
        <View style={styles.global}>
      
        <View style={styles.container}>
            <View style={styles.top}>
              <Text style={styles.titre}>{props.Tache}</Text>

              <View style={styles.dateContainer}>
                <Horloge width={17} height={17}/>
                <Text style={styles.date}>{props.date}</Text>
              </View>
            </View>

              <TouchableOpacity onPress={() => {handlePress(props.id, props.clcID)}} style={styles.Button}>
                {isPress}
              </TouchableOpacity>

        </View>
    
    </View>
      )
    }
    return (
      <View style={styles.global}>
      
        <View style={styles.container}>
            <View style={styles.top}>
              <Text style={styles.titre}>{props.Tache}</Text>

              <View style={styles.dateContainer}>
                <Horloge width={17} height={17}/>
                <Text style={styles.date}>{props.day}/{props.month}/{props.year}</Text>
              </View>
            </View>

            <View style={styles.participants}>
              <Image style={styles.avatar1} source={require('../Img/test1.png')}/>
              <Image style={styles.avatar2} source={require('../Img/test2.png')}/>
            </View> 

        </View>
    
    </View>
    )
  }

  return (
    <View>{renderContent()}</View>
    
  );
};

const styles = StyleSheet.create({
  global: {
    elevation: 20,
    shadowColor: 'black',
    shadowOffset: {width: -2, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  
  container: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
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
  

});

export default TacheCard;