import React, { useCallback, useMemo, useRef } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Top from '../components/Header';
import { BorderRadiuses, SegmentedControl, Spacings } from 'react-native-ui-lib';
import Depense from '../components/DepenseDiagram';
import { ScrollView } from 'react-native-gesture-handler';
import Transaction from '../components/Transaction';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import TopBackNavigation from '../components/TopBackNavigation';



const AllDepense = () => {
  
  const navigation =
  useNavigation<StackNavigationProp<RootStackParams>>();

  return (
 

<View style={styles.container}>
<Top clear={false} name={"nom"}/>
  
  <View style={styles.Title}>
  <TopBackNavigation/>
  <Text style={styles.screenTitle}>Dépense collective</Text>
  </View>
  <View style={{flex: 1}}>


<ScrollView showsVerticalScrollIndicator={false}>
  <View style={{marginBottom: 15}}>
  <Depense/>

  <Text style={styles.DerniereDepense}>Toutes vos transactions</Text>

    <Transaction/>
    <Transaction/>
    <Transaction/>
    <Transaction/>
    <Transaction/>
    <Transaction/>
    <Transaction/>
    <Transaction/>
    <Transaction/>
    <Transaction/>
    <Transaction/>
    <Transaction/>
    <Transaction/>
    <Transaction/>
    <Transaction/>
    <Transaction/>
  </View>

</ScrollView>



</View>

</View>


  );
};



const styles = StyleSheet.create({

  Title: {
    flexDirection : 'row', 
  },

DerniereDepense:{
    fontSize: 19,
    fontWeight: 'bold',
  },
  
screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
},

container: {
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    backgroundColor: '#EDF0FA'
},

})

export default AllDepense;