import React, {  } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Horloge from '../Icons/Horloge.svg';


interface Props {
  Tache: string;
}
//props est tache id et colocID et le titre de la tache et la date UNIFORMISER LES NOMS !!!!!!!!
const TacheCard = (props) => {

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
    
  );
};

const styles = StyleSheet.create({
  global: {
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