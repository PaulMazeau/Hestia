import React, {  } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Transaction from '../components/Transaction';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Equilibrage from './Equilibrage';
import AddDepenseBS from './AddDepenseBS';
import { collection, limit, orderBy, query } from 'firebase/firestore';
import {db} from '../firebase-config';
import { useCollection } from 'react-firebase-hooks/firestore';
import ContentLoader, { Circle, Rect } from 'react-content-loader/native';
import Depense from './DepenseDiagram';

type Props = NativeStackScreenProps<RootStackParams, 'DepenseStack'>;


// props est colocID à passer dans la botomsheet avec usersList
const AllDepense = (props) => {

  const MyLoader = () => ( 
    <ContentLoader 
    viewBox="0 0 380 70"
    speed={1}
    backgroundColor={'white'}
    foregroundColor={'#DDD'}
    >
  
    <Circle cx="30" cy="30" r="30" />
    <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
    <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
    </ContentLoader>)

//on cherche la dernière transac en placant un ecouteur sur la db
const q = query(collection(db, "Colocs/"+props.clcID+ "/Transactions"), orderBy('timestamp', 'desc'), limit(1));
const [values, loading, error] = useCollection(q);
const EmptyDepense=require('../Img/EmptyDepense.png');
//on affiche la dernière transa
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
  }
  else {
    return (
      <View style={styles.emptypage}>
        <Text style={styles.emptytext}>Oops, il n’y pas encore de {'\n'} transactions</Text>
     </View>
    )
  }

}
}

  const navigation =
  useNavigation<StackNavigationProp<RootStackParams>>();
  
  return (
  <View style={{flex:1, }}>
      <Text style={styles.RecapDepense}>Récapitulatif dépenses</Text>
       <Depense clcID = {props.clcID} global = {true} userList={props.userList}/>
          <View style={styles.Title}>
            <Text style={styles.DerniereDepense}>Dernière Dépense</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SousMenuDepense')} >
              <Text style={styles.VoirToutes}>Voir toutes {'>'}</Text>
             </TouchableOpacity>
          </View>
            {getLastestTransac()}
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

  RecapDepense:{
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 15
  },
  
  VoirToutes: {
  fontSize: 14,
  color: '#8F8F8F',
  },

  ImageContainer: {
    height: 175,
    width: 220,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
},

Image: {
    height: '100%',
    width: '100%',
    },

emptytext: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
    marginTop: 10
},

    emptypage: {
      alignItems: 'center',
      marginTop: 20
    }
})

export default AllDepense;


