import React, { useState } from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import { Colors, Drawer } from 'react-native-ui-lib';
import { TouchableOpacity } from 'react-native-ui-lib/src/incubator';
import Horloge from '../Icons/Horloge.svg';




const ParticipantCard = () => {

  

  
  const [participant, setstate] = useState(false);
  return (
    <View style={styles.global}>
      
      <TouchableOpacity  onPress={() => setstate(!participant)}>
        <View style = {[!participant? styles.participant_invalid: styles.participant_valid]}>
            <Image style={styles.avatar1} source={require('../Img/Caddie-min.png')}/>
              <Text style={styles.nom}>Paul</Text>
        </View>
      </TouchableOpacity>

    </View>
    
  );
};

const styles = StyleSheet.create({
  global: {
    marginTop: 12,
  },

  nom: {
    fontWeight: '600',
    fontSize: 13,
  },

  avatar1: {
    width: 40,
    height: 40,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: 'lightblue'
  },

  participant_invalid : {
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: 'center',
    height: 80,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    width: 64,
    justifyContent: 'center',
    marginRight: 8
  },
  participant_valid : {
    backgroundColor: 'rgba(237,240,250, .5)',
    borderRadius: 10,
    alignItems: 'center',
    height: 80,
    borderWidth: 1,
    borderColor: '#172ACE',
    width: 64,
    justifyContent: 'center',
    marginRight: 8
  },
  
});

export default ParticipantCard;