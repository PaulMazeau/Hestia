import React, { useState } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { Colors, Drawer } from 'react-native-ui-lib';
import { TouchableOpacity } from 'react-native-ui-lib/src/incubator';
import { Background } from 'victory-native';
import Horloge from '../Icons/Horloge.svg';




//props est name du frelon + url de sa pfp
const CategorieCard = (props) => {
  
  const [participant, setstate] = useState(false);
  return (
    <View style={styles.global}>
            <Image style={[styles.avatar1]} source={props.avatar}/>  
            <Text style={styles.nom} numberOfLines={1}>{props.name}</Text>
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
    backgroundColor: 'rgba(237,240,250, .5)'
  },

  
});

export default CategorieCard;