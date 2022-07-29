import React, { useState } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


//props est name du frelon + url de sa pfp
const ParticipantCard = (props) => {
  const [participant, setstate] = useState(false);
  return (
    <View style={styles.global}>
      
      <TouchableOpacity  onPress={() => setstate(!participant)}>
        <View style = {[!participant? styles.participant_invalid: styles.participant_valid]}>
            <Image style={styles.avatar1} source={{uri: props.avatar}}/>
              <Text style={styles.nom} numberOfLines={1}>{props.name}</Text>
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
    marginTop: 7
  },

  avatar1: {
    width: 40,
    height: 40,
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
    marginRight: 8,
    padding: 5
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
    marginRight: 8,
    padding: 5
  },
  
});

export default ParticipantCard;