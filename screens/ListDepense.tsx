import React, { useCallback, useMemo, useRef } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Top from '../components/HeaderDark';
import { BorderRadiuses, SegmentedControl, Spacings } from 'react-native-ui-lib';
import Depense from '../components/DepenseDiagram';
import { ScrollView } from 'react-native-gesture-handler';
import Transaction from '../components/Transaction';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import TopBackNavigation from '../components/TopBackNavigation';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getDoc, doc, collection, orderBy, query } from 'firebase/firestore';
import{db} from '../firebase-config'

type Props = NativeStackScreenProps<RootStackParams, 'DepenseStack'>;

const AllDepense = ({route, navigation}: Props) => {
  const renderContent = () =>{

    const [allTransacs] = useCollectionData(query(collection(db, "Colocs/"+route.params.clcID+ "/Transactions"), orderBy('date', 'desc')))
    if(allTransacs){
      return(
        allTransacs.map(c => {
          return(
            
            <Transaction key={c.id} giverID={c.giverID} receiverID={c.receiverID} amount={c.amount}/>
          )
    
        })
      )
      return (
        <Text>Loading........</Text>
      )
    } 
  
    }


  return (
 

<View style={styles.container}>
<Top/>
  
  <View style={styles.Title}>
  <TopBackNavigation/>
  <Text style={styles.screenTitle}>Dépense collective</Text>
  </View>
  <View style={{flex: 1}}>


<ScrollView showsVerticalScrollIndicator={false}>
  <View style={{marginBottom: 15}}>
  <Depense/>

  <Text style={styles.DerniereDepense}>Toutes vos transactions</Text>

    {renderContent()}
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