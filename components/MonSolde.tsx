import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { RootStackParams } from '../App';


const ProfilImage=require('../Img/avatarHeader.png');

const MonSolde  = () => {

  const navigation =
  useNavigation<StackNavigationProp<RootStackParams>>();

  return (
    <View style={styles.global}>
      <TouchableOpacity onPress={() => navigation.navigate('DepenseStack')}>
        <View style={styles.container}>
                
            <ImageContainer image={ProfilImage} />  

            <View style={styles.top}>
                <Text style={styles.titre}>-30,00 EUR</Text>

                <View style={styles.dateContainer}>
                    <Text style={styles.date}>Mon solde</Text>
                </View>
            </View>
        </View>
        </TouchableOpacity>
    </View>
    
  );
};

const ImageContainer = ({image}) => (
    <View style={styles.ImageContainer}>
        <Image source={image} style={styles.Image}/>
    </View>
);

const styles = StyleSheet.create({
  global: {
    marginTop: 12,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: {width: -2, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    margin:5,
    backgroundColor:"white",
    borderRadius:10
  },
  
  container: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
  },
  
  top: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: 10
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
    marginLeft: 5,
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
  
});

export default MonSolde;