import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground} from 'react-native';
import { BorderRadiuses } from 'react-native-ui-lib';


const ImgBg=require('../Img/MiniJeu.png');


//props est le solde de l'utilisateur obtenu après connexion a la db
const MiniJeu  = () => {

  return (
    <View style={styles.global}>
        <ImageBackground source={ImgBg} resizeMode="cover" imageStyle={{borderRadius: 10}}>
      <TouchableOpacity onPress={() => console.log('mini jeu')}>
        <View style={styles.container}>
            <View>
                <Text style={styles.titre}> Mini jeu</Text>
                <Text style={styles.texte}>Coming Soon</Text>
            </View>
        </View>
        </TouchableOpacity>
        </ImageBackground>
    </View>
    
  );
};

const styles = StyleSheet.create({
  global: {
    marginTop: 12,
    shadowColor: 'black',
    shadowOffset: {width: -2, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    width: '42.5%',
    elevation: 2,
    borderRadius:10
    
  },
  
  container: {
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
  },

  titre: {
    fontWeight: '600',
    fontSize: 19,
    color: 'white',
  },

  texte: {
    fontSize: 14,
    color: 'white',
    marginLeft: 5
  },
});

export default MiniJeu;