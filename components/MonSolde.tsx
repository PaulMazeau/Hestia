import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';


const ProfilImage=require('../Img/avatarHeader.png');

const MonSolde  = () => {
  return (
    <View style={styles.global}>
        <View style={styles.container}>
                
            <ImageContainer image={ProfilImage} />  

            <View style={styles.top}>
                <Text style={styles.titre}>-30,00 EUR</Text>

                <View style={styles.dateContainer}>
                    <Text style={styles.date}>Mon solde</Text>
                </View>
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
    marginTop: 12,
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