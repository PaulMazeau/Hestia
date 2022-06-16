import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Depense from '../components/DepenseDiagram';
import { ScrollView } from 'react-native-gesture-handler';
import Transaction from '../components/Transaction';





const DepensePerso = () => {

  return (
  
<View style={{flex: 1}}>
    <Depense/>
      
      <View style={{flex: 1}}>

              <View>
                <Text style={styles.DerniereDepense}>Tes transactions</Text>
                </View>
                
                <ScrollView showsVerticalScrollIndicator={false}>
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
                <Transaction/>
              </ScrollView>

      </View>       
    </View>
  );
};

const styles = StyleSheet.create({

  DerniereDepense:{
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10
  },
  

})

export default DepensePerso;