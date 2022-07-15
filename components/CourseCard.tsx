import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import { Colors, Drawer } from 'react-native-ui-lib';
import {db} from '../firebase-config'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

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
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
        
  
      <View style={styles.body}>
    <Drawer
    rightItems={[{text: 'Supprimer', background: Colors.red30, onPress: () => handleDelete()}]}
    leftItem={{text: 'Supprimer', background: Colors.red30, onPress: () => handleDelete()}}
    style={styles.drawer}
    disableHaptic={false}
    >
    <View style={styles.body}>
    <TouchableOpacity onPress={() => onPress(name)}>
      <View style={styles.container}>
        
        <Image style={styles.categorie} source={require('../Img/test1.png')}/>
        <Text style={styles.name}>{name}</Text>
     
      </View>
      </TouchableOpacity>
    
    </View>
    </Drawer>
    </View>

    </SkeletonTheme>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },

  shadow: {
    elevation: 20,
    shadowColor: 'black',
    shadowOffset: {width: -2, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    backgroundColor: 'white',
    borderRadius: 10,
  },

  name:{
    fontWeight: '600',
    marginLeft: 10,
    fontSize: 16
  },

  body: {
    backgroundColor: 'white',
    borderRadius: 10,
  },

  categorie: {
    width: 40,
    height: 40,
    borderRadius: 50,
    overflow: 'hidden',
    },

  drawer: {
    borderRadius: 10
  },
});

export default RestaurantCard;