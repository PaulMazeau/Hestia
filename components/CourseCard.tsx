import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType, ColorValue } from 'react-native';
import { Colors, Drawer } from 'react-native-ui-lib';
import {db} from '../firebase-config'
import ContentLoader, { Rect } from 'react-content-loader/native';

const MyLoader = () => ( 
  <ContentLoader 
  speed={1}
  backgroundColor={'white'}
  foregroundColor={'#DDD'}
  >
  <Rect x="0" y="0" rx="10" ry="10" width="100%" height="275" />
  <Rect x="0" y="285" rx="10" ry="10" width="100%" height="25" />
  <Rect x="0" y="320" rx="10" ry="10" width="100%" height="50" />
  <Rect x="0" y="380" rx="10" ry="10" width="100%" height="50" />
  <Rect x="0" y="440" rx="10" ry="10" width="100%" height="50" />
  </ContentLoader>)

interface Props {
  name: string;
  onPress: (name: string) => void;
  courseID: string;
  clcID: string;
  image: ImageSourcePropType;
}

const RestaurantCard: React.FC<Props> = ({name, onPress, courseID, clcID, image}) => {
  const handleDelete = async () => {
    await deleteDoc(doc(db, "Colocs/"+clcID+"/Courses", courseID));
  }
  return (      
      <View style={[styles.body, styles.shadow]}>
    <Drawer
    rightItems={[{text: 'Supprimer', background: Colors.red30, onPress: () => handleDelete()}]}
    leftItem={{text: 'Supprimer', background: Colors.red30, onPress: () => handleDelete()}}
    style={styles.drawer}
    disableHaptic={false}
    >
    <View style={styles.sousbody}>
    <TouchableOpacity onPress={() => onPress(name)}>
      <View style={styles.container}>
        <Image style={styles.categorie} source={image}/>
        <Text style={styles.name}>{name}</Text>
     
      </View>
      </TouchableOpacity>
    
    </View>
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
    alignItems: 'center',
    height: 60,
  },

  shadow: {
    elevation: 2,
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
    marginLeft: 16,
    marginRight: 16
  },

  sousbody: {
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