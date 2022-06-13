import React, { useCallback, useMemo, useRef } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button, TextInput, DeviceEventEmitter} from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import Top from '../components/HeaderDark';
import { BorderRadiuses, SegmentedControl, Spacings } from 'react-native-ui-lib';
import Depense from '../components/DepenseDiagram';
import { ScrollView } from 'react-native-gesture-handler';
import Transaction from '../components/Transaction';




const DepenseScreen = () => {

  return (
  <View>
        <Top/>
      <View style={styles.container}>
        
          <Text style={styles.screenTitle}>Gestion des dépenses</Text>

          <SegmentedControl 
        containerStyle={styles.control}
        segments={[{label: 'Tâches générales'}, {label: 'Mes tâches'}]}
        activeColor='black'
        borderRadius={BorderRadiuses.br20}
        backgroundColor='white'
        activeBackgroundColor='rgba(23,42,206,0.27)'
        inactiveColor='black'
        outlineColor= 'white'
        outlineWidth= {2}
        />
         
       <Depense/>
        <ScrollView>
          <View style={styles.Title}>
            <Text style={styles.DerniereDepense}>Dernière Dépense</Text>
            <TouchableOpacity>
              <Text style={styles.VoirToutes}>Voir toutes {'>'}</Text>
             </TouchableOpacity>
          </View>
            <Transaction/>
        </ScrollView>

        </View>


    </View>



  );
};

const styles = StyleSheet.create({

  container: {
      paddingBottom: 16,
      paddingLeft: 16,
      paddingRight: 16,
  },
  screenTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 15,
  },
  control: {
    marginBottom: 15,
  },

  Title:  {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  DerniereDepense:{
    fontSize: 19,
    fontWeight: 'bold',
  },
  
  VoirToutes: {
  fontSize: 14,
  color: '#8F8F8F',
  },
})

export default DepenseScreen;