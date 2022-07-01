import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Top from '../components/HeaderDark';
import Depense from '../components/DepenseDiagram';
import { ScrollView } from 'react-native-gesture-handler';
import Transaction from '../components/Transaction';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Equilibrage from './Equilibrage';
import AddDepenseBS from './AddDepenseBS';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import {db} from '../firebase-config';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';
import { isEmpty } from '@firebase/util';

type Props = NativeStackScreenProps<RootStackParams, 'DepenseStack'>;


// props est colocID à passer dans la botomsheet avec usersList
const AllDepense = (props) => {


//on cherche la dernière transac en placant un ecouteur sur la db
const q = query(collection(db, "Colocs/"+props.clcID+ "/Transactions"), orderBy('timestamp', 'desc'), limit(1));
const [values, loading, error] = useCollection(q);

//on affiche la dernière transac
const getLastestTransac =  () => {
  if(loading){
    <Text>Loading...</Text>
  }
  if(values){
    if(values.docs.length > 0){
    return (
      values.docs.map(v=>{
        return(
          <View style={{marginTop: 12}} key = {v.id}>
            <Transaction key = {v.id} giverID={v.data().giverID} receiversID={v.data().receiversID} amount={v.data().amount} desc={v.data().desc}/>
          </View>
        )
      })
      
      
    )
  }}
  return (
    <Text>PAS DE DEPENSE...</Text>
  )
}

  

  const navigation =
  useNavigation<StackNavigationProp<RootStackParams>>();
  
  return (
  <View style={{flex:1, }}>
      <Text style={styles.DerniereDepense}>Equilibrage</Text>
       <Equilibrage/>
          <View style={styles.Title}>
            <Text style={styles.DerniereDepense}>Dernière Dépense</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ListDepense')} >
              <Text style={styles.VoirToutes}>Voir toutes {'>'}</Text>
             </TouchableOpacity>
          </View>
            {getLastestTransac()}
           

            <AddDepenseBS clcID={props.clcID}/>
            
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

export default AllDepense;


