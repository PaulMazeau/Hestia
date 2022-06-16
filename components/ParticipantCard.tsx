import React, { useState } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { Colors, Drawer } from 'react-native-ui-lib';
import { TouchableOpacity } from 'react-native-ui-lib/src/incubator';
import Horloge from '../Icons/Horloge.svg';




const ParticipantCard = () => {
  const [participant, setstate] = useState(false);
  return (
    <View style={styles.global}>
      
      <TouchableOpacity  onPress={() => setstate(!participant)}>
        <View style = {[!participant? styles.participant_invalid: styles.participant_valid]}>
            <Image style={styles.avatar1} source={require('../Img/test1.png')}/>
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
    width: 35,
    height: 35,
    borderRadius: 50,
    overflow: 'hidden',
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