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
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';
import { getDoc, doc, collection, orderBy, query } from 'firebase/firestore';
import{db} from '../firebase-config'

type Props = NativeStackScreenProps<RootStackParams, 'DepenseStack'>;

const AllDepense = ({route, navigation}: Props) => {
  const [allTransacs] = useCollection(query(collection(db, "Colocs/"+route.params.clcID+ "/Transactions"), orderBy('timestamp')))
  const renderContent = () =>{
    if(allTransacs){
      return(
        allTransacs.docs.map(c => {
          return(
            
            <Transaction key={c.id} giverID={c.data().giverID} receiverID={c.data().receiverID} amount={c.data().amount} desc={c.data().desc}/>
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
<Top name={route.params.username}/>
  
  <View style={styles.Title}>
  <TopBackNavigation/>
  <Text style={styles.screenTitle}>Dépenses collectives</Text>
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