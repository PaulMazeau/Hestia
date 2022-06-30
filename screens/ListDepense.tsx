import React, { useCallback, useMemo, useRef, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Top from '../components/HeaderDark';
import { BorderRadiuses, SegmentedControl, Spacings, Drawer, Colors } from 'react-native-ui-lib';
import Depense from '../components/DepenseDiagram';
import { ScrollView } from 'react-native-gesture-handler';
import Transaction from '../components/Transaction';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import TopBackNavigation from '../components/TopBackNavigation';
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';
import { getDoc, doc, collection, orderBy, query, deleteDoc, updateDoc, increment } from 'firebase/firestore';
import{db} from '../firebase-config'
import { RotateInUpLeft } from 'react-native-reanimated';

type Props = NativeStackScreenProps<RootStackParams, 'DepenseStack'>;

const AllDepense = ({route, navigation}: Props) => {
  const [oldData, setOldData] = useState(null);
  const handleDelete = async (id) => {
    const oldDoc = await getDoc(doc(db, "Colocs/"+route.params.clcID +"/Transactions/", id));
    updateSolde(oldDoc);
    await deleteDoc(doc(db, "Colocs/"+route.params.clcID +"/Transactions/", id));

  }
  //update le solde après supression de la transac
  const updateSolde = async (docu) => {
    const areConcerned  = docu.data().receiversID;
    const length = areConcerned.length;
    const amount = docu.data().amount;
    const payeur = docu.data().giverID;
    var payeurIsIn = false;
    for(var i = 0; i<length; i++){
      if(!(areConcerned[i]==payeur)){//si c pas le payeur
        await updateDoc(doc(db, "Users", areConcerned[i]), {solde: increment(+amount/length)});
        
      }else {// si le payeur a payé pr lui aussi
        payeurIsIn = true;
        await updateDoc(doc(db, "Users", areConcerned[i]), {solde: increment(-amount+(amount/length))});
      }
      if(!payeurIsIn){
        await updateDoc(doc(db, "Users", payeur), {solde: increment(-amount)});
      }
    }
  }
  const [allTransacs] = useCollection(query(collection(db, "Colocs/"+route.params.clcID+ "/Transactions"), orderBy('timestamp', 'desc')))
  const renderContent = () =>{
    if(allTransacs){
      return(
        allTransacs.docs.map(c => {
          return(
            <View style={styles.Transaction} key = {c.id}>
            <Drawer 
            rightItems={[{text: 'Supprimer', background: Colors.red30, onPress: () => handleDelete(c.id)}]}
            leftItem={{text: 'Modifier', background: Colors.green30, onPress: () => console.log('2 prout')}}
            key = {c.id}>
            <Transaction key={c.id} giverID={c.data().giverID} receiverID={c.data().receiverID} amount={c.data().amount} desc={c.data().desc}/>
            </Drawer>
            </View>
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
< Top  name={route.params.username} clcName={route.params.clcName}/>
  
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

Transaction: {
  marginTop: 12,
}

})

export default AllDepense;