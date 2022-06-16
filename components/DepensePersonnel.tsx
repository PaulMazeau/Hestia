import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Depense from '../components/DepenseDiagram';
import { ScrollView } from 'react-native-gesture-handler';
import Transaction from '../components/Transaction';
import Avance from './Avance';
import Dette from './Dette';


const DepensePerso = () => {

  return (
  
<View style={{flex: 1}}>
<ScrollView showsVerticalScrollIndicator={false}>
    <Depense/>

                <Text style={styles.DerniereDepense}>Tes transactions</Text>

                <Dette/>
                <Dette/>
                <Avance/>
              </ScrollView>

      </View>       

  );
};

const styles = StyleSheet.create({

  DerniereDepense:{
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 15
  },
  

})

export default DepensePerso;