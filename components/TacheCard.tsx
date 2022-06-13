import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { Colors, Drawer } from 'react-native-ui-lib';
import Horloge from '../Icons/Horloge.svg';


interface Props {
  Tache: string;
  id: number;
}

const TacheCard:  React.FC<Props> = ({Tache, id}) => {
  return (
    <View style={styles.global}>
      <Drawer 
        rightItems={[{text: 'Supprimer', background: Colors.red30, onPress: () => console.log('remo')}]}
        leftItem={{text: 'Modifier', background: Colors.green30, onPress: () => console.log('change pressed')}}>
        <View style={styles.container}>
            <View style={styles.top}>
              <Text style={styles.titre}>{Tache}</Text>

              <View style={styles.dateContainer}>
                <Horloge width={17} height={17}/>
                <Text style={styles.date}>18 mai</Text>
              </View>
            </View>

            <View>
              <Image style={styles.avatar} source={require('../Img/avatar1.png')}/>
            </View>
        </View>
      </Drawer>
    </View>
    
  );
};

const styles = StyleSheet.create({
  global: {
    marginTop: 12,
  },
  
  container: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
  },
  
  top: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    },


  titre: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 5,
  },

  dateContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  date: {
    fontSize: 14,
    marginLeft: 5,
  },

  avatar: {
    width: 40,
    height: 40,
  },
  
});

export default TacheCard;