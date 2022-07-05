import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { Colors, Drawer } from 'react-native-ui-lib';
import {db} from '../firebase-config'

interface Props {
  name: string;
  onPress: (name: string) => void;
  courseID: string;
  clcID: string;
}

const RestaurantCard: React.FC<Props> = ({name, onPress, courseID, clcID}) => {
  const handleDelete = async () => {
    await deleteDoc(doc(db, "Colocs/"+clcID+"/Courses", courseID));
  }
  return (
    <View style={styles.body}>
    <TouchableOpacity onPress={() => onPress(name)}>
    <Drawer
    rightItems={[{text: 'Supprimer', background: Colors.red30, onPress: () => handleDelete()}]}
    leftItem={{text: 'Supprimer', background: Colors.red30, onPress: () => handleDelete()}}
    style={styles.drawer}
    disableHaptic={false}
    >  
      <View style={styles.container}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.participants}>
        <Image style={styles.avatar1} source={require('../Img/test1.png')}/>
        <Image style={styles.avatar2} source={require('../Img/test2.png')}/>
        </View>
      </View>
       </Drawer>
    </TouchableOpacity>
   
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
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: {width: -2, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    backgroundColor: 'white',
    borderRadius: 10,
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
  },

  drawer: {
    borderRadius: 10
  }
});

export default RestaurantCard;