import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Prout from '../Icons/Prout.svg'
import {useToast} from 'react-native-toast-notifications';
const SelectionImg = require('../Img/Selection.png')

const Selection  = () => {
    const toast = useToast()
  return (
    <View style={styles.global}>
    
        <View style={styles.container}>
                
            <View style={styles.Top}>

                    <Text style={styles.text}>
                        Découvrez une selection de recettes, {'\n'}sorties, jeux et restaurants à faire {'\n'}entre colocataires.
                    </Text>
            </View>

           <View style={styles.Bot}>
                <TouchableOpacity style={styles.Button}>
                    <View style={styles.Bottom}>
                        <Text style={styles.ButtonText}>Découvrir la selection</Text>
                        <Prout/>
                    </View>
                </TouchableOpacity>
                <ImageContainer image={SelectionImg} />


            </View>

        </View>

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
    height: 142,
    justifyContent: 'space-between'
  },
  
  Top: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    },

    text:{
        fontSize: 14
    },

    Bottom: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    ButtonText: {
        fontSize: 14,
        fontWeight: '700',
        marginRight: 10,
        color:'white',
        marginLeft: 10,
    },

    Button: {
        backgroundColor: '#172ACE',
        borderRadius: 5,
        height: 35,
        justifyContent: 'center',
        width: '60%'
    },

    ImageContainer: {
        height: 60,
        width: 60,
        overflow: 'hidden',
        borderRadius: 7,
    },

    Image: {
        height: '100%',
        width: '100%',
    },
  
    Bot: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent:'space-between'
    }
});

export default Selection;