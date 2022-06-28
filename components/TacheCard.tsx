import { deleteDoc, doc } from 'firebase/firestore';
import React, { useCallback, useRef } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { Colors, Drawer } from 'react-native-ui-lib';
import Horloge from '../Icons/Horloge.svg';
import {db} from '../firebase-config';
import EditTaskBS from './EditTaskBS';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';


interface Props {
  Tache: string;
}
//props est tache id et colocID et le titre de la tache et la date UNIFORMISER LES NOMS !!!!!!!!
const TacheCard = (props) => {

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "Colocs/"+props.clcID +"/Taches/", id));
  }

  return (
    <View style={styles.global}>
      <Drawer 
        rightItems={[{text: 'Supprimer', background: Colors.red30, onPress: () => handleDelete(props.tacheID)}]}
        leftItem={{text: 'Modifier', background: Colors.green30, onPress: () => console.log('prout')}}>
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
      </Drawer>

    </View>
    
  );
};

const styles = StyleSheet.create({
  global: {
    marginTop: 12,
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
  }
});

export default TacheCard;