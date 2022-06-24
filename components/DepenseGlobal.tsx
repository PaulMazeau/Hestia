import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Top from '../components/HeaderDark';
import Depense from '../components/DepenseDiagram';
import { ScrollView } from 'react-native-gesture-handler';
import Transaction from '../components/Transaction';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Equilibrage from './Equilibrage';
import AddDepenseBS from './AddDepenseBS';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import {db} from '../firebase-config';

//type Props = NativeStackScreenProps<RootStackParams, 'DepenseStack'>;


//props est colocID à passer dans la botomsheet
const AllDepense = (props) => {
  //rechercher last transac 
  const[giverID, setGiverID] = useState("");
  const[receiverID, setReceiverID] = useState("");
  const [amount, setAmout] = useState(0);
  const [date, setDate] = useState();
  useEffect( ()=> {
    const getLatestTransac = async () => {
      const q = query(collection(db, "Colocs/"+props.clcID+ "/Transactions"), orderBy('date', 'desc'), limit(1))
      const data = await getDocs(q)
      //marche sans warning est c'est un mystère...
      data.docs.map((doc) => {
        setGiverID(doc.data().giverID);
        setReceiverID(doc.data().receiverID);
        setAmout(doc.data().amount);
        setDate(doc.data().date);
      })
    }
    getLatestTransac();
}, [])

  const navigation =
  useNavigation<StackNavigationProp<RootStackParams>>();
  
  return (
  <View style={{flex:1}}>
      <Text style={styles.DerniereDepense}>Equilibrage</Text>
       <Equilibrage/>
          <View style={styles.Title}>
            <Text style={styles.DerniereDepense}>Dernière Dépense</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ListDepense')} >
              <Text style={styles.VoirToutes}>Voir toutes {'>'}</Text>
             </TouchableOpacity>
          </View>
            <Transaction giverID={giverID} receiverID={receiverID} amount={amount}/>

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


