import React, { useCallback, useMemo, useRef } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Top from '../components/HeaderDark';
import { BorderRadiuses, SegmentedControl, Spacings } from 'react-native-ui-lib';
import Depense from '../components/DepenseDiagram';
import { ScrollView } from 'react-native-gesture-handler';
import Transaction from '../components/Transaction';

const DepensePerso = () => {

  return (
  <View>

         
       <Depense/>
        <ScrollView>
          <View style={styles.Title}>
            <Text style={styles.DerniereDepense}>Dernière Dépense</Text>
          </View>
            <Transaction/>
            <Transaction/>
            <Transaction/>
            <Transaction/>
        </ScrollView>

        </View>
  );
};

const styles = StyleSheet.create({

  Title:  {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  DerniereDepense:{
    fontSize: 19,
    fontWeight: 'bold',
  },
  

})

export default DepensePerso;