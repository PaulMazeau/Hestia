import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { Colors, Drawer } from 'react-native-ui-lib';

interface Props {
  name: string;
  onPress: (name: string) => void;
}

const RestaurantCard: React.FC<Props> = ({name, onPress}) => {
  return (
    <View style={styles.body}>
    <Drawer
    rightItems={[{text: 'Supprimer', background: Colors.red30, onPress: () => console.log('remo')}]}
    leftItem={{text: 'Modifier', background: Colors.green30, onPress: () => console.log('change pressed')}}>    
    <TouchableOpacity onPress={() => onPress(name)}>
      <View style={styles.container}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.participants}>
        <Image style={styles.avatar1} source={require('../Img/test1.png')}/>
        <Image style={styles.avatar2} source={require('../Img/test2.png')}/>
        </View>
      </View>
    </TouchableOpacity>
    </Drawer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  },

  name:{
    fontWeight: '700'
  },

  body: {
    marginBottom: 15,
    elevation: 20,
    shadowColor: 'black',
    shadowOffset: {width: -2, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  avatar1: {
    width: 40,
    height: 40,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'white',
    marginLeft: -17,
    zIndex: 1
  },
  
  avatar2: {
    width: 40,
    height: 40,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'white',
    marginLeft: -20,
  },

  participants: {
    flexDirection: 'row',
  }
});

export default RestaurantCard;