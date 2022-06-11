import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { Colors, Drawer } from 'react-native-ui-lib';

interface Props {
  name: string;
  onPress: (name: string) => void;
}

const RestaurantCard: React.FC<Props> = ({name, onPress}) => {
  return (
    <Drawer
    rightItems={[{text: 'Supprimer', background: Colors.red30, onPress: () => console.log('remo')}]}
    leftItem={{text: 'Modifier', background: Colors.green30, onPress: () => console.log('change pressed')}}>    
    <TouchableOpacity onPress={() => onPress(name)}>
      <View style={styles.container}>
        <Text style={styles.name}>{name}</Text>
        <Image style={styles.avatar} source={require('../Img/avatar1.png')}/>
      </View>
    </TouchableOpacity>
    </Drawer>
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
    marginBottom: 10,
  },

  avatar: {
    width: 36,
    height: 36,
  },

  name:{
    fontWeight: '700'
  }
});

export default RestaurantCard;