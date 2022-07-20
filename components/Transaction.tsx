import { getDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {db} from '../firebase-config'

const ProfilImage=require('../Img/avatarHeader.png');



//Props est giverID, receiverID, amount et

const MonSolde  = (props) => {
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
    <View style={styles.global}>
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

                  <View style={styles.dateContainer}>
                      <Text style={styles.date}>{props.date}</Text>
                  </View>
              </View>

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
  }
});

export default MonSolde;