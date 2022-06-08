import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { Colors, Drawer } from 'react-native-ui-lib';
import AppButton from './ConfirmButtonTache'


const RestaurantCard  = () => {
  return (
    <Drawer
    rightItems={[{text: 'Read', background: Colors.blue30, onPress: () => console.log('read pressed')}]}
    leftItem={{text: 'Delete', background: Colors.red30, onPress: () => console.log('delete pressed')}}
    >
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.titre}>Ménage Salle de Bain</Text>
          <Text style={styles.date}>18 mai</Text>
        </View>
        <Text style={styles.tag}>Menage</Text>
        <View style={styles.bot}>
        <Image style={styles.avatar} source={require('../Img/avatar1.png')}/>
        <AppButton title="V"/>
        </View>
      </View>
    </TouchableOpacity>
    </Drawer>
    
  );
};

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'flex-end',
    },

  bot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },

  tag: {
    backgroundColor: 'rgba(245, 122, 33, 0.2)',
    width: 'auto',
    alignSelf: 'flex-start',
    padding: 5,
  },

  titre: {
    fontWeight: 'bold',
    fontSize: 20,
  },

  date: {
    fontSize: 14,
  },

  container: {
    backgroundColor: "white",
    padding: 16,
    marginTop: 8,
    borderRadius: 10,

  },
  avatar: {
    width: 40,
    height: 40,
  }
});

export default RestaurantCard;